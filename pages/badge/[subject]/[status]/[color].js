import { withRouter } from "next/router";

class Page extends React.Component {
  render() {
    const {
      router: { query }
    } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="70.3"
        height="20"
        viewBox="0 0 703 200"
      >
        <linearGradient id="a" x2="0" y2="100%">
          <stop offset="0" stopOpacity=".1" stopColor="#EEE" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <mask id="m">
          <rect width="703" height="200" rx="30" fill="#FFF" />
        </mask>
        <g mask="url(#m)">
          <rect width="368" height="200" fill="#555" />
          <rect width="335" height="200" fill="#08C" x="368" />
          <rect width="703" height="200" fill="url(#a)" />
        </g>
        <g
          fill="#fff"
          textAnchor="start"
          fontFamily="Verdana,DejaVu Sans,sans-serif"
          fontSize="110"
        >
          <text x="60" y="148" textLength="268" fill="#000" opacity="0.25">
            {query.subject}
          </text>
          <text x="50" y="138" textLength="268">
            {query.subject}
          </text>
          <text x="423" y="148" textLength="235" fill="#000" opacity="0.25">
            {query.status}
          </text>
          <text x="413" y="138" textLength="235">
            {query.status}
          </text>
        </g>
      </svg>
    );
  }
}

export default withRouter(Page);
