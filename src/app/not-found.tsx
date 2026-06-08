import styles from '@/app/styles.module.scss';
import BackgroundGeometric from '@/components/BackgroundGeometric';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <article className={`container ${styles['not-found']}`}>
      <h1>404 - Página não encontrada</h1>
      <div className={styles['background-geometric']}>
        <BackgroundGeometric amount={9} />
      </div>
      <Link prefetch={false} href={'/'}>
        Voltar para a página inicial.
      </Link>
    </article>
  );
}
