import React from "react";
import styles from "./Button.module.css";

const Button = ({ title, chosenTime, handleChosenTime }) => {
  const className =
    title === chosenTime
      ? `${styles.container} ${styles.chosen}`
      : `${styles.container}`;

  return (
    <>
      <div onClick={() => handleChosenTime(title)} className={className}>
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
};

export default Button;
