import * as React from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.scss";

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  beforeWake?: Function;
  afterSleep?: Function;
}

const Modal: React.FC<ModalProps> = React.memo(props => {
  React.useEffect(() => {
    if (props.visible) {
      props.beforeWake?.apply(null);
    } else {
      props.afterSleep?.apply(null);
    }
  });

  return createPortal(
    <div
      className={styles.mask}
      style={{ display: props.visible ? "flex" : "none" }}
    >
      <div className={styles.container}>{props.children}</div>
    </div>,
    document.querySelector("#modal-root") as HTMLElement
  );
});

export default Modal;
