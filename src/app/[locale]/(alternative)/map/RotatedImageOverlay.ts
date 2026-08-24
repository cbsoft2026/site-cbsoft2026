import L from 'leaflet';

export default class RotatedImageOverlay extends L.Layer {
  private bounds: L.LatLngBounds;

  private src: string;

  private rotation: number;

  private container: HTMLDivElement | null = null;

  private svg: SVGSVGElement | null = null;

  private animationFrame: number | null = null;

  private isAnimating = false;

  private tooltip: L.Tooltip | null = null;

  private tooltipTarget: SVGElement | null = null;

  private callbackText: (text: string, simplifiedMode: boolean) => string | undefined = (v) => v;

  constructor(src: string, bounds: L.LatLngBounds, rotation: number) {
    super();

    this.bounds = bounds;
    this.src = src;
    this.rotation = rotation;
  }

  onAdd(map: L.Map) {
    this.container = L.DomUtil.create('div', 'rotated-floor-overlay');
    this.container.style.position = 'absolute';
    this.container.style.margin = '0';
    this.container.style.padding = '0';
    this.container.style.border = 'none';
    this.container.style.outline = 'none';
    this.container.style.boxShadow = 'none';
    this.container.style.background = 'transparent';
    this.container.style.pointerEvents = 'none';
    this.container.style.overflow = 'visible';

    map.getPanes().overlayPane.appendChild(this.container);

    this.loadSvg(map);

    this.update();

    map.on('move', this.update, this);
    map.on('viewreset', this.update, this);
    map.on('zoomstart', this.startAnimation, this);
    map.on('zoomend', this.stopAnimation, this);

    return this;
  }

  onRemove(map: L.Map) {
    map.off('move', this.update, this);
    map.off('viewreset', this.update, this);
    map.off('zoomstart', this.startAnimation, this);
    map.off('zoomend', this.stopAnimation, this);

    this.stopAnimation();

    this.removeTooltip();

    if (this.container) {
      this.container.remove();
    }

    this.container = null;
    this.svg = null;

    return this;
  }

  setCallbackText(callback: (v: string, s: boolean) => string | undefined) {
    this.callbackText = callback;
  }

  private async loadSvg(map: L.Map) {
    try {
      const response = await fetch(this.src);

      if (!response.ok) {
        throw new Error(`Erro ao carregar SVG: ${response.status}`);
      }

      const svgText = await response.text();

      if (!this.container || !this._map) {
        return;
      }

      const parser = new DOMParser();

      const document = parser.parseFromString(svgText, 'image/svg+xml');

      const svgElement = document.documentElement;

      if (svgElement.namespaceURI !== 'http://www.w3.org/2000/svg' || svgElement.tagName.toLowerCase() !== 'svg') {
        throw new Error('O arquivo carregado não é um SVG válido.');
      }

      const importedSvg = document.importNode(svgElement, true);

      if (!(importedSvg instanceof SVGSVGElement)) {
        throw new Error('O elemento importado não é um SVG.');
      }

      this.svg = importedSvg;

      this.svg.style.position = 'absolute';
      this.svg.style.left = '0';
      this.svg.style.top = '0';
      this.svg.style.width = '100%';
      this.svg.style.height = '100%';
      this.svg.style.display = 'block';
      this.svg.style.margin = '0';
      this.svg.style.padding = '0';
      this.svg.style.border = 'none';
      this.svg.style.outline = 'none';
      this.svg.style.boxShadow = 'none';
      this.svg.style.background = 'transparent';
      this.svg.style.userSelect = 'none';
      this.svg.style.transformOrigin = '50% 50%';
      this.svg.style.transform = `rotate(${this.rotation}deg)`;

      this.container.appendChild(this.svg);
      this.addRectLabels();
      this.bindTooltips(map);
    } catch (error) {
      console.error('Não foi possível carregar o SVG:', error);
    }
  }

