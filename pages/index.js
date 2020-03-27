import marked from "marked";
import hljs from "highlight.js";
import fetch from 'node-fetch'
import Header from "components/Header";
import Footer from "components/Footer";
import "./index.scss";

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
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
