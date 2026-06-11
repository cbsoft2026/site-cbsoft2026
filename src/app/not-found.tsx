import styles from '@/app/styles.module.scss';
import BackgroundGeometric from '@/components/BackgroundGeometric';
import Link from 'next/link';

// pagina de '404 - not found' antes da rota de [locale],
// não é possível obter informações relacionadas a idioma
// de forma estatica
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
