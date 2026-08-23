import type { FeatureCollection, Polygon } from 'geojson';
import { StaticImageData } from 'next/image';

type BuildingProperties = {
  osm_id: number;
  name: string;
  building: string;
};

export type BuildingsGeoJSON = FeatureCollection<Polygon, BuildingProperties>;

export type PlaceType = 'restaurant' | 'library' | 'auditorium' | 'building' | 'room' | 'other';

export type FloorBounds = [[number, number], [number, number]];

export type Floor = {
  id: number;
  name: string;
  component: StaticImageData | string;
};

export type BuildingData = {
  name: string;
  type: PlaceType;
  rotationOffset?: number;
  floors: Floor[];
};
