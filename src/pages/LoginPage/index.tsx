import * as React from "react";
import LoginPanel from "../../components/LoginPanel";
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  IMessageData,
  IPasswordData,
  selectData,
  selectMethod,
} from "../../store/loginSlice";
import TheModal from "../../components/TheModal";

// Message登录方式数据校验
const messageDataValidator = (data: IMessageData): string | null => {
  // 检查是否为空
  if (!data.phone) {
    return "请输入手机号";
  }
  // 检查是否符合格式要求
  if (data.phone) {
    if (data.phone.length !== 11) {
      return "手机号格式错误";
    }
  }
  // 检查是否输入验证码
  if (!data.phoneVerificationCode) {
    return "请输入验证码";
  }
  // 通过检查
  return null;
};
// Password登录方式数据校验
const passwordDataValidator = (data: IPasswordData): string | null => {
  // 检查账户是否为空
  if (!data.username) {
    return "请输入账户";
  }
  // 检查密码是否为空
  if (!data.password) {
    return "请输入密码";
  }
  // 检查验证码是否为空
  if (!data.imageVerificationCode) {
    return "请输入验证码";
  }
  // 验证通过
  return null;
};

const LoginPage: React.FC = () => {
  const method = useAppSelector(selectMethod);
  const data = useAppSelector(selectData);
  const [visiable, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const checkLoginData = () => {
    // 请求前校验(显示声明检查结果类型，方便理解流程)
    const result: string | null =
      method === "message"
        ? messageDataValidator(data as IMessageData)
        : passwordDataValidator(data as IPasswordData);
    if (!!result) {
      setVisible(true);
      setMessage(result);
      return;
    }
    // 请求
    fetch(`${process.env.REACT_APP_HOST}/loginCheck`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ method, data }),
    })
      .then(response => response.json())
      .then(data => {
        // 如果验证通过就不现实，没通过就显示
        setVisible(!data.isPassed);
        setMessage(data.description);
      });
  };
  const retry = () => {
    setVisible(false);
  };

  return (
    <div className={styles.page}>
      <NavLink to="/user">
        <i className={[styles.back, "iconfont"].join(" ")}>&#xea54;</i>
      </NavLink>
      <h1 className={styles.title}>硅谷外卖</h1>
      <LoginPanel />
      <button className={styles.button} onClick={checkLoginData}>
        登录
      </button>
      <NavLink to="/user" className={styles.about}>
        关于我们
      </NavLink>
      <TheModal visible={visiable}>
        <div className={styles.message}>{message}</div>
        <button className={styles.retry} onClick={retry}>
          重试
        </button>
      </TheModal>
    </div>
  );
};

export default LoginPage;
