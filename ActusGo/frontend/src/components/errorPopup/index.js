import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

export default function ErrorPopup() {
  const errorPopup = useRef(null);
  const { error } = useSelector((state) => ({ ...state }));
  useClickOutside(errorPopup, () => {});
  return (
    <div className="blur" id="errorPopup">
      <div className="postBox" ref={errorPopup} id="erroPost1">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>{error.header}</span>
        </div>
        <div className="error_body">{error.error}</div>
      </div>
    </div>
  );
}
