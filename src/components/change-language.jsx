import usFlag from "@assets/images/us.png";
import faFlag from "@assets/images/fa.png";
import { useEffect, useRef, useState } from "react";

const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Clicking outside the dropdown closes the dropdown
    const checkIfClickOutside = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  }, [show]);

  return (
    <div className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(!show)}>
        <img src={usFlag} alt="English" />
      </a>
      <div
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${
          show ? "show" : undefined
        }`}
      >
        <a className="dropdown-item fw-bolder" style={{ textAlign: "right" }}>
          <img src={usFlag} width={20} className="ms-2" alt="English" />
          <span className="align-middle">English</span>
        </a>
        <a className="dropdown-item fw-bolder" style={{ textAlign: "right" }}>
          <img src={faFlag} width={20} className="ms-2" alt="Persian" />
          <span className="align-middle">فارسی</span>
        </a>
      </div>
    </div>
  );
};
export default ChangeLanguage;
