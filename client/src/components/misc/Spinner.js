import { useState } from "react";
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  border-color: #3c421a;
`;

function Spinner() {
  let [loading] = useState(true);
  let [color] = useState("#3c421a");

  return (
    <div className="sweet-loading">
      <PuffLoader color={color} loading={loading} css={override} size={200} />
    </div>
  );
}

export default Spinner;
