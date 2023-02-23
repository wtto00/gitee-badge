import Image from 'next/image';
import { Converter } from 'showdown';
import styles from './page.module.scss';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { Loading } from './components/content';

const Content = dynamic(() => import('./components/content'), { ssr: false, loading: Loading });

const converter = new Converter({
  openLinksInNewWindow: true,
});
converter.setFlavor('github');

export default async function Home() {
  let content = await getMarkdownContent();
  const html = converter.makeHtml(content);

  return (
    <main className={classNames(styles.container, 'markdown-body')}>
      <Content className={styles.content} html={html} />

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </main>
  );
}

async function getMarkdownContent() {
  // @ts-ignore
  let { default: content } = await import('../../README.md');

  content = content.replace(/\(https:\/\/gitee-badge\.vercel\.app/g, '(');

  return content;
}
