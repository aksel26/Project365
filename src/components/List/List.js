import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../../styles/List.css";
import monthBTN from "../../styles/images/monthBTN.png";
import xxxxx from "../../styles/images/xxxxx.png";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Calender from "../util/Calender";
import ListAnswer from "./ListAnswer";
import { Alert } from "../util/alert_modal/alert";
import Day365 from "../util/Day365";

function List() {
  const location = useLocation();
  const history = useHistory();

  // 다이렉트로 url 접근 시 뒤로가기
  // const getId = sessionStorage.getItem("id");
  // if (getId === null) history.goBack(-1);

  const [deletes, setDeletes] = useState(false);
  const [calender, setCalender] = useState(false);
  const [question, setQuestion] = useState();
  const [open, setOpen] = useState(false);
  const [publica, setPublica] = useState("N");
  const [dataAnswer, setDataAnswer] = useState([]);
  const [dataYear, setDataYear] = useState([]);
  const [member, setMember] = useState();
  const [deleteIndex, setDelteIndex] = useState();
  const [answerNum, setAnswerNum] = useState();
  const [answerAllData, setAnswerAllData] = useState([]);
  const [public_answer, setPublic_answer] = useState(["N"]);
  const [questionNum, setQuestionNum] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDelete, setIsDelete] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [day31, setDay31] = useState(new Date());
  const deleteModalContainer = useRef();
  const member_num = sessionStorage.getItem("member_num");

  let day365 = Day365();

  const [answerDate, setAnswerDate] = useState(
    location.state === undefined ? day365 : Number(location.state.id)
  );

  const [month, setMonth] = useState(
    location.state === undefined
      ? new Date().getMonth() + 1
      : location.state.targetMonth
  );
  const [date, setDate] = useState(
    location.state === undefined ? day365 : location.state.targetDate
  );
  function showDelete(index) {
    setDeletes(true);
    setDelteIndex(index);
  }

  function xDelete() {
    setDeletes(false);
  }

  function seeCalender() {
    setCalender(true);
  }
  const getQnA = useCallback(async () => {
    try {
      setMember(Number(member_num));
      const answers = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/answers/${date}/${member_num}`
      );
      setAnswerAllData(answers.data);
      const questions = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/question/calendars/${date}`
      );
      setQuestionData(questions.data);
    } catch (error) {
      console.log("error: ", error);
      history.push("/error");
    }
  }, [member_num, date, history, day31]);

  const filterAnswer = (answerAllData, questionData) => {
    setDataYear(answerAllData.map((item) => item.answer_year));
    setAnswerDate(answerAllData.map((item) => item.answer_date));
    setDataAnswer(answerAllData.map((item) => item.answer));
    setAnswerNum(answerAllData.map((item) => item.answer_num));
    setPublic_answer(answerAllData.map((item) => item.public_answer));
    setQuestion(questionData.question);
    setQuestionNum(questionData.question_num);
  };

  useEffect(() => {
    getQnA();
  }, [getQnA]);

  useEffect(() => {
    filterAnswer(answerAllData, questionData);
  }, [answerAllData, questionData]);

  function goTrash() {
    setDataAnswer(dataAnswer.filter((answer, index) => index !== deleteIndex)); //실제에서는 .then안에

    try {
      axios.patch(`${process.env.REACT_APP_SERVER_IP}/answers/trashes`, {
        answer_num: answerAllData[deleteIndex].answer_num,
        answer_delete: answerAllData[deleteIndex].answer_delete, //삭제이기때문에 항상 y로
        delete_date: new Date(+new Date() + 3240 * 10000)
          .toISOString()
          .split("T")[0], //오늘날짜로, date타입
        member_num: member,
        question_num: answerAllData[deleteIndex].question_num,
      });

      setIsDelete(true);

      setDeletes(false);
      setAnswerAllData(
        answerAllData.filter((data, index) => index !== deleteIndex)
      );
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  }

  function patchPublic(pa, index) {
    const aN = answerAllData[index].answer_num;
    axios({
      url: `/settings`,
      method: "patch",
      baseURL: process.env.REACT_APP_SERVER_IP,
      data: {
        public_answer: pa,
        answer_num: aN,
        member_num: member,
      },
    })
      .then((response) => {
        console.log(response);
        /* pa = "Y"
          ? alert("답변이 비공개 됐습니다")
          : alert("답변이 전체공개 됐습니다"); */
      })
      .catch((error) => {
        console.log(error);
        history.push("/error");
      });
  }

  function stateClose(index) {
    setOpen(true);
    setPublica("N");
    public_answer[index] = "Y";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index);
  }

  function stateOpen(index) {
    setOpen(false);
    setPublica("Y");
    public_answer[index] = "N";
    setPublic_answer(public_answer);
    patchPublic(public_answer[index], index);
  }

  return (
    <div className="List">
      <div className="questions">
        <div>
          <p>
            {month}월 {day31.getDate()}일
          </p>
          <p>{question}</p>
        </div>
        <img
          src={monthBTN}
          alt="seeCalenderBtn"
          style={{ cursor: "pointer" }}
          onClick={seeCalender}
        />
      </div>

      {/* 이것은 당일에 해당하는 답변이 없을 떄만 보여주어야 합니다 */}

      <ListAnswer
        showDelete={showDelete}
        dataAnswer={dataAnswer}
        dataYear={dataYear}
        answerAllData={answerAllData}
        question={question}
        answerNum={answerNum}
        open={open}
        stateOpen={stateOpen}
        stateClose={stateClose}
        public_answer={public_answer}
        day365={day365}
        date={date}
        month={month}
        selectedYear={selectedYear}
        member_num={member_num}
        day31={day31}
        setQuestion={setQuestion}
        calender={calender}
      />

      {deletes ? (
        <div className="deleteModal" ref={deleteModalContainer}>
          <img onClick={xDelete} src={xxxxx}></img>
          <p>답변을 정말 삭제하시겠어요?</p>
          <p>일기를 모두 삭제한 후엔 더 이상 질문을 확인할 수 없습니다.</p>
          <p>삭제된 답변은 휴지통에 일주일 동안 보관됩니다</p>
          <section>
            <p onClick={goTrash}>삭제하기</p>
            <p onClick={xDelete}>취소하기</p>
          </section>
        </div>
      ) : null}
      {isDelete ? (
        <Alert goAway={"/list"} isClose={setIsDelete} content={"삭제"}></Alert>
      ) : null}
      {calender ? (
        <Calender
          setDataYear={setDataYear}
          setDataAnswer={setDataAnswer}
          setQuestion={setQuestion}
          setCalender={setCalender}
          setAnswerAllData={setAnswerAllData}
          setMonth={setMonth}
          setDate={setDate}
          date={date}
          setSelectedYear={setSelectedYear}
          setDay31={setDay31}
        />
      ) : null}
    </div>
  );
}

export default List;
