import { withRouter } from "next/router";

class Page extends React.Component {
  render() {
    const {
      router: { query }
    } = this.props;
    return <div>{JSON.stringify(query)}</div>;
  }
}

export default withRouter(Page);
