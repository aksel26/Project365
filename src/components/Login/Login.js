import React from "react";
import { useEffect, useRef, useState } from "react";
import loginImage from "../../styles/images/loginImage.png";
import login01 from "../../styles/images/loginpage01.png";
import login02 from "../../styles/images/loginpage02.png";
import rigthArrow from "../../styles/images/Vector 1.png";
import kaka from "../../styles/images/kakao.png";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import "../../styles/Login.css";
import axios from "axios";

// 배포환경
// const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL_PROD;

// 개발환경
const KAKAO_AUTH_URL = process.env.REACT_APP_KAKAO_AUTH_URL;

function Login() {
  const slideData = [
    {
      img: login01,
      title: "365개의 질문, 그리고 나와 나를 연결할 기록들.",
      pp: "매일 달라지는 질문에 답해 보세요. 사소하지만 큰 기록은 분명",
      ppTwo: "당신과 당신을 이어주는 고리가 될거에요.",
    },
    {
      img: login02,
      title: "소중한 오늘의 질문을 놓치지 마세요!",
      pp: "날짜마다 질문이 달라져요. 답변은 그날까지만 작성, 수정이 가능해요.",
      ppTwo: "때를 놓치지 말고 나의 생각을 남겨보세요!",
    },
  ];

  const [current, setCurrent] = useState(0);

  if (!Array.isArray(slideData) || slideData.length <= 0) {
    return null;
  }

  return (
    <div className="Login">
      <section>
        {slideData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={slide.img} className="image" />}
              {index === current && <p>{slide.title}</p>}
              {index === current && <p>{slide.pp}</p>}
              {index === current && <p>{slide.ppTwo}</p>}
            </div>
          );
        })}
        <div className="practice">
          <button
            className={current === 0 ? "choice" : null}
            id="firstChoice"
            onClick={() => setCurrent(0)}
          >
            1
          </button>
          <button
            className={current === 1 ? "choice" : null}
            id="secondChoice"
            onClick={() => setCurrent(1)}
          >
            2
          </button>
        </div>
      </section>
      <section>
        <p>로그인</p>
        <p>카카오톡 계정으로 1초 만에 로그인하세요.</p>
        <div className="button">
          <img src={kaka}></img>
          <a href={KAKAO_AUTH_URL}>
            <p>카카오톡으로 계속</p>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Login;
