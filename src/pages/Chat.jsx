import { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import avatar from "../assets/avatar.svg";
import { selectName, selectUserId } from "../store/authSlice";
import Loading from "../components/loading/LoadingFull";
import { showNotif } from "../store/notifSlice";
import { useLocation } from "react-router";

const Friend = ({ friend, setPeople, people }) => {
  return (
    <div className="relative">
      <div
        className={
          friend === people
            ? "flex p-3 hover:bg-d3 cursor-pointer bg-d5"
            : "flex p-3 hover:bg-d3 cursor-pointer"
        }
        onClick={() => setPeople(friend)}
      >
        <img
          src={
            friend.frn_image
              ? process.env.REACT_APP_SERVER_URL_IMAGE +
                "/user/" +
                friend.frn_image
              : avatar
          }
          alt="avatar"
          className="w-8 h-8 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full"
        />
        <div className="ml-2 flex-grow flex flex-col items-start h-full">
          <div className="text-base sm:text-lg lg:text-xl font-bold truncate">
            {friend.frn_name}
          </div>
          <p className="text-sm text-gray-300 chat-truncate">
            {friend.message}
          </p>
        </div>
        {friend.notif && <div className="absolute top-1 right-1">notif</div>}
      </div>
    </div>
  );
};

const ChatMe = ({id, message }) => {
  return (
    <li className="flex justify-end">
      <div id={id} className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded shadow ml-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

const ChatOther = ({id, message }) => {
  return (
    <li className="flex justify-start items-start">
      <div id={id} className="relative max-w-xl px-4 py-2 text-gray-700 bg-sky-300 rounded shadow mr-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

export default function Chat({ socket }) {
  const username = useSelector(selectName);
  const userId = useSelector(selectUserId);
  const [people, setPeople] = useState(null); // current show friend or chat
  const [ldFriend, setLdFriend] = useState(null);
  const [ldRead, setLdRead] = useState(null);
  const [ldUnrd, setLdUnrd] = useState(null);
  const [friends, setFriends] = useState([]); // list of friends
  const [messages, setMessages] = useState([]);
  const [fokus, setFokus] = useState(null);
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  const { state } = useLocation();

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
        data.messages?.length > 0 &&
          setMessages((prev) => [...prev, ...data.messages]);
      } catch (error) {
        console.log(error);
        dispatch(
          showNotif({
            type: "Error",
            message: "Gagal mengambil data pesan lama",
            action: null,
          })
        );
      } finally {
        setLdRead(false);
      }
    },
    [dispatch, userId]
  );

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
        data.messages?.length > 0
          ? setMessages((prev) => [...prev, ...data.messages])
          : getReadChat(friendId);
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
    [dispatch, getReadChat, userId]
  );

  // make chat read to assign the message as readed
  const makeChatRead = useCallback(
    async (friendId) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/chat/read/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: parseInt(userId),
              friend: parseInt(friendId),
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (state) {
      const friendState = {
        frn_id: state.user.id,
        frn_name: state.user.name,
        frn_image: state.user.image,
      };
      setPeople(friendState);
      setFriends((prev) => [...prev, friendState]);
    }
  }, [state]);

  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type !== "Notif") {
      // jika pengirim pesan sama dengan people yang sedang dilihat
      // maka make chat read
      // jika tidak maka tampahkan notif ke frinds jika ada
      if (data.from === people?.frn_id) {
        setMessages((prev) => [...prev, data]);
        setFokus(data.time);
        makeChatRead(data.from);
      } else {
        let finded = false;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].friend === data.from) {
            friends[i].notif = true;
            setFriends([...friends]);
            finded = true;
            break;
          }
        }
        if (!finded) {
          setFriends([
            { frn_id: data.from, notif: true, message: data.body },
            ...friends,
          ]);
        }
      }
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
        data.friends?.length > 0 &&
          setFriends((prev) => [...prev, ...data.friends]);
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

  useEffect(() => {
    if (people && people.frn_id) {
      getUnreadChat(people.frn_id);
    }
  }, [people, getUnreadChat]);

  // useEffect(() => {
  //   if (messages?.length > 0) {
  //     let friendID;
  //     // untuk mengambil id friend dari pesan yang masuk
  //     for (let i = 0; i < messages.length; i++) {
  //       if (messages[i].from !== parseInt(userId)) {
  //         friendID = messages[i].from;
  //         break;
  //       }
  //     }
  //     // jika id frined pengirim pesan yang masuk tidak sama dengan id people yang tampil
  //     // maka kirimkan chat telah dibaca
  //     // jika tidak maka
  //     friendID === people?.friend && makeChatRead(messages[0].from);
  //   }
  // }, [messages, makeChatRead, people, userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message) {
      socket.send(
        JSON.stringify({
          body: message,
          from: parseInt(userId),
          to: parseInt(people.frn_id),
        })
      );
    }
    messageRef.current.value = "";
    messageRef.current.scrollIntoView({ behavior: "smooth" });
    const time = new Date();
    console.log(time);
    setMessages((prev) => [...prev, { from: userId, body: message, time }]);
    setFokus(time);
  };

  // console.log("message :", messages);
  // console.log("fren :", friends);
  // console.log("pople :", people);

  // scrpll to bottom
  useEffect(() => {
    fokus && document.getElementById(fokus).scrollIntoView({
      behavior: "smooth",
    });
  }, [fokus]);

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
                  key={item.frn_id}
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
      {people ? (
        <div className="flex-grow relative">
          <div className="bg-d2 h-14 w-full flex justify-between items-center">
            <p className="text-lg ml-3">{people?.frn_name}</p>
          </div>
          <div
            className="relative w-full p-6 overflow-y-auto"
            style={{ height: "82vh" }}
          >
            <ul className="space-y-2">
              {!ldUnrd ? (
                people && messages && messages.length > 0 ? (
                  <>
                    <button onClick={() => getReadChat(people.frn_id)}>
                      load data lama
                    </button>
                    {messages.map( item => {
                      if (item.from == userId) {
                        return <ChatMe key={item.time} id={item.time} message={item.body} />;
                      } else {
                        return <ChatOther key={item.time} id={item.time} message={item.body} />;
                      }
                    })}
                  </>
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
              <button
                type="submit"
                className="btn-pri rounded-full py-2 px-2.5"
              >
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
      ) : (
        <div className="flex-grow relative">
          <div className="bg-d2 h-14 w-full flex justify-between items-center"></div>
          <div
            className="flex w-full justify-center items-center"
            style={{ height: "82vh" }}
          >
            <p>
              Mulai chat denngan memilih teman disamoping atau cari terlebih
              dahulu
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
