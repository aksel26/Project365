import React from "react";
import axios from "axios";
import xxxxx from "../../styles/images/xxxxx.png";
import DeleteModal from "../util/alert_modal/DeleteModal";

export default function TrashAllDeleteModal(props) {
  props.setGotrashdata(props.posts);
  let sendData = props.gotrashdata.slice(); // 사본 만들기 deep copy

  function goTrash() {
    sendData.map((data) => {
      // axios api 호출 할 때 넘길 데이터 정리
      delete data.answer;
      delete data.answer_date;
      delete data.answer_year;
      delete data.delete_date;
      delete data.public_answer;
      delete data.question;
      return data;
    });
    axios({
      url: "/trashes/all",
      method: "delete",
      baseURL: `${process.env.REACT_APP_SERVER_IP}`,
      data: sendData,
    })
      .then((response) => {
        console.log(response);
        // props.setTrashAlldata([]); // trashAllData모두 삭제
        props.setPosts([]);
        props.setOpenTrashAllDeleteModal(false);
      })
      .catch((error) => {
        console.log(error);
        props.history.push("/error");
      });
  }

  function xDelete() {
    props.setOpenTrashAllDeleteModal(false);
  }

  return <DeleteModal xDelete={xDelete} goTrash={goTrash} />;
}
