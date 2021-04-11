interface IProps {
  text: string;
  anchor: string;
}

export const Title = ({ text, anchor }: IProps) => {
  return (
    <h1>
      <a className="title" href={`#${anchor}`}>
        {text} <span>#</span>
      </a>
    </h1>
  );
};
