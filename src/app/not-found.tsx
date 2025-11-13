import styles from '@/app/styles.module.scss';
import BackgroundGeometric from '@/components/BackgroundGeometric';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <article
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '100svh',
      }}
    >
      <h1
        style={{
          fontSize: '72px',
          marginBottom: '72px',
          textAlign: 'center',
        }}
      >
        404 - Página não encontrada
      </h1>
      <div className={styles['background-geometric']} style={{ marginBottom: '72px' }}>
        <BackgroundGeometric amount={9} />
      </div>
      <Link prefetch={false} href={'/'}>Voltar para a página inicial.</Link>
    </article>
  );
}
