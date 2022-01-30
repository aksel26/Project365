import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import VectorLeft from "../../styles/images/Vector left.png";
import VectorRight from "../../styles/images/Vector right.png";
import Vector from "../../styles/images/Vector 1.png";
import arrow from "../../styles/images/arrow01_normal.png";
import main from "../../styles/images/mainpage.png";
import "../../styles/Home.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { LoginAlert } from "../util/alert_modal/loginAlert";
import ConfirmAlert from "../util/alert_modal/ConfirmAlert";
import AlertTrash from "../util/alert_modal/AlertTrash";

function Home(props) {
  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();
  const location = useLocation();

  const [answer8, setAnswer8] = useState([]);
  const [ranname, setRanname] = useState([]);
  const [question, setQuestion] = useState();
  const [todayMyA, setTodayMyA] = useState([]);
  const [todayMyTrashA, setTodayMYTrashA] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const [confirmModalOn, setConfirmModalOn] = useState(false);
  const [alertTrash, setAlertTrash] = useState(false);

  let now = new Date();
  let start = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);

  const history = useHistory();
  const [todayNum, setTodayNum] = useState(day);
  const [memberNum, setmemberNum] = useState(
    sessionStorage.getItem("member_num") || null
  );

  let num = 0;

  const handleClick = () => {
    location.onClicked = true;
    if (!location.isLogged && location.onClicked) {
      // alert("로그인이 필요합니다!");
      // return { pathname: "/login" };
      setLoginAlert(true);
    } else if (todayMyA.length > 0 && location.onClicked) {
      setConfirmModalOn(true);
    } else if (todayMyTrashA && location.onClicked) {
      setAlertTrash(true);
      // return { pathname: "/365" };
    } else {
      history.push("/write");
    }
  };

  const answersBox = useRef();

  function rightMove(a) {
    if (num >= -150) {
      // num = num - 30;
      num === -150 ? (num = -160) : (num = num - 30);
      answersBox.current.style.transform = `translateX(${num}%)`;
      console.log(num);
    }
  }
  //데이터 세팅
  function leftMove() {
    if (num < 0) {
      num = num + 30;
      answersBox.current.style.transform = `translateX(${num}%)`;
      console.log(num);
      console.log(answersBox.current.style.transform);
    }
  }

  const getInformation = async () => {
    try {
      const res1 = await axios.get(`${process.env.REACT_APP_SERVER_IP}/random`);
      setRanname(res1.data);
      const res2 = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/random/${todayNum}`
      ); // /random/{question_num}
      setAnswerData(res2.data);
      const res3 = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/question/${todayNum}`
      );
      setQuestion(res3.data.question);

      if (memberNum !== null) {
        const res4 = await axios.get(
          `${process.env.REACT_APP_SERVER_IP}/answers/${todayNum}/${memberNum}`
        );
        if (res4.data.length > 0) {
          setTodayMyA(res4.data);
        }
        const res5 = await axios.get(
          `${process.env.REACT_APP_SERVER_IP}/trashes/${memberNum}`
        );
        const year = new Date().getFullYear();
        res5.data.filter((data) => {
          if (data.question_num === todayNum) {
            if (data.answer_year === year.toString()) {
              setTodayMYTrashA(true);
            }
          }
        });
      }
    } catch (error) {
      console.log("error: ", error);
      history.push("/error");
    }
  };

  useEffect(() => {
    setTodayNum(day);
    getInformation();
  }, []);

  function setAnswerData(data) {
    const dataArray = data;
    const pushCout = 8 - data.length;
    for (let index = 0; index < pushCout; index++) {
      dataArray.push("당신의 답변을 다른 사람들에게 공유해주세요");
    }
    setAnswer8(dataArray);
  }

  return (
    <div className="Home">
      <div className={props.isMobile ? "questions_mobile" : "questions"}>
        <p>
          {month}월 {date}일
        </p>
        <div>
          <img src={VectorLeft} alt="vectorLeft"></img>
          <p>{question}</p>
          <img
            src={VectorRight}
            alt="vectorRight"
            className="vectorRight"
          ></img>
        </div>
      </div>
      <div className="overflow">
        <div className="Aanswers" ref={answersBox}>
          {answer8.map((answer, index) => {
            return (
              <div className="Aanswer">
                <p>{ranname[index]}</p>
                <p>{answer}</p>
              </div>
            );
          })}
        </div>
        <div className="btnBox">
          <button onClick={leftMove}></button>
          <button onClick={rightMove}></button>
        </div>
      </div>
      <button id="goWriteBtn" onClick={handleClick}>
        <p>오늘 나의 생각 남기기</p>
        <img src={Vector} alt="vector"></img>
      </button>
      <div id={props.isMobile ? "bottom_mobile" : "bottom"}>
        <div className={props.isMobile ? "bottom_textBox_mobile" : "bottom"}>
          <p>365개의 질문,</p>
          <p>그리고 나와 나를 연결할 기록들.</p>
          <p>
            매일 달라지는 질문에 답해보세요. 사소하지만 큰 기록은 분명 당신과
            당신을 이어주는 고리가 될거예요. 3년 동안의 기록을 차곡차곡 모으고,
            찬찬히 나를 만나봐요.
          </p>
        </div>
        <img
          className={props.isMobile ? "bgImg_mobile" : "bgImg"}
          alt="bgImg"
          src={main}
        ></img>
      </div>
      {loginAlert ? (
        <LoginAlert setLoginAlert={setLoginAlert}></LoginAlert>
      ) : null}

      {confirmModalOn ? (
        <ConfirmAlert
          question={question}
          day={day}
          member_num={memberNum}
          setConfirmModalOn={setConfirmModalOn}
          todayMyA={todayMyA}
        />
      ) : null}

      {alertTrash ? <AlertTrash isClose={setAlertTrash} /> : null}
      <div className="backColor"></div>
    </div>
  );
}

export default Home;
