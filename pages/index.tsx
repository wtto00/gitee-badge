import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/Home.module.scss';
import { Converter } from 'showdown';
import classNames from 'classnames';

const converter = new Converter({
  openLinksInNewWindow: true,
});
converter.setFlavor('github');

function Home({ content }: { content: string }) {
  const html = converter.makeHtml(content);

  return (
    <div className={classNames(styles.container, 'markdown-body')}>
      <Head>
        <title>Badge</title>
        <meta name="description" content="徽章生成服务" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://wtto00.github.io/cdn/lib/github-markdown-css/github-markdown.min.css" />
      </Head>

      {/* eslint-disable-next-line react/no-danger */}
      <main className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />

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
    </div>
  );
}

export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let { default: content } = await import('../README.md');
  if (process.env.NODE_ENV === 'development') {
    content = content.replace(/https:\/\/badg\.vercel\.app/g, '/api');
  } else {
    content = content.replace(/https:\/\/badg\.vercel\.app/g, '');
  }

  return {
    props: {
      content,
    },
  };
}

export default Home;
