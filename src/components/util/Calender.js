import React, { useCallback, useEffect } from "react";
import DatePicker from "react-datepicker";
import xxxxx from "../../styles/images/xxxxx.png";
import { useState } from "react";
import axios from "axios";
import AlertCalender from "../util/alert_modal/AlertCalender";
import Day365 from "./Day365";

export default function Calender(props) {
  const [startDate, setStartDate] = useState(new Date());
  const member_num = sessionStorage.getItem("member_num");
  const [answers, setAnswers] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const calender = "cal";
  const now = new Date();
  const dateInit = new Date(now.getFullYear(), 0, 0);
  const reqDay = Math.floor((now - dateInit) / (1000 * 60 * 60 * 24));

  const [selectedDate, setSelectedDate] = useState(reqDay);

  const [clickFag, setClickFag] = useState(false);

  const handleChange = (date, e) => {
    const day365 = Day365(date);
    setSelectedDate(day365);
    setStartDate(date);
    getAnswers(day365);
    props.setDay31(date);
    props.setMonth(date.getMonth() + 1);
    setClickFag(true);
  };

  const getAnswers = useCallback(
    async (day365) => {
      try {
        const responseAnswer = await axios.get(
          `${process.env.REACT_APP_SERVER_IP}/answers/${day365}/${member_num}`
        );
        setAnswers(responseAnswer.data);
      } catch (error) {
        console.log(error);
      }
    },
    [member_num, setAnswers]
  );

  const renderToList = (answers) => {
    console.log("startDate: ", startDate);

    //답변이 하나라도 있을 경우
    if (answers.length > 0) {
      props.setMonth(startDate.getMonth() + 1);
      props.setDate(selectedDate);
      props.setSelectedYear(startDate.getFullYear());
      props.setCalender(false);
      // 답변이 하나도 없을 경우
    } else {
      //  답변이 하나도 없고 다른날짜를 선택한 경우
      if (selectedDate !== reqDay) {
        setIsModalOn(true);
      } else {
        // 답변이 하나도 없고 같은 날짜를 선택한 경우
        if (clickFag) {
          props.setMonth(startDate.getMonth() + 1);
          props.setDate(selectedDate);
          props.setSelectedYear(startDate.getFullYear());
          props.setCalender(false);
        }
      }
    }
  };

  useEffect(() => {
    renderToList(answers);
  }, [answers]);

  function closeCanlender() {
    props.setCalender(false);
  }
  return (
    <div>
      <div className="calendar">
        <div className="calendar_close">
          <img src={xxxxx} alt="closeBtn" onClick={closeCanlender} />
        </div>
        <DatePicker
          selected={startDate}
          wrapperClassName="react-datepicker"
          onChange={(date, e) => {
            handleChange(date, e);
          }}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <>
              <button
                type="button"
                class="react-datepicker__navigation react-datepicker__navigation--previous"
                aria-label="Previous Month"
                onClick={decreaseMonth}
              >
                <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
                  Previous Month
                </span>
              </button>
              <div>{date.getMonth() + 1}월</div>
              <button
                type="button"
                class="react-datepicker__navigation react-datepicker__navigation--next"
                aria-label="Next Month"
                onClick={increaseMonth}
              >
                <span class="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
                  Next Month
                </span>
              </button>
            </>
          )}
          dateFormat="MM월 dd일"
          inline
          popperModifiers={{
            // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
            preventOverflow: {
              enabled: true,
            },
          }}
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3).toUpperCase()}
        />
        {isModalOn ? (
          <AlertCalender calender={calender} isClose={setIsModalOn} />
        ) : null}
      </div>
    </div>
  );
}
