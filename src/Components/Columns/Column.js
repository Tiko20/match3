import { Children } from "react";
import Cubic from "../Cubic/Cubic";
import "./Column.css";
const Column = (props) => {
  return <div className="column">{props.children}</div>;
};
export default Column;
