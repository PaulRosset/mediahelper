import { Copy } from "../../Widgets/Copy";

interface IProps {
  durationIS08601: number;
}

export const Displayer = ({ durationIS08601 }: IProps) => {
  return (
    <div className="displayer-container">
      <h3 className="durationISO8601-container-result">
        <span>Result:</span>
        <div className="result">
          <input readOnly type="number" value={durationIS08601} />
          <Copy text={String(durationIS08601)} color="black" />
        </div>
      </h3>
    </div>
  );
};
