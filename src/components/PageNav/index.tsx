import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

const navItems = [
  {
    icon: "\ue65b",
    title: "首页",
    path: "/home",
  },
  {
    icon: "\ue61e",
    title: "搜索",
    path: "/search",
  },
  {
    icon: "\ue669",
    title: "订单",
    path: "/order",
  },
  {
    icon: "\ue635",
    title: "我的",
    path: "/user",
  },
];

const PageNav: React.FC = () => {
  return (
    <ul className={styles.nav}>
      {navItems.map((item, index) => (
        <li key={index} className={styles["nav-item-wrapper"]}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? [styles["nav-item"], styles["nav-item--active"]].join(" ")
                : styles["nav-item"]
            }
          >
            <i className={["iconfont", styles["nav-item-icon"]].join(" ")}>
              {item.icon}
            </i>
            <span className={styles["nav-item-title"]}>{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default PageNav;
