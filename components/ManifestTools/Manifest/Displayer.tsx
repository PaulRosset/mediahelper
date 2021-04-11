import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface IProps {
  manifest: { [key: string]: any };
}

export const Displayer = ({ manifest }: IProps) => {
  return (
    <div className="displayer-container">
      <h3>Result:</h3>
      <div>
        <div className="codeContainer">
          <ReactJson
            src={manifest}
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
