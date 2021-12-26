declare module 'README.md' {
  export default string;
}

declare type NextApiRequestQuery = {
  subject: string;
  status: string;
  color: string;
  icon: string;
  list: string;
  label: string;
  labelColor: string;
  scale: string;
};
