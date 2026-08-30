import { BuildingData } from '@/types/buildings';
import BlocoBFloor0 from './154079142/floor-0.svg';
import BlocoBFloor1 from './154079142/floor-1.svg';
import BlocoBCecFloor0 from './154079144/floor-0.svg';
import CCSLFloor0 from './154079143/floor-0.svg';
import CCSLFloor1 from './154079143/floor-1.svg';
import Fau0 from './158966879/fau.svg'

export const buildingData: Record<number, BuildingData> = {
  154079142: {
    name: 'bloco-b',
    type: 'building',
    floors: [
      {
        id: 0,
        name: 'Térreo',
        component: BlocoBFloor0,
      },
      {
        id: 1,
        name: 'Primeiro Andar',
        component: BlocoBFloor1,
      },
    ],
  },
  154079144: {
    name: 'bloco-b-cec',
    type: 'building',
    floors: [
      {
        id: 0,
        name: 'Térreo',
        component: BlocoBCecFloor0,
      }
    ],
  },
  158966879: {
    name: 'fau-usp',
    type: 'building',
    floors: [
      {
        id: 0,
        name: '',
        component: Fau0
      }
    ]
  },
  154079143: {
    name: 'ccsl',
    type: 'building',
    rotationOffset: 0,
    floors: [
      {
        id: 0,
        name: 'Térreo',
        component: CCSLFloor0,
      },
      {
        id: 1,
        name: 'Primeiro Andar',
        component: CCSLFloor1,
      },
    ],
  },
  900000001: {
    name: 'caju',
    type: 'restaurant',
    floors: []
  },
  419956330: {
    name: 'viveiro',
    type: 'restaurant',
    floors: []
  },
  159420792: {
    name: 'restaurante-sweden',
    type: 'restaurant',
    floors: []
  },
  900000002: {
    name: 'restaurante-outback-jantar',
    type: 'restaurant',
    floors: []
  },
  900000003: {
    name: 'restaurante-chacrinha',
    type: 'restaurant',
    floors: []
  },
  900000004: {
    name: 'restaurante-fisica',
    type: 'restaurant',
    floors: []
  }
};