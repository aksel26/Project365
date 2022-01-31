import React from "react";
import noAnswer from "../../styles/images/listNoAnswer.png";
export default function ListNoAnswer({ setQuestion }) {
  setQuestion("*해당 날짜에 작성된 일기가 없습니다.");
  return (
    <div className="noAnswer">
      <hr />
      <img src={noAnswer} className="noAnswerImg" alt="noAnswerImg" />
      <div className="noAnswerText">
        작성한 일기가 없어 해당 날짜의 질문을 확인할 수 없습니다.
      </div>
    </div>
  );
}
