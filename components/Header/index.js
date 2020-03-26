import Head from "next/head";

export default (props) => {
    return <Head>
        <title>{props.title || 'Badge'}</title>
        <link rel="icon" href="/favicon.ico" />
        {props.children}
    </Head>
}