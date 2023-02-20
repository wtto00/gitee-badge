import { AnalyticsWrapper } from "./components/analytics";
import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <link
          rel="stylesheet"
          href="https://wtto00.github.io/cdn/lib/github-markdown-css/github-markdown.min.css"
        />
      </head>

      <body>{children}</body>

      <AnalyticsWrapper />
    </html>
  );
}
