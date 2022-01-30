import React from "react";
import axios from "axios";
import xxxxx from "../../styles/images/xxxxx.png";
import DeleteModal from "../util/alert_modal/DeleteModal";

export default function TrashOneDeleteModal(props) {
  const goTrash = () => {
    try {
      axios.delete(
        `${process.env.REACT_APP_SERVER_IP}/trashes/${props.clickAN[0]}`,
        {
          data: {
            member_num: props.member, //props.member
            answer_delete: props.clickAN[1],
          },
        }
      );

      props.setPosts(
        props.posts.filter((data) => data.answer_num !== props.clickAN[0])
      );
      //   console.log(response);
      props.setOpenDeleteModal(false); // 성공했으니까 모달 창 다시 닫기
    } catch (error) {
      console.log("error: ", error);
      props.history.push("/error");
    }
  };

  function xDelete() {
    props.setOpenDeleteModal(false);
  }
  return <DeleteModal xDelete={xDelete} goTrash={goTrash} />;
}
