import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../../styles/Nav.css";
import { LoginAlert } from "../util/alert_modal/loginAlert";

function Nav(props) {
  const [loginAlert, setLoginAlert] = useState(false);
  const history = useHistory();
  const location = useLocation();

  location.isLogged = (sessionStorage.getItem("nickname") && true) || false;
  location.onClicked = false;

  const NavCssflag = location.pathname.split("/");

  let cssFlag = NavCssflag[NavCssflag.length - 1];
  console.log("cssFlag: ", cssFlag);
  if (cssFlag === "365" || cssFlag === "") cssFlag = "home";

  const handleClick = (e) => {
    const route = e.target.className;
    if (!location.isLogged && "/" + route !== location.pathname) {
      setLoginAlert(true);
    } else {
      if (route === "list") {
        history.push("/list");
      } else if (route === "trash") {
        history.push("/trash");
      }
    }
  };

  return (
    <div className={props.isMobile ? "Nav_mobile" : `Nav ${cssFlag}`}>
      <Link to="/365">
        <p className={location.pathname === "/365" ? "home" : ""} id="logo">
          365
        </p>
      </Link>
      <div id="nav_btn">
        <Link to="/introduce">
          <p className={location.pathname === "/introduce" ? "bctive" : ""}>
            소개
          </p>
        </Link>
        <a>
          <p
            onClick={(e) => handleClick(e)}
            className={location.pathname === "/list" ? "bctive list" : "list"}
          >
            내 일기장
          </p>
        </a>
        <a>
          <p
            onClick={(e) => handleClick(e)}
            className={
              location.pathname === "/trash" ? "bctive trash" : "trash"
            }
          >
            휴지통
          </p>
        </a>
        {!location.isLogged ? (
          <Link to="/login">
            <p className={location.pathname === "/login" ? "bctive" : ""}>
              로그인/회원가입
            </p>
          </Link>
        ) : (
          <Link to="/logoutRoute">
            <p>로그아웃</p>
          </Link>
        )}
      </div>
      {loginAlert ? (
        <LoginAlert setLoginAlert={setLoginAlert}></LoginAlert>
      ) : null}
    </div>
  );
}

export default Nav;
