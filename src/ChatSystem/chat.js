import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import "./chat.css";
import ChatMessage from "./ChatMessage";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Header from "../Components/Header/Header";

const Chat = () => {
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();
  const [messages, setMessages] = useState();

  const [formValue, setFormValue] = useState("");
  const dummy = useRef();
  onSnapshot(collection(db, "messages"), (snap) => {
    let messages = [];
    snap.docs.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc._id });
    });
    console.log(messages);
  });
  const sendMessage = async (e) => {
    e.preventDefault();

    const _id = userInfo._id;
    addDoc(collection(db, "messages"), {
      text: formValue,
      _id,
      createdAt: serverTimestamp(),
    }).then(() => {
      setFormValue("");
    });

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    }
  }, [userInfo, error]);

  return (
    <>
      <Header />
      <div className="chat"></div>
      {/* <main> */}
      {/* {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} userInfo={userInfo} />
          ))} */}

      {/* <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form> */}
    </>
  );
};

export default Chat;
