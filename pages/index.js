import marked from "marked";
import hljs from "highlight.js";
import fetch from 'node-fetch'
import Header from "components/Header";
import Footer from "components/Footer";
import "./index.scss";

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text);
  return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};
marked.setOptions({
  renderer: renderer,
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  },
  breaks: true,
  smartLists: true,
  smartypants: true,
  tables: true,
});


const Home = ({ content }) => (
  <div className="container">
    <Header />

    <main
      className="markdown"
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    ></main>

    <Footer />
  </div>
);

export async function getStaticProps(context) {
  const res = await fetch('https://raw.githubusercontent.com/wtto00/badge/master/README.md')
  const content = await res.text()
  return {
    props: { content },
  }
}

export default Home;
