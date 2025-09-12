'use client';

import Title from '@/components/Title';
import { Key } from 'react';

import styles from './styles.module.scss';
import { accommodations } from '@/data';
import { useTranslations } from 'next-intl';

function Hotel(props: { data: any }) {
  return (
    <tr>
      <td>{props.data.nome}</td>
      <td>{props.data.endereco}</td>
      <td>
        <p>{props.data.distancia}</p>
        {props.data.mapa && (
          <a href={props.data.mapa} target='_blank' rel='noreferrer'>
            Mapa
          </a>
        )}
        {props.data.recomendado && (
          <p>
            <b>Recomendado</b>
          </p>
        )}
      </td>
      <td>
        <p>
          <b>{props.data.precoLocal}</b>
        </p>
        <ul>
          {props.data.valores.map((price: any, index: Key | null | undefined) => (
            <li key={index}>{price}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export default function AccommodationPage() {
  const t = useTranslations('pages/cbsoft/accommodation');

  return (
    <section className={styles['local-acomodacoes']}>
      <Title titulo={t('titulo')} align='center' />
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='text-center mb-4'>
            <a
              href='https://cbsoft2025.bukly.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary'
            >
              {t('facareserva')}
            </a>
          </div>
          <table className={styles['evento-tabela']}>
            <thead>
              <tr>
                <th>{t('hotel')}</th>
                <th>{t('endereco')}</th>
                <th>
                  <p>{t('distancia1')}</p>
                  <p>{t('distancia2')}</p>
                </th>
                <th>
                  <p>{t('desc1')}</p>
                  <p>
                    <i>{t('desc2')}</i>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {accommodations.map((hotel: any, index: Key | null | undefined) => (
                <Hotel data={hotel} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
