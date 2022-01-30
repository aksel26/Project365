import React, { useEffect, useState } from "react";
import "../../styles/Trash.css";
import delete_normal from "../../styles/images/delete_normal.png";
import restore_normal from "../../styles/images/restore_normal.png";
import Line from "../../styles/images/Line45.png";
import axios from "axios";
import xxxxx from "../../styles/images/xxxxx.png";
import Pagination from "./Pagination";
import Posts from "./Posts";
import { useHistory } from "react-router-dom";
import TrashAllDeleteModal from "./TrashAllDeleteModal";
import TrashOneDeleteModal from "./TrashOneDeleteModal";

function Trash() {
  const [member, setMember] = useState(
    Number(sessionStorage.getItem("member_num"))
  );
  const [trashAllData, setTrashAlldata] = useState([]); // "answer" => [] 변경
  const [openTrashAllDeleteModal, setOpenTrashAllDeleteModal] = useState(false);
  const [clickAN, setClickAN] = useState(); // deleteModal로 trashAllData의 answer_num 넘기기 위해 필요한 것
  const [gotrashdata, setGotrashdata] = useState([]); // TrashAllDeleteModal에서 휴지통 전체 비우기 api에 보내줄 Data

  //페이징 처리
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const history = useHistory();

  const getTrashes = async () => {
    try {
      const getTrashses = await axios.get(
        `${process.env.REACT_APP_SERVER_IP}/trashes/${member}`
      );
      setTrashAlldata(getTrashses.data); // 휴지통 전체 데이터 trashAllData에 저장
      setPosts(getTrashses.data);
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };
  useEffect(() => {
    getTrashes();
  }, []); // 렌더링 didupdate unmount 다시 생각해보기!!!!!!!!!!!

  function allClear() {
    setOpenTrashAllDeleteModal(true); // 모달 창 열어주기
  }

  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  /*                 */

  return (
    <div className="Trash">
      <div>
        <p>휴지통</p>
        <p onClick={allClear}>휴지통 비우기</p>
      </div>
      <p>휴지통에 있는 일기는 7일이 지나면 완전히 삭제됩니다</p>
      <Posts
        posts={currentPosts(posts)}
        setPosts={setPosts}
        member={member}
        setClickAN={setClickAN}
      ></Posts>
      {posts.length > 5 ? (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={setCurrentPage}
        ></Pagination>
      ) : null}

      <section>
        {openTrashAllDeleteModal ? (
          <TrashAllDeleteModal
            setOpenTrashAllDeleteModal={setOpenTrashAllDeleteModal}
            trashAllData={trashAllData}
            setTrashAlldata={setTrashAlldata}
            gotrashdata={gotrashdata}
            setGotrashdata={setGotrashdata}
            posts={posts}
            setPosts={setPosts}
            history={history}
          />
        ) : null}
      </section>

      <div className="backColor"></div>
    </div>
  );
}

export default Trash;
