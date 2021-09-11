import React from "react";
import styles from "./FormTogglerButton.module.css";

function FormTogglerButton({ onClick, formIsVisible, openedText, closedText }) {
  const formToggler = () => {
    onClick();
  };
  return (
    <button className={styles.formToggleButton} onClick={formToggler}>
      {formIsVisible ? openedText : closedText}
    </button>
  );
}

export default FormTogglerButton;
