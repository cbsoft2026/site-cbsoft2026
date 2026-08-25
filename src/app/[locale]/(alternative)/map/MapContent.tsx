'use client';

import Layout from '@/app/[locale]/(alternative)/components/layout';

import { useCallback, useEffect, useRef, useState } from 'react';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import styles from './styles.module.scss';
import stylesLayout from '@/app/[locale]/(alternative)/components/layout/styles.module.scss';

import { buildings as buildingsGeojson } from '@/data';
import { buildingData } from '@/data/buildings';

import type { BuildingData } from '@/types/buildings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faChevronDown, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import RotatedImageOverlay from './RotatedImageOverlay';
import { Building, getBuildingName, getBuildingRotation, normalizeAngle } from './utils';
import { useTranslations } from 'next-intl';
import OpenMaps from '@/components/OpenMaps';
import ChangeFloor from './ChangeFloor';

type Props = {
  locale: string;
};

type SavedPathStyle = {
  color?: string;
  opacity?: number;
  weight?: number;
  fillColor?: string;
  fillOpacity?: number;
  dashArray?: string | number[] | undefined;
  dashOffset?: string;
  lineCap?: L.LineCapShape;
  lineJoin?: L.LineJoinShape;
};

type PropsFilter = {
  label: string;
  filters: (building: Building) => boolean;
  buildings: Building[];
  selectedBuildingId: number | null;
  selectBuilding: (id: number) => void;
};

