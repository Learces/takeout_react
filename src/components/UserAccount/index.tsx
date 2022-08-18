/**
 * 隶属页面：UserPage
 * */
import * as React from "react";
import defaultPortrait from "../../assets/images/default-portrait.png";
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";

const UserAccount: React.FC = () => {
  return (
    <div className={styles.component}>
      <div className={styles["portrait-container"]}>
        <img
          src={defaultPortrait}
          alt="头像"
          className={styles["portrait-image"]}
        />
      </div>
      <div className={styles.account}>
        <NavLink to="/login" className={styles["login-or-register"]}>
          登录/注册
        </NavLink>
        <div>
          <i className={["iconfont", styles["phone-icon"]].join(" ")}>
            &#xe6c7;
          </i>
          暂无绑定手机号
        </div>
      </div>
      <NavLink to="/login">
        <i className={["iconfont", styles["logout-icon"]].join(" ")}>
          &#xea54;
        </i>
      </NavLink>
    </div>
  );
};

export default UserAccount;
