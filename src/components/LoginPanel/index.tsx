import * as React from "react";
import { NavLink, useRoutes } from "react-router-dom";
import styles from "./index.module.scss";

// 获取验证码登录组件
interface GetVerificationCodeButtonProps {
  countdown: number;
}

const GetVerificationCodeButton: React.FC<GetVerificationCodeButtonProps> =
  React.memo(props => {
    const [countdown, setCountdown] = React.useState(props.countdown);
    let intervalId: NodeJS.Timeout;
    const requestVerificationCode = () => {
      intervalId = setInterval(() => {
        /**
         * 这里只能写函数写法，如果直接写setCountdown(countdown-1),那么定时器
         * 处理函数会始终引用countdown=10。因为点击“获取验证码”只开启了一个定时
         * 器，而这个定时器的handler会始终引用他被提交的时候的闭包值。当定时器执行
         * 一次之后，下次渲染countdown会变成9，但是这并不是定时器handler引用的
         * 值，定时器handler依然引用的是countdown=10。
         */
        setCountdown(previous => {
          if (previous) {
            return previous - 1;
          } else {
            clearInterval(intervalId);
            return props.countdown;
          }
        });
        // setCountdown(countdown - 1); //要测试错误效果，打开注释的行，并注释上面的setCountdown
        // console.log("内:" + countdown);
      }, 1000);
    };
    // console.log("外:" + countdown);
    React.useEffect(() => {
      return () => {
        clearInterval(intervalId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <button
        onClick={
          countdown === props.countdown ? requestVerificationCode : undefined
        }
        className={styles["getVerificationCode-button"]}
      >
        {countdown === props.countdown ? "获取验证码" : `${countdown}秒后重试`}
      </button>
    );
  });

// 短信登录
const MessagePanel: React.FC = () => {
  return (
    <div>
      <div className={styles.phone}>
        <input
          type="text"
          placeholder="手机号"
          maxLength={11}
          className={styles["phone-input"]}
        />
        <GetVerificationCodeButton countdown={10} />
      </div>
      <input
        type="text"
        placeholder="验证码"
        maxLength={6}
        className={styles.verificationCode}
      />
      <small className={styles.tip}>
        温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表以同意
        <NavLink to="/" className={styles.agreement}>
          《用户服务协议》
        </NavLink>
      </small>
    </div>
  );
};

// 密码登录
const PasswordPanel: React.FC = () => {
  return <div>PasswordPanel</div>;
};

// 登录面板
const LoginPanel: React.FC = () => {
  const Panel = useRoutes([
    {
      path: "/login/message",
      element: <MessagePanel />,
    },
    {
      path: "/login/password",
      element: <PasswordPanel />,
    },
  ]);

  interface StyledNavLinkProps {
    to: string;
    children: string;
  }

  const StyledNavLink: React.FC<StyledNavLinkProps> = props => {
    return (
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          isActive
            ? [styles["tab-active"], styles["tab-base"]].join(" ")
            : [styles["tab-inactive"], styles["tab-base"]].join(" ")
        }
      >
        {props.children}
      </NavLink>
    );
  };

  return (
    <div>
      <ul className={styles.tabs}>
        <li>
          <StyledNavLink to="/login/message">短信登录</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/login/password">密码登录</StyledNavLink>
        </li>
      </ul>
      {Panel}
    </div>
  );
};

export default LoginPanel;
