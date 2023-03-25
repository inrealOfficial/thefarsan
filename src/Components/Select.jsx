import { useState } from "react";
import "./select.css";

export default function BasicSelect() {
  const [selectDropdown, setSelectDropDown] = useState("custom-select-wrapper");
  const selectClick = () => {
    if (selectDropdown === "custom-select-wrapper") {
      setSelectDropDown("custom-select-wrapper open-dropdown");
    } else {
      setSelectDropDown("custom-select-wrapper");
    }
  };
  return (
    <div class="container">
      <div class={selectDropdown}>
        <div class="input-wrapper">
          <input
            type="text"
            placeholder="Select City"
            class="custom-select"
            readonly="readonly"
            onClick={selectClick}
          />
          <i class="fa fa-angle-down" aria-hidden="true"></i>
          <ul>
            <li>
              <span>New York</span>
            </li>
            <li>
              <span>Chicago</span>
            </li>
            <li>
              <span>Austin</span>
            </li>
            <li>
              <span>Las vegas</span>
            </li>
            <li>
              <span>Maimi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
