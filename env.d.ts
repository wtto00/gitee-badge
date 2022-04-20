declare module 'README.md' {
  export default string;
}

type NextQuery = NextApiRequest['query'];

type Colors = 'blue' | 'cyan' | 'green' | 'yellow' | 'orange' | 'red' | 'pink' | 'purple' | 'grey' | 'black';

type Icons =
  | 'airbnb'
  | 'alipay'
  | 'aliwangwang'
  | 'aliyun'
  | 'amazon'
  | 'android'
  | 'antd'
  | 'apple'
  | 'appveyor'
  | 'atom'
  | 'awesome'
  | 'badg'
  | 'behance'
  | 'bitcoin'
  | 'chrome'
  | 'circleci'
  | 'code'
  | 'codebeat'
  | 'codeclimate'
  | 'codecov'
  | 'codepen'
  | 'codeship'
  | 'commonwl'
  | 'deepscan'
  | 'dependabot'
  | 'dingding'
  | 'discord'
  | 'dockbit'
  | 'docker'
  | 'dropbox'
  | 'eclipse'
  | 'email'
  | 'facebook'
  | 'firefox'
  | 'flow'
  | 'git'
  | 'gitee'
  | 'github'
  | 'gitlab'
  | 'gitter'
  | 'google'
  | 'googleplay'
  | 'graphql'
  | 'haskell'
  | 'instagram'
  | 'kofi'
  | 'lgtm'
  | 'libraries'
  | 'linkedin'
  | 'now'
  | 'npm'
  | 'nuget'
  | 'patreon'
  | 'phone'
  | 'postgresql'
  | 'qq'
  | 'rss'
  | 'ruby'
  | 'scrutinizer'
  | 'segmentfault'
  | 'sketch'
  | 'skype'
  | 'slack'
  | 'sourcegraph'
  | 'stackoverflow'
  | 'telegram'
  | 'terminal'
  | 'terraform'
  | 'travis'
  | 'twitter'
  | 'typescript'
  | 'wechat'
  | 'weibo'
  | 'windows'
  | 'youtube'
  | 'yuque'
  | 'zeit'
  | 'zhihu';

interface BaseRequestQuery {
  color?: Colors;
  icon?: Icons;
  list?: string;
  label?: string;
  labelColor?: Colors;
  scale?: string;
}
