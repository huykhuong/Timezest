import React, { useState } from "react";
import styles from "./ButtonList.module.css";
import Button from "./Button";

const ButtonList = ({ appointments }) => {
  const [chosenTime, setChosenTime] = useState("");

  const handleChosenTime = (time) => {
    setChosenTime(time);
  };

  return (
    <div className={styles.container}>
      {appointments.map((appointment, index) => (
        <Button
          key={index}
          title={appointment}
          chosenTime={chosenTime}
          handleChosenTime={handleChosenTime}
        />
      ))}
    </div>
  );
};

export default ButtonList;
