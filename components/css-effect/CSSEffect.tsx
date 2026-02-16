import React from "react";
import styles from "./CSSEffect.module.css";

type Props = {
  children?: React.ReactNode;
  effect?: "blur" | "hoverClear";
};

const CSSEffect = (props: Props) => {
  let effectStyle;
  if (props.effect === "blur") {
    effectStyle = styles.blur;
  } else if (props.effect === "hoverClear") {
    effectStyle = styles.hoverClear;
  }

  return (
    <span className={styles.base + " " + effectStyle}>{props.children}</span>
  );
};

export default CSSEffect;
