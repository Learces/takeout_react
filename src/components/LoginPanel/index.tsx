import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { saveData, saveMethod } from "../../store/loginSlice";

// 及时同步,受控
// const handleChange: (
//   setState: React.Dispatch<React.SetStateAction<string>>
// ) => React.ChangeEventHandler<HTMLInputElement> = setState => event =>
//   setState(event.target.value);

// 懒同步，非受控
const handleFocus: (
  setState: React.Dispatch<React.SetStateAction<string>>
) => React.FocusEventHandler<HTMLInputElement> = setState => event =>
  setState(event.target.value);

// 获取验证码登录组件
interface GetVerificationCodeButtonProps {
  countdown: number;
}

const GetVerificationCodeButton: React.FC<GetVerificationCodeButtonProps> =
  React.memo(props => {
    const [countdown, setCountdown] = React.useState(props.countdown);
    const [timer, setTimer] = React.useState<NodeJS.Timer>();
    const requestVerificationCode = () => {
      if (!timer) {
        const intervalId = setInterval(() => {
          setCountdown(previous => previous - 1);
        }, 1000);
        setTimer(intervalId);
      }
    };

    React.useEffect(() => {
      if (countdown === 0) {
        clearInterval(timer);
        setTimer(undefined);
        setCountdown(props.countdown);
      }
    }, [countdown, props.countdown, timer]);

    return (
      <button
        onClick={requestVerificationCode}
        className={styles["getPhoneVerificationCode-button"]}
      >
        {timer ? `${countdown}秒后重试` : "获取验证码"}
      </button>
    );
  });

// 短信登录
const MessagePanel: React.FC = () => {
  const [phone, setPhone] = React.useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = React.useState("");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(saveMethod("message"));
    dispatch(
      saveData({
        phone,
        phoneVerificationCode,
      })
    );
  });

  return (
    <div>
      <div className={styles.phone}>
        <input
          type="text"
          placeholder="手机号"
          className={styles["phone-input"]}
          // value={phone}
          // onChange={handleChange(setPhone)}
          onBlur={handleFocus(setPhone)}
        />
        <GetVerificationCodeButton countdown={30} />
      </div>
      <input
        type="text"
        placeholder="验证码"
        className={styles.phoneVerificationCode}
        // value={phoneVerificationCode}
        // onChange={handleChange(setPhoneVerificationCode)}
        onBlur={handleFocus(setPhoneVerificationCode)}
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
  const handleClick = () => {
    setOnOrOff(previous => !previous);
  };

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

  return (
    <span className={switchClassNames.join(" ")} onClick={handleClick}>
      <span className={controlClassNames.join(" ")}></span>
    </span>
  );
};

// 密码框输入类型
type PasswordType = "password" | "text";

// 密码登录
const PasswordPanel: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [imageVerificationCode, setImageVerificationCode] = React.useState("");
  const [imageSrc, setImageSrc] = React.useState("");
  // 初始类型为“password”类型
  const [passwordType, setPasswordType] =
    React.useState<PasswordType>("password");
  const dispatch = useAppDispatch();
  // 请求验证码图片
  const fetchVerificationCodeImage = () => {
    fetch(`${process.env.REACT_APP_HOST}/verificationCodeImage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        setImageSrc(data.src);
      });
  };
  // 根据开关的状态设定密码框类型，开关打开显示密码，开关关闭隐藏密码
  const control = (state: boolean) => {
    if (state) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  // 点击切换验证码
  const refreshVerificationCodeImage = fetchVerificationCodeImage;

  React.useEffect(() => {
    dispatch(saveMethod("password"));
    dispatch(saveData({ username, password, imageVerificationCode }));
  });
  React.useEffect(fetchVerificationCodeImage, []);

  return (
    <div>
      <input
        className={styles.username}
        type="text"
        placeholder="手机/邮箱/用户名"
        // value={username}
        // onChange={handleChange(setUsername)}
        onBlur={handleFocus(setUsername)}
      />
      <div className={styles.password}>
        <input
          className={styles["password-input"]}
          type={passwordType}
          placeholder="密码"
          // value={password}
          // onChange={handleChange(setPassword)}
          onBlur={handleFocus(setPassword)}
        />
        <PasswordDisplaySwitch onSwitch={control} />
      </div>
      <div className={styles.imageVerificationCode}>
        <input
          className={styles["imageVerificationCode-input"]}
          type="text"
          placeholder="验证码"
          // value={imageVerificationCode}
          // onChange={handleChange(setImageVerificationCode)}
          onBlur={handleFocus(setImageVerificationCode)}
        />
        <img
          src={imageSrc}
          alt="验证码"
          className={styles.verificationCodeImage}
          onClick={refreshVerificationCodeImage}
        />
      </div>
    </div>
  );
};

// 登录面板
const LoginPanel: React.FC = () => {
  const [tab2panel] = React.useState([
    {
      tab: "短信登录",
      panel: <MessagePanel />,
    },
    {
      tab: "密码登录",
      panel: <PasswordPanel />,
    },
  ]);
  // 表示当前活跃tab的索引
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  // 点击tab,获取当前li的ul索引
  const handleClick = (index: number) => () => setCurrentTabIndex(index);

  return (
    <div>
      <ul className={styles.tabs}>
        {tab2panel.map((item, index) => (
          <li
            key={index}
            onClick={handleClick(index)}
            className={[
              styles["tab-base"],
              currentTabIndex === index ? styles["tab-active"] : "",
            ].join(" ")}
          >
            {item.tab}
          </li>
        ))}
      </ul>
      {tab2panel[currentTabIndex].panel}
    </div>
  );
};

export default LoginPanel;