  private addRectLabels() {
    if (!this.svg) {
      return;
    }

    const rects = this.svg.querySelectorAll<SVGRectElement>('rect[id]');

    rects.forEach((rect) => {
      const text = rect.getAttribute('id');

      if (!text || !this._map) {
        return;
      }

      const x = parseFloat(rect.getAttribute('x') || '0');
      const y = parseFloat(rect.getAttribute('y') || '0');
      const width = parseFloat(rect.getAttribute('width') || '0');
      const height = parseFloat(rect.getAttribute('height') || '0');

      const textResponse = this.callbackText(text, true);

      if (!textResponse) {
        return;
      }

      const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      textElement.setAttribute('x', String(x + width / 2));
      textElement.setAttribute('y', String(y + height / 2));

      textElement.setAttribute('text-anchor', 'middle');
      textElement.setAttribute('dominant-baseline', 'middle');

      textElement.setAttribute('fill', '#000');
      textElement.setAttribute('font-size', '12');
      textElement.setAttribute('font-family', 'Arial, sans-serif');
      textElement.setAttribute('font-weight', 'bold');

      textElement.style.pointerEvents = 'none';

      textElement.textContent = textResponse;

      this.svg?.appendChild(textElement);

      const padding = 4;
      const maxWidth = Math.max(0, width - padding * 2);

      const textWidth = textElement.getComputedTextLength();

      if (textWidth > maxWidth && maxWidth > 0) {
        const scale = maxWidth / textWidth;

        textElement.setAttribute(
          'transform',
          `translate(${x + width / 2} ${y + height / 2}) scale(${scale} 1) translate(${-(
            x +
            width / 2
          )} ${-(y + height / 2)})`,
        );
      }
    });
  }

  private bindTooltips(map: L.Map) {
    if (!this.svg) {
      return;
    }

    const elements = this.svg.querySelectorAll<SVGElement>('[id]');

    elements.forEach((element) => {
      element.style.pointerEvents = 'all';
      element.style.cursor = 'pointer';

      element.addEventListener('mouseenter', this.handleMouseEnter);
      element.addEventListener('mousemove', this.handleMouseMove);
      element.addEventListener('mouseleave', this.handleMouseLeave);
    });
  }

  private handleMouseEnter = (event: MouseEvent) => {
    const element = event.currentTarget;

    if (!(element instanceof SVGElement)) {
      return;
    }

    const text = element.getAttribute('id');

    if (!text || !this._map) {
      return;
    }

    const textResponse = this.callbackText(text, false);

    if (!textResponse) {
      return;
    }

    this.tooltipTarget = element;

    this.tooltip = L.tooltip({
      direction: 'top',
      sticky: true,
      opacity: 0.9,
    })
      .setContent(textResponse)
      .setLatLng(this._map.mouseEventToLatLng(event))
      .addTo(this._map);
  };

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.tooltip || !this._map) {
      return;
    }

    this.tooltip.setLatLng(this._map.mouseEventToLatLng(event));
  };

  private handleMouseLeave = () => {
    this.removeTooltip();
  };

  private removeTooltip() {
    if (this.tooltip && this._map) {
      this._map.removeLayer(this.tooltip);
    }

    this.tooltip = null;
    this.tooltipTarget = null;
  }

  private startAnimation = () => {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    this.animate();
  };

  private animate = () => {
    if (!this.isAnimating) {
      return;
    }

    this.update();

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  private stopAnimation = () => {
    this.isAnimating = false;

    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);

      this.animationFrame = null;
    }
    this.update();
  };

  private update = () => {
    const map = this._map;

    const container = this.container;

    if (!map || !container) {
      return;
    }

    const northWest = map.latLngToLayerPoint(this.bounds.getNorthWest());
    const southEast = map.latLngToLayerPoint(this.bounds.getSouthEast());
    const width = southEast.x - northWest.x;
    const height = southEast.y - northWest.y;

    container.style.transform = `translate3d(${northWest.x}px, ${northWest.y}px, 0)`;
    container.style.width = `${width}px`;
    container.style.height = `${height}px`;
  };
}
