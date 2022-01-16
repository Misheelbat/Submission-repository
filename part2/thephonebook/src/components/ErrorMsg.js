import { useEffect } from "react";
import "./ErrorMsg.css";

export default function ErrorMsg({ msg, type, deleteMsg }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      deleteMsg(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (msg === null) {
    return null;
  }
  return <div className={`${type}`}>{msg}</div>;
}
