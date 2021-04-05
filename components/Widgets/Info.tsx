interface IProps {
  url: string;
}

export const Info = ({ url }: IProps) => {
  return (
    <a href={url} target="_blank">
      <img className="widget-option" src="/info.svg" alt="info" />
    </a>
  );
};
