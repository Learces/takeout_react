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
    const [timer, setTimer] = React.useState<NodeJS.Timer>();
    const requestVerificationCode = () => {
      const intervalId = setInterval(() => {
        // 如果倒计时不为零，就继续倒计时，否则重置倒计时
        setCountdown(previous => {
          return previous ? previous - 1 : props.countdown;
        });
      }, 1000);
      setTimer(intervalId);
    };

    React.useEffect(() => {
      if (countdown === 0) {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <button
        onClick={
          // 当前定时器不等于初始定时时间，说明有一个定时器正在运行，不允许重复点击
          countdown === props.countdown ? requestVerificationCode : undefined
        }
        className={styles["getPhoneVerificationCode-button"]}
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
          className={styles["phone-input"]}
        />
        <GetVerificationCodeButton countdown={10} />
      </div>
      <input
        type="text"
        placeholder="验证码"
        className={styles.phoneVerificationCode}
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

// 控制密码显示样式按钮
interface PasswordDisplaySwitchProps {
  // 用户组件向该组件传递一个回调，该回调会受到当前开关的状态，回调可以根据当前开关的状态来完成指定动作
  onSwitch: (state: boolean) => void;
  // 开关初始状态
  on?: boolean;
}

const PasswordDisplaySwitch: React.FC<PasswordDisplaySwitchProps> = props => {
  const [isOn, setOnOrOff] = React.useState(props.on || false);
  const [switchClassNames, setSwitchClassNames] = React.useState([
    styles.displaySwitch,
  ]);
  const [controlClassNames, setControlClassNames] = React.useState([
    styles.displayControl,
  ]);
  // 一定要将回调调用卸载副作用当中，不能卸载setState当中，会出Bug
  React.useEffect(() => {
    props.onSwitch(isOn);
    if (isOn) {
      setSwitchClassNames([
        styles.displaySwitch,
        styles["displaySwitch-active"],
      ]);
      setControlClassNames([
        styles.displayControl,
        styles["displayControl-active"],
      ]);
    } else {
      setSwitchClassNames([styles.displaySwitch]);
      setControlClassNames([styles.displayControl]);
    }
  }, [props, isOn]);
  const handleClick = () => {
    setOnOrOff(previous => !previous);
  };
  return (
    <span className={switchClassNames.join(" ")} onClick={handleClick}>
      <span className={controlClassNames.join(" ")}></span>
    </span>
  );
};

// 密码登录
const PasswordPanel: React.FC = () => {
  // 密码框输入类型
  type PasswordType = "password" | "text";
  // 初始类型为“password”类型
  const [passwordType, setPasswordType] =
    React.useState<PasswordType>("password");
  // 根据开关的状态设定密码框类型，开关打开显示密码，开关关闭隐藏密码
  const control = (state: boolean) => {
    if (state) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div>
      <input
        className={styles.username}
        type="text"
        placeholder="手机/邮箱/用户名"
      />
      <div className={styles.password}>
        <input
          className={styles["password-input"]}
          type={passwordType}
          placeholder="密码"
        />
        <PasswordDisplaySwitch onSwitch={control} />
      </div>
      <div className={styles.imageVerificationCode}>
        <input
          className={styles["imageVerificationCode-input"]}
          type="text"
          placeholder="验证码"
        />
        <img
          src="https://picsum.photos/id/993/200/200"
          alt="验证码"
          className={styles.verificationCodeImage}
        />
      </div>
    </div>
  );
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
