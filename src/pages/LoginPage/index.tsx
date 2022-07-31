import * as React from "react";
import LoginPanel from "../../components/LoginPanel";
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <i className={[styles.back, "iconfont"].join(" ")}>&#xea54;</i>
      <h1 className={styles.title}>硅谷外卖</h1>
      <LoginPanel />
      <small className={styles.tip}>
        温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表以同意
        <NavLink to="/" className={styles.agreement}>
          《用户服务协议》
        </NavLink>
      </small>
      <button className={styles.button}>登录</button>
      <NavLink to="/" className={styles.about}>
        关于我们
      </NavLink>
    </div>
  );
};

export default LoginPage;
