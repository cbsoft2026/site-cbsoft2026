import L from 'leaflet';

export default class RotatedImageOverlay extends L.Layer {
  private bounds: L.LatLngBounds;

  private src: string;

  private rotation: number;

  private container: HTMLDivElement | null = null;

  private image: HTMLImageElement | null = null;

  private animationFrame: number | null = null;

  private isAnimating = false;

  constructor(src: string, bounds: L.LatLngBounds, rotation: number) {
    super();

    this.bounds = bounds;
    this.src = src;
    this.rotation = rotation;
  }

  onAdd(map: L.Map) {
    this.container = L.DomUtil.create('div', 'rotated-floor-overlay');
    this.image = L.DomUtil.create('img', 'rotated-floor-overlay__image', this.container);
    this.container.style.position = 'absolute';
    this.container.style.margin = '0';
    this.container.style.padding = '0';
    this.container.style.border = 'none';
    this.container.style.outline = 'none';
    this.container.style.boxShadow = 'none';
    this.container.style.background = 'transparent';
    this.container.style.pointerEvents = 'none';
    this.container.style.overflow = 'visible';
    this.image.src = this.src;
    this.image.alt = '';
    this.image.draggable = false;
    this.image.style.position = 'absolute';
    this.image.style.left = '0';
    this.image.style.top = '0';
    this.image.style.width = '100%';
    this.image.style.height = '100%';
    this.image.style.display = 'block';
    this.image.style.margin = '0';
    this.image.style.padding = '0';
    this.image.style.border = 'none';
    this.image.style.outline = 'none';
    this.image.style.boxShadow = 'none';
    this.image.style.background = 'transparent';
    this.image.style.pointerEvents = 'none';
    this.image.style.userSelect = 'none';
    this.image.style.transformOrigin = '50% 50%';
    this.image.style.transform = `rotate(${this.rotation}deg)`;

    map.getPanes().overlayPane.appendChild(this.container);

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

    if (this.container) {
      this.container.remove();
    }

    this.container = null;
    this.image = null;

    return this;
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
