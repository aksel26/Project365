import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import toggle_unselected from "../../styles/images/main_private.png";
import toggle_selected from "../../styles/images/main_public.png";
import alertCheck from "../../styles/images/alertCheck.png";
import alertX from "../../styles/images/alertX.png";
import { Alert } from "../util/alert_modal/alert";
import axios, { Axios } from "axios";

import "../../styles/Write.css";
import Day365 from "../util/Day365";

function Write() {
  const history = useHistory();

  const NewDate = new Date();
  const month = NewDate.getMonth() + 1;
  const date = NewDate.getDate();
  const year = NewDate.getFullYear();

  const [question, setQuestion] = useState();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState("N");
  const [questionN, setQuestionN] = useState();
  const [member, setMember] = useState();
  // month date year도 내 일기장에서 선택된 날짜로 값이 바껴야함
  const [content, setContent] = useState("");
  const [sucessWrite, setSucessWrite] = useState(false);

  const day = Day365();

  function writeSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const answerDate = `${month}${date}`;

    axios
      .post(`${process.env.REACT_APP_SERVER_IP}/answers/new`, {
        answer_year: year,
        answer_date: answerDate,
        answer: content,
        public_answer: publica,
        question_num: questionN,
        member_num: member, //임시
      })
      .then(function (response) {
        //  if (response.status === 200) alert("글 등록 완료");
        setSucessWrite(true);
        // history.push("/list");
      })
      .catch(function (error) {
        console.log(error);
        history.push("/error");
      });
  }

  function inputCount(e) {
    const inputValue = e.target.value;
    setContent(inputValue);
    let count = inputValue.length;
    // 한글이랑 영어 카운터 다름 해결필요
    setCount(count);
  }

  function stateOpen() {
    setOpen(true);
    setPublica("Y");
  }

  function stateClose() {
    setOpen(false);
    setPublica("N");
  }

  useEffect(() => {
    const member_num = sessionStorage.getItem("member_num");
    setMember(Number(member_num));

    axios
      .get(`${process.env.REACT_APP_SERVER_IP}/question/calendars/${day}`)
      .then(function (response) {
        setQuestion(response.data.question);
        setQuestionN(response.data.question_num);
      })
      .catch(function (error) {
        console.log(error);
        history.push("/error");
      });
  }, [day]);

  return (
    <div className="Write">
      <div className="questions">
        <p>
          {month}월 {date}일, {year}
        </p>
        <div>
          <p>{question}</p>
        </div>
      </div>
      <form onSubmit={writeSubmit} className="writeBox">
        <textarea
          onInput={inputCount}
          value={content}
          maxLength="200"
        ></textarea>
        <p>{count}/200</p>
        <div>
          <div className="private">
            {open ? (
              <img
                src={toggle_selected}
                alt="public"
                onClick={stateClose}
              ></img>
            ) : (
              <img
                src={toggle_unselected}
                alt="private"
                onClick={stateOpen}
              ></img>
            )}
          </div>
          <div className="twoBtn">
            <button
              style={{ borderStyle: "none", backgroundColor: "transparent" }}
              onClick={() => history.push("/list")}
            >
              <p id="first">작성취소</p>
            </button>
            <button id="second" type="submit">
              저장하기
            </button>
          </div>
        </div>
      </form>
      <div className="backColor"></div>
      <div id="WriteBack"></div>
      {sucessWrite ? (
        <Alert
          goAway={"/list"}
          isClose={setSucessWrite}
          content={"작성"}
        ></Alert>
      ) : null}
    </div>
  );
}
export default Write;
