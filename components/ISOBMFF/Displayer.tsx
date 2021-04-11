import { IBox } from "./Parser";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface IProps {
  boxes: IBox[];
  segmentSize: string;
}

export const Displayer = ({ boxes, segmentSize }: IProps) => {
  return (
    <div className="displayer-container">
      <h3>Result:</h3>
      <div>
        <h5>Segment Size: {segmentSize}</h5>
        <div className="codeContainer">
          <ReactJson
            src={boxes}
            theme="summerfruit"
            name={null}
            displayDataTypes={false}
            displayObjectSize={false}
            collapsed={1}
          />
        </div>
      </div>
    </div>
  );
};
