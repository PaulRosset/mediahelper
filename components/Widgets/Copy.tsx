// const copy = require("copy-text-to-clipboard");
import { useState } from "react";

interface IProps {
  text: string;
}

export const Copy = ({ text }: IProps) => {
  let isCopying = false;
  const [copied, setCopy] = useState(false);

  const onCopy = () => {
    if (!isCopying) {
      isCopying = true;
      navigator.clipboard.writeText(text).then(() => {
        setCopy(true);
        setTimeout(() => {
          isCopying = false;
          setCopy(false);
        }, 3000);
      });
    }
  };

  return (
    <button onClick={onCopy} className="copyBtn">
      {copied ? (
        <span className="result-decode--true">Copied!</span>
      ) : (
        <img className="widget-option" src="/copy.svg" alt="copy" />
      )}
    </button>
  );
};
