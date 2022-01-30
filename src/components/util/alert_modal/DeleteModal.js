import React from "react";
import xxxxx from "../../../styles/images/xxxxx.png";

export default function DeleteModal({ xDelete, goTrash }) {
  return (
    <div className="deleteModal">
      <img onClick={xDelete} src={xxxxx}></img>
      <p>휴지통을 정말 비우시겠어요?</p>
      <p>휴지통에서 삭제하면 답변을 복구할 수 없습니다</p>
      <section>
        <p onClick={goTrash}>삭제하기</p>
        <p onClick={xDelete}>취소하기</p>
      </section>
    </div>
  );
}
