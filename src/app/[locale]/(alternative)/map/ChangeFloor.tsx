'use client';

import styles from './styles.module.scss';
import { Floor } from '@/types/buildings';
import { SetStateAction } from 'react';

type Props = {
  floors: Floor[];
  selectedFloor: number | null;
  setSelectedFloor: (value: SetStateAction<number | null>) => void;
};

export default function ChangeView(props: Props) {
  const { floors, selectedFloor, setSelectedFloor } = props;

  return (
    <div className={styles['grouped-icons']}>
      {floors.map((floor) => (
        <button
          key={floor.id}
          type='button'
          className={`
                ${selectedFloor === floor.id ? styles.active : ''}
                `}
          onClick={() => setSelectedFloor(floor.id)}
        >
          {floor.name}
        </button>
      ))}
    </div>
  );
}
