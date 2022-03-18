import { useRef, useState } from "react";

import { useSelector } from "react-redux";

import avatar from "../assets/avatar.svg";
import { selectName, selectUserId } from "../store/authSlice";
import Loading from "../components/loading/LoadingFull";

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
        <p className="text-sm text-gray-300 chat-truncate">{friend.message}</p>
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

const friendList = [
  {
    id: 1,
    name: "salahuddin",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 2,
    name: "salan",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 3,
    name: "sauddin",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 43,
    name: "huddin",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 13,
    name: "salahuddin",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 22,
    name: "salan",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 37,
    name: "sauddin",
    message: "Dsadsad dasdsadsa dsa",
  },
  {
    id: 74,
    name: "huddin",
    message: "Dsadsad dasdsadsa dsa",
  },
];

const messageList = [
  {
    id: 1,
    message: "Hi dsadsa sad sad sad sad sad sad sadsa dsad ",
    from: "me",
  },
  {
    id: 2,
    message: "Hi dasd sadas dasd asdas dasd asdas dasd asdsa das dsada",
    from: "meg",
  },
  {
    id: 3,
    message: "Hi",
    from: "me",
  },
  {
    id: 31,
    message: "Hi dsadsa sad sad sad sad sad sad sadsa dsad ",
    from: "me",
  },
  {
    id: 23,
    message: "Hi dasd sadas dasd asdas dasd asdas dasd asdsa das dsada",
    from: "meg",
  },

  {
    id: 33,
    message: "Hi",
    from: "me",
  },
  {
    id: 4,
    message: "Hi",
    from: "me",
  },
  {
    id: 5,
    message: "Hi",
    from: "meg",
  },
  {
    id: 6,
    message: "Hi",
    from: "meg",
  },
  {
    id: 7,
    message: "Hi",
    from: "meg",
  },
  {
    id: 8,
    message: "Hi",
    from: "meg",
  },
];

export default function Chat({ socket }) {
  const username = useSelector(selectName);
  const userId = useSelector(selectUserId);
  const [people, setPeople] = useState(false);
  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState(messageList);
  const messageRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message) {
      socket.send(
        JSON.stringify({
          body : message,
          from: parseInt(userId),
          to: parseInt(people.id),
        })
      );
    }
    messageRef.current.value = "";
    messageRef.current.scrollIntoView({ behavior: "smooth" });
    setMessages((prev) => [...prev, { id :32132, from: "meg", message: message }]);
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
          {friendList && friendList.length > 0 ? (
            friendList.map((item) => (
              <Friend
                key={item.id}
                friend={item}
                setPeople={setPeople}
                people={people}
              />
            ))
          ) : (
            <p>tidak ada</p>
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
            {!loading ? (
              messages && messages.length > 0 ? (
                messages.map((item) => {
                  if (item.from === "me") {
                    return <ChatMe key={item.id} message={item.message} />;
                  } else {
                    return <ChatOther key={item.id} message={item.message} />;
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
