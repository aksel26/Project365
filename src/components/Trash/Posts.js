import React, { useState } from "react";
import delete_normal from "../../styles/images/delete_normal.png";
import restore_normal from "../../styles/images/restore_normal.png";
import Line from "../../styles/images/Line45.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import TrashOneDeleteModal from "./TrashOneDeleteModal";

const Posts = ({ posts, setPosts, member }) => {
  const history = useHistory();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [clickAN, setClickAN] = useState();

  function revert(answer_num, answer_delete, delete_date, question_num) {
    axios({
      url: `/trashes/settings/${answer_num}/${member}`, // `/trashes/settings/${answer_num}/${member_num}`
      method: "patch",
      baseURL: process.env.REACT_APP_SERVER_IP,
      data: {
        answer_delete: answer_delete, // N or Y
        delete_date: delete_date, //date타입
        question_num: question_num,
      },
    })
      .then(function (response) {
        console.log(response);
        setPosts(posts.filter((data) => data.answer_num !== answer_num));
      })
      .catch(function (error) {
        console.log(error);
        history.push("/error");
      });
  }

  function oneRemove(answer_num, answer_delete) {
    setOpenDeleteModal(true); // 모달 창 열어주기
    setClickAN([answer_num, answer_delete]); // 모달 창에서 answer_num사용할 수 있게 clickAN에 값 저장\
  }

  return (
    <section>
      {posts.map((data, index) => {
        return (
          <div>
            <hr></hr>
            <div className="question">
              <p>
                {data.answer_date && data.answer_date.substring(0, 2)}월{" "}
                {data.answer_date && data.answer_date.substring(2, 4)}일
              </p>
              <p>{data.question}</p>
            </div>
            <div className="answers">
              <p>{data.answer_year}년의 나:</p>
              <p>{data.answer}</p>
            </div>
            <div className="btns">
              <img
                onClick={() =>
                  revert(
                    data.answer_num,
                    data.answer_delete,
                    data.delete_date,
                    data.question_num
                  )
                }
                alt="복원"
                src={restore_normal}
              ></img>
              <img src={Line}></img>
              <img
                onClick={() => oneRemove(data.answer_num, data.answer_delete)}
                alt="삭제"
                src={delete_normal}
              ></img>
            </div>
          </div>
        );
      })}
      {openDeleteModal ? (
        <TrashOneDeleteModal
          clickAN={clickAN}
          member={member}
          posts={posts}
          setPosts={setPosts}
          setOpenDeleteModal={setOpenDeleteModal}
          history={history}
        />
      ) : null}
    </section>
  );
};
export default Posts;
