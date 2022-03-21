import { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import avatar from "../assets/avatar.svg";
import { selectName, selectUserId } from "../store/authSlice";
import Loading from "../components/loading/LoadingFull";
import { showNotif } from "../store/notifSlice";

const Friend = ({ friend, setPeople, people }) => {
  return (
    <div
      className={
        friend === people
          ? "flex p-3 hover:bg-d3 cursor-pointer bg-d5"
          : "flex p-3 hover:bg-d3 cursor-pointer"
      }
      onClick={() => setPeople(friend)}
    >
      <img src={avatar} alt="avatar" className="w-14" />
      <div className="ml-2 flex-grow flex flex-col items-start h-full">
        <div className="text-xl font-bold">{friend.name}</div>
        <p className="text-sm text-gray-300 chat-truncate">
          {friend.last_message}
        </p>
      </div>
    </div>
  );
};

const ChatMe = ({ message }) => {
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded shadow ml-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

const ChatOther = ({ message }) => {
  return (
    <li className="flex justify-start items-start">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-sky-300 rounded shadow mr-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

export default function Chat({ socket }) {
  const username = useSelector(selectName);
  const userId = useSelector(selectUserId);
  const [people, setPeople] = useState(false); // current show friend or chat
  const [ldFriend, setLdFriend] = useState(null);
  const [ldRead, setLdRead] = useState(null);
  const [ldUnrd, setLdUnrd] = useState(null);
  const [friends, setFriends] = useState([
    { id: 3, name: "dsad", message: "dsadsad" },
  ]); // list of friends
  const [messages, setMessages] = useState(null);
  const messageRef = useRef(null);
  const dispatch = useDispatch();

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log(data);
    if (data.type !== "Notif") {
      setMessages((messages) => [...messages, data]);
    }
  };

  useEffect(() => {
    const getAllFriends = async () => {
      try {
        setLdFriend(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/chat/friends/${userId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setFriends(data.friends);
      } catch (error) {
        console.log(error);
        dispatch(
          showNotif({
            type: "Error",
            message: "Gagal mengambil data teman",
            action: null,
          })
        );
      } finally {
        setLdFriend(false);
      }
    };
    userId && getAllFriends();
  }, [userId, dispatch]);

  const getUnreadChat = useCallback(
    async (friendId) => {
      try {
        setLdUnrd(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/chat/unreads/${userId}/${friendId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
        dispatch(
          showNotif({
            type: "Error",
            message: "Gagal mengambil data teman",
            action: null,
          })
        );
      } finally {
        setLdUnrd(false);
      }
    },
    [dispatch, userId]
  );
  const getReadChat = useCallback(
    async (friendId) => {
      try {
        setLdRead(true);
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/chat/reads/${userId}/${friendId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setMessages((prev) => [...prev, ...data.messages]);
      } catch (error) {
        console.log(error);
        dispatch(
          showNotif({
            type: "Error",
            message: "Gagal mengambil data teman",
            action: null,
          })
        );
      } finally {
        setLdRead(false);
      }
    },
    [dispatch, userId]
  );

  useEffect(() => {
    if (people) {
      getUnreadChat(people.friend);
    }
  }, [people, getUnreadChat]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    console.log(userId, people.friend, message);
    if (message) {
      socket.send(
        JSON.stringify({
          body: message,
          from: parseInt(userId),
          to: parseInt(people.friend),
        })
      );
    }
    messageRef.current.value = "";
    messageRef.current.scrollIntoView({ behavior: "smooth" });
    setMessages((prev) => [
      ...prev,
      { id: 32132, from: userId, body: message },
    ]);
  };
  return (
    <div className="flex">
      <div className="w-32 vvs:w-36 vs:w-44 xs:w-52 sm:w-60 md:w-72 dark-nav">
        <div className="flex gap-3 p-2 bg-d5">
          <img src={avatar} alt="avatar" className="w-10" />
          <p className="chat-truncate mt-1 leading-8 text-lg">{username}</p>
        </div>
        <div
          className="overflow-y-auto overflow-x-hidden"
          style={{ height: "82vh" }}
        >
          {!ldFriend ? (
            friends && friends.length > 0 ? (
              friends.map((item) => (
                <Friend
                  key={item.friend}
                  friend={item}
                  setPeople={setPeople}
                  people={people}
                />
              ))
            ) : (
              <p>tidak ada</p>
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="flex-grow relative">
        <div className="bg-d2 py-3.5 w-full flex justify-between items-center">
          <p className="text-lg ml-3">{people?.name || "salhuddin"}</p>
        </div>
        <div
          className="relative w-full p-6 overflow-y-auto"
          style={{ height: "82vh" }}
        >
          <ul className="space-y-2">
            {!ldUnrd ? (
              messages && messages.length > 0 ? (
                messages.map((item, index) => {
                  if (item.from == userId) {
                    return <ChatMe key={index} message={item.body} />;
                  } else {
                    return <ChatOther key={index} message={item.body} />;
                  }
                })
              ) : (
                <div className="text-center my-6 w-full">
                  <h3 className="text-body">
                    Tidak ada pesan yang belum dibaca
                  </h3>
                </div>
              )
            ) : (
              <Loading />
            )}
          </ul>
        </div>

        <div className="absolute bottom-0 w-full bg-d5">
          <form
            onSubmit={(e) => sendMessage(e)}
            className="flex items-center justify-between w-full p-3 border-t-2"
          >
            <input
              type="text"
              placeholder="Pesan"
              ref={messageRef}
              className="block w-full py-2 px-3 mr-2 outline-none text-gray-50 bg-d3 rounded-full focus:bg-d3"
              name="message"
              required
            />
            <button type="submit" className="btn-pri rounded-full py-2 px-2.5">
              <svg
                className="w-5 h-5 origin-center transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
