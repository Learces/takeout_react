import * as React from "react";
import PageHead from "../../components/PageHead";
import PageNav from "../../components/PageNav";
import UserAccount from "../../components/UserAccount";
import styles from "./index.module.scss";

const UserPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <PageHead>
        <h1 className={styles.header}>我的</h1>
      </PageHead>
      <UserAccount />
      <PageNav />
    </div>
  );
};

export default UserPage;
