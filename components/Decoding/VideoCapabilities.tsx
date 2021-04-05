interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Capabitities = ({ title, children }: IProps) => {
  return (
    <div className="video-capabilities-container">
      <div className="header-capabilities">
        <h3>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};
