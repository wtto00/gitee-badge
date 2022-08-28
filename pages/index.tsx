import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/Home.module.scss';
import { marked } from 'marked';

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;

renderer.link = function rendererLink(href, title, text) {
  const html = linkRenderer.call(this, href, title, text);
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};
marked.use({ renderer });

function Home({ content }: { content: string }) {
  const html = marked.parse(content);

  return (
    <div className={styles.container}>
      <Head>
        <title>Badge</title>
        <meta name="description" content="徽章生成服务" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* eslint-disable-next-line react/no-danger */}
      <main className={styles.markdown} dangerouslySetInnerHTML={{ __html: html }} />

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
