import Head from "next/head";
import md from 'components/md/index.md'
// import ReactMarkdown from 'react-markdown'

const hljs = require('highlight.js');
const markdown = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>';
      } catch (__) { }
    }

    return '<pre class="hljs"><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
  }
});

const Home = () => (
  <div className="container">
    <Head>
      <title>Badge</title>
      <link rel="icon" href="/favicon.ico" />
      {/* <link href="http://jasonm23.github.io/markdown-css-themes/markdown9.css" rel="stylesheet"></link> */}
      <link href="https://raw.githubusercontent.com/mrcoles/markdown-css/master/markdown.css" rel="stylesheet"></link>
      {/* <link href="https://bitbucket.org/kevinburke/markdowncss/raw/1bbe64625a0a0f047590d7d787c04993f48f5ef4/markdown.css" rel="stylesheet"></link>
      <link href="https://raw.githubusercontent.com/zhangjikai/markdown-css/master/markdown.min.css" rel="stylesheet"></link> */}
    </Head>

    <main>
      <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: markdown.render(md) }}></div>
    </main>

    <footer>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/zeit.svg" alt="ZEIT Logo" />
      </a>
    </footer>
    <style jsx>{`
      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .markdown-preview {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }
    .markdown-preview {
      position: relative;
      top: 0;
  }
  .markdown-preview {
    padding: 2em calc(50% - 457px + 2em);
}
.markdown-preview {
  left: 50%;
  transform: translateX(-50%);
}

`}</style>
    <style jsx global>{`
  html,
  body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`}</style>
  </div>
);

export default Home;
