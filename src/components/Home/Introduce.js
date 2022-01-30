import React, { useState } from "react";
import "../../styles/Introduce.css";
import Introduce_top from "../../styles/images/07.png";
import ballon from "../../styles/images/Group 5582.png";
import { Link, useLocation } from "react-router-dom";
import made_people from "../../styles/images/made_people.png";
import soga00 from "../../styles/images/soga00.png";
import soga01 from "../../styles/images/soga01.png";
import soga02 from "../../styles/images/soga02.png";
import soga03 from "../../styles/images/soga03.png";
import soga04 from "../../styles/images/soga04.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function Introduce() {
  const slideData = [
    {
      img: soga00,
      title: "회원가입/로그인",
      pp: "카카오로 간편하게 회원가입과 로그인을 할 수 있어요.",
    },
    {
      img: soga01,
      title: "메인페이지",
      pp:
        "공개 설정한 일기에 한해 랜덤으로 다른 사람들의 이야기를 볼 수 있어요.",
    },
    {
      img: soga02,
      title: "나의 일기장",
      pp: "내 일기장에서 누적된 내 일기들을 날짜별로 모아 볼 수 있어요.",
    },
    {
      img: soga03,
      title: "휴지통",
      pp:
        "삭제된 일기는 휴지통에 7일간 보관됩니다. 삭제되기 전, 다시 되돌릴 수도 있어요.",
    },
    {
      img: soga04,
      title: "잠깐!",
      pp:
        "해당 날짜마다 질문이 달라져요. 답변은 그 날까지만 작성, 수정이 가능해요. 오늘의 질문을 놓치지 마세요!",
    },
  ];

  const location = useLocation();

  location.isLogged = (sessionStorage.getItem("nickname") && true) || false;
  const [current, setCurrent] = useState(0);
  const length = slideData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slideData) || slideData.length <= 0) {
    return null;
  }

  return (
    <div className="Introduce">
      <section className="top">
        <p>365 소개</p>
        <p>
          3년동안 365개의 질문에 대한 답변을 관리할 수 있는웹, 앱 다이어리
          서비스입니다
        </p>
      </section>
      <hr></hr>
      <img src={Introduce_top}></img>
      <section className="second">
        <p>365개의 질문, 그리고 나와 나를 연결할 기록들.</p>
        <img src={ballon}></img>
        <p>
          생각해보신적이 있나요? 매일 달라지는 질문에 답해 보세요. 사소하지만 큰
          기록은 분명 당신과 당신을 이어주는 고리가 될거에요. 3년동안의 기록을
          차곡차곡 모으고, 날짜별로 내 답변을 보면서 찬찬히 나를 만나봐요.
          당신이 당신을 만날수 있도록 저희 365가 도와드릴게요.{" "}
        </p>
      </section>
      <hr></hr>
      <section className="casual">
        <p>365 알차게 사용하기</p>
        <div id="clickBtns">
          <button onClick={prevSlide}></button>
          <button onClick={nextSlide}></button>
        </div>
        {slideData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={slide.img} className="image" />}
              {index === current && <p>{slide.title}</p>}
              {index === current && <p>{slide.pp}</p>}
            </div>
          );
        })}
        <div className="introSlideNav">
          {slideData.map((slide, index) => {
            return (
              <button
                className={current === index ? "introSlideNavActive" : null}
              ></button>
            );
          })}
        </div>
        {/* <div>
          <p>회원가입/로그인</p>
          <p>카카오로 간편하게 회원가입과 로그인을 할 수 있어요.</p>
        </div>  */}
      </section>
      <section className="goHome">
        <p>“나와 나를 연결할 준비, 되셨나요?”</p>
        {location.isLogged ? (
          <Link to="/list">
            <p>365 시작하기</p>
          </Link>
        ) : (
          <Link to="/login">
            <p>365 시작하기</p>
          </Link>
        )}
      </section>
      <section className="bottom">
        <p>만든 사람들</p>
        <img src={made_people}></img>
      </section>
    </div>
  );
}

export default Introduce;
