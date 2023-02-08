import ReactDOM from "react-dom";

export default function Portal(props: any) {
  return ReactDOM.createPortal(props.children, document.body);
}
