import React from "react";
import styles from "./ContainerPanel.module.css";

const ContainerPanel = ({ children }) => {
  return (
    <div className={styles.outer__container}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default ContainerPanel;
