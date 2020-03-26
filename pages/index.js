import marked from "marked";
import hljs from "highlight.js";
import Header from "components/Header";
import Footer from "components/Footer";
import md from "components/md/index.md";

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
});

import "./index.scss";

const Home = () => (
  <div className="container">
    <Header />

    <main
      className="markdown"
      dangerouslySetInnerHTML={{ __html: marked(md) }}
    ></main>

    <Footer />
  </div>
);

export default Home;