function Filter(props: PropsFilter) {
  const { label, filters, buildings, selectedBuildingId, selectBuilding } = props;
  const [openFilter, setOpenFilter] = useState(true);

  const toggleOpenFilter = useCallback(() => {
    setOpenFilter((previous) => !previous);
  }, []);

  const buildingT = useTranslations('building');

  return (
    <>
      <div onClick={toggleOpenFilter} className={styles.collapser}>
        <h6>{label}</h6>

        <div className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
          <FontAwesomeIcon icon={openFilter ? faChevronDown : faChevronUp} style={{ width: '8px' }} />
        </div>
      </div>

      {openFilter && (
        <div className={styles['collapser__items']}>
          {buildings.filter(filters).map((building) => {
            if (!building.data) {
              return null;
            }

            return (
              <button
                key={building.osm_id}
                type='button'
                className={
                  selectedBuildingId === building.osm_id
                    ? `${styles.selected} ${stylesLayout['button-control']}`
                    : stylesLayout['button-control']
                }
                onClick={() => selectBuilding(building.osm_id)}
              >
                {buildingT(getBuildingName(building))}
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function Content({ locale }: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const buildingsLayerRef = useRef<L.GeoJSON | null>(null);
  const selectedLayerRef = useRef<L.Layer | null>(null);
  const floorLayerRef = useRef<RotatedImageOverlay | null>(null);
  const selectedLayerStyleRef = useRef<SavedPathStyle | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [floorVisible, setFloorVisible] = useState(false);
  const [selectedBuildingCenter, setSelectedBuildingCenter] = useState<L.LatLng | null>(null);

  const buildingT = useTranslations('building');
  const scheduleT = useTranslations('schedule');

  const hideSelectedBuilding = useCallback(() => {
    const layer = selectedLayerRef.current;

    if (!(layer instanceof L.Path)) {
      return;
    }

    if (selectedLayerStyleRef.current === null) {
      selectedLayerStyleRef.current = {
        color: layer.options.color,
        opacity: layer.options.opacity,
        weight: layer.options.weight,
        fillColor: layer.options.fillColor,
        fillOpacity: layer.options.fillOpacity,
        dashArray: layer.options.dashArray,
        dashOffset: layer.options.dashOffset,
        lineCap: layer.options.lineCap,
        lineJoin: layer.options.lineJoin,
      };
    }

    layer.setStyle({
      opacity: 0,
      weight: 0,
      fillOpacity: 0,
    });

    const element = layer.getElement();

    if (element instanceof SVGElement) {
      element.style.pointerEvents = 'none';
    }
  }, []);

  const restoreSelectedBuilding = useCallback(() => {
    const layer = selectedLayerRef.current;

    const originalStyle = selectedLayerStyleRef.current;

    if (!(layer instanceof L.Path) || !originalStyle) {
      return;
    }

    layer.setStyle(originalStyle);

    const element = layer.getElement();

    if (element instanceof SVGElement) {
      element.style.pointerEvents = '';
    }

    selectedLayerStyleRef.current = null;
  }, []);

  const removeFloorOverlay = useCallback(() => {
    if (floorLayerRef.current) {
      floorLayerRef.current.remove();

      floorLayerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const container = mapContainerRef.current;

    if (!container) {
      return;
    }

    if (mapRef.current) {
      return;
    }

    const map = L.map(container, {
      maxZoom: 22,
    }).setView([-23.5595, -46.731], 18);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map);

    mapRef.current = map;

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      removeFloorOverlay();

      map.remove();

      mapRef.current = null;
    };
  }, [removeFloorOverlay]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const loadedBuildings: Building[] = [];

    const layer = L.geoJSON(buildingsGeojson, {
      style: (feature) => {
        const properties = feature?.properties;
        const isRestaurant = buildingData[properties.osm_id] && buildingData[properties.osm_id].type === 'restaurant';

        return {
          fillColor: isRestaurant ? '#f59e0b' : '#3388ff',

          color: isRestaurant ? '#d97706' : '#3388ff',

          fillOpacity: 0.35,
          weight: 2,
        };
      },

      onEachFeature: (feature, leafletLayer) => {
        const properties = feature.properties as Building;

        const building: Building = {
          ...properties,
          data: buildingData[properties.osm_id],
        };

        loadedBuildings.push(building);

        const name = buildingT.has(getBuildingName(building))
          ? buildingT(getBuildingName(building))
          : getBuildingName(building);
        leafletLayer.bindTooltip(name);

        leafletLayer.on('click', () => {
          openBuilding(building.osm_id, leafletLayer);
        });
      },
    }).addTo(map);

    buildingsLayerRef.current = layer;

    setBuildings(loadedBuildings);

    return () => {
      layer.remove();

      buildingsLayerRef.current = null;
    };
  }, []);

  function openBuilding(id: number, layer?: L.Layer) {
    const map = mapRef.current;

    restoreSelectedBuilding();
    removeFloorOverlay();
    setFloorVisible(false);

    const data = buildingData[id];

    if (!data) {
      console.error(`Prédio ${id} não encontrado`);

      return;
    }

    selectedLayerRef.current = layer ?? null;

    if (layer instanceof L.Polygon) {
      setSelectedBuildingCenter(layer.getBounds().getCenter());
    } else {
      setSelectedBuildingCenter(null);
    }

    setSelectedBuilding(data);
    setSelectedBuildingId(id);
    setSelectedFloor(data.floors[0]?.id ?? null);

    if (map && layer instanceof L.Polygon) {
      map.flyToBounds(layer.getBounds(), {
        padding: [100, 100],
        maxZoom: 19,
        duration: 1.2,
      });

      map.once('moveend', () => {
        setFloorVisible(true);
      });

      return;
    }

    setFloorVisible(true);
  }

  function selectBuilding(id: number) {
    const layers = buildingsLayerRef.current?.getLayers();

    if (!layers) {
      return;
    }

    const layer = layers.find((item) => {
      const feature = (
        item as L.Layer & {
          feature?: {
            properties?: Building;
          };
        }
      ).feature;

      return feature?.properties?.osm_id === id;
    });

    if (!layer) {
      return;
    }

    openBuilding(id, layer);
  }

  function closeBuilding() {
    removeFloorOverlay();
    restoreSelectedBuilding();

    selectedLayerRef.current = null;

    setFloorVisible(false);
    setSelectedBuilding(null);
    setSelectedBuildingId(null);
    setSelectedFloor(null);
    setSelectedBuildingCenter(null);

    const map = mapRef.current;

    const buildingsLayer = buildingsLayerRef.current;

    if (map && buildingsLayer) {
      const bounds = buildingsLayer.getBounds();

      if (bounds.isValid()) {
        map.flyToBounds(bounds, {
          padding: [120, 120],
          duration: 1.2,
        });
      }
    }
  }

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !floorVisible || selectedBuildingId === null || selectedFloor === null) {
      return;
    }

    const buildingLayer = selectedLayerRef.current;

    if (!buildingLayer || !(buildingLayer instanceof L.Polygon)) {
      return;
    }

    const building = buildingData[selectedBuildingId];

    if (!building) {
      return;
    }

    const floor = building.floors.find((item) => item.id === selectedFloor);

    if (!floor) {
      return;
    }

    const asset = floor.component as
      | string
      | {
          src?: string;
        };

    const src = typeof asset === 'string' ? asset : asset.src;

    if (!src) {
      console.error('Não foi possível obter o SVG do andar.');

      return;
    }

    const bounds = buildingLayer.getBounds();
    const buildingRotation = getBuildingRotation(buildingLayer);
    const svgRotationOffset = building.rotationOffset ?? 90;
    const rotation = normalizeAngle(buildingRotation + svgRotationOffset);

    hideSelectedBuilding();

    const overlay = new RotatedImageOverlay(src, bounds, rotation);

    overlay.addTo(map);
    overlay.setCallbackText((v, simplifiedMode) => {
      if (simplifiedMode && scheduleT.has(v)) {
        return scheduleT(v);
      }

      if (scheduleT.has(v) && scheduleT.has(`${v}-name`)) {
        return `${scheduleT(v)} - ${scheduleT(`${v}-name`)}`;
      }

      if (buildingT.has(v)) {
        return buildingT(v);
      }

      return undefined;
    });

    floorLayerRef.current = overlay;

    return () => {
      overlay.remove();

      if (floorLayerRef.current === overlay) {
        floorLayerRef.current = null;
      }

      restoreSelectedBuilding();
    };
  }, [floorVisible, selectedBuildingId, selectedFloor, hideSelectedBuilding, restoreSelectedBuilding]);

  return (
    <Layout locale={locale}>
      <Layout.Sidebar locale={locale}>
        <p>{buildingT('disclaimer')}</p>
        <div className={stylesLayout['aside-filter']}>
          <Filter
            label={buildingT('predios')}
            filters={(building) => building.data?.type === 'building'}
            buildings={buildings}
            selectBuilding={selectBuilding}
            selectedBuildingId={selectedBuildingId}
          />

          <Filter
            label={buildingT('restaurantes')}
            filters={(building) => building.data?.type === 'restaurant'}
            buildings={buildings}
            selectBuilding={selectBuilding}
            selectedBuildingId={selectedBuildingId}
          />
        </div>
      </Layout.Sidebar>

      <Layout.Header
        locale={locale}
        title={
          <>
            <h5>
              {buildingT.has(selectedBuilding?.name || '')
                ? buildingT(selectedBuilding?.name || '')
                : selectedBuilding?.name}
            </h5>

            {selectedBuilding && selectedBuildingCenter && (
              <OpenMaps
                label={buildingT('open-maps')}
                latitude={selectedBuildingCenter.lat}
                longitude={selectedBuildingCenter.lng}
              />
            )}
          </>
        }
      >
        <div className={styles.floors}>
          {floorVisible && selectedBuilding && (
            <ChangeFloor
              floors={selectedBuilding.floors}
              selectedFloor={selectedFloor}
              setSelectedFloor={setSelectedFloor}
            />
          )}
        </div>
      </Layout.Header>

      <Layout.Panel locale={locale}>
        <div ref={mapContainerRef} id='map' className={styles.map} />
      </Layout.Panel>
    </Layout>
  );
}
