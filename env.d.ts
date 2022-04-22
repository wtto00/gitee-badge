declare module 'README.md' {
  export default string;
}
declare module 'friendly-numbers' {
  export const format: (
    num:number,
    config?:{ decimals:number=2;formattedDecimals:number=0;smallMinimumMeaningfulDigits:number=0 }
  ) => string;
}

type NextQuery = NextApiRequest['query'];

type ColorsType = 'blue' | 'cyan' | 'green' | 'yellow' | 'orange' | 'red' | 'pink' | 'purple' | 'grey' | 'black' | string;

type IconsType =
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
  | 'bitcoin-lightning'
  | 'chrome'
  | 'circleci'
  | 'code-sandbox'
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
  | 'google-plus'
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
  color?: ColorsType;
  icon?: Icons;
  list?: string;
  label?: string;
  labelColor?: ColorsType;
  scale?: string;
}
