import L from 'leaflet';

import { BuildingData } from '@/types/buildings';

export type Building = {
  osm_id: number;
  name?: string;
  building?: string;
  data?: BuildingData;
};

export function getBuildingName(building: Building) {
  return building.data?.name || building.name || `Prédio ${building.osm_id}`;
}

export function getBuildingRotation(layer: L.Layer): number {
  if (!(layer instanceof L.Polygon)) {
    return 0;
  }

  const latLngs = layer.getLatLngs();

  if (latLngs.length === 0 || !Array.isArray(latLngs[0])) {
    return 0;
  }

  const ring = latLngs[0] as L.LatLng[];

  if (ring.length < 2) {
    return 0;
  }

  let longestLength = -Infinity;
  let angle = 0;

  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];

    const meanLat = (((a.lat + b.lat) / 2) * Math.PI) / 180;

    const dx = (b.lng - a.lng) * Math.cos(meanLat);

    const dy = -(b.lat - a.lat);

    const length = dx * dx + dy * dy;

    if (length > longestLength) {
      longestLength = length;

      angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    }
  }

  while (angle > 90) {
    angle -= 180;
  }

  while (angle < -90) {
    angle += 180;
  }

  return angle;
}

export function normalizeAngle(angle: number) {
  return ((angle + 180) % 360) - 180;
}
