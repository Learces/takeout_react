import * as React from "react";
import styles from "./index.module.scss";

/**
 * 该组件时页面头的一个基本组件，只是限制一个高度而已。
 * 之所以不使用全局sass变量，因为样式不好维护
 * */

interface PageHeadProps {
  children?: React.ReactNode;
}

const PageHead: React.FC<PageHeadProps> = props => {
  return <div className={styles.header}>{props.children}</div>;
};

export default PageHead;
