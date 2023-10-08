import React, { useState, useContext } from "react";
import emoji from "react-easy-emoji";
import StyleContext from "../../store/context";
import "./ToggleSwitch.scss";

const ToggleSwitch: React.FC = () => {
  const { isDark, changeTheme } = useContext(StyleContext);
  const [isChecked, setChecked] = useState(isDark);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          changeTheme?.();
          setChecked(!isChecked);
        }}
      />
      <span className="slider round">
        <span className="emoji">{isChecked ? emoji("🌜") : emoji("☀️")}</span>
      </span>
    </label>
  );
};

export default ToggleSwitch;