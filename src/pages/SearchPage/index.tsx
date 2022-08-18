import * as React from "react";
import PageHead from "../../components/PageHead";
import PageNav from "../../components/PageNav";
import styles from "./index.module.scss";

const SearchPage: React.FC = () => {
  return (
    <div>
      <PageHead>
        <h1 className={styles.header}>搜索</h1>
      </PageHead>
      <PageNav />
    </div>
  );
};

export default SearchPage;
