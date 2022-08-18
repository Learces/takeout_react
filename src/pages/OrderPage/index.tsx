import * as React from "react";
import PageHead from "../../components/PageHead";
import PageNav from "../../components/PageNav";
import styles from "./index.module.scss";

const OrderPage: React.FC = () => {
  return (
    <div>
      <PageHead>
        <h1 className={styles.header}>订单列表</h1>
      </PageHead>
      <PageNav />
    </div>
  );
};

export default OrderPage;
