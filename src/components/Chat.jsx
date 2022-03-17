import { useRef, useState } from "react";

import Loading from "./loading/LoadingFull";
import avatar from "../assets/avatar.svg";

const Friend = ({ friend, setPeople }) => {
  return (
    <div
      className="flex p-3 hover:bg-d3 cursor-pointer"
      onClick={() => setPeople(friend)}
    >
      <img src={avatar} alt="avatar" className="w-14" />
      <div className="ml-2 flex-grow flex flex-col items-start h-full">
        <div className="text-xl font-bold">{friend.name}</div>
        <p className="text-sm text-gray-300 chat-truncate">
          {friend.message}
        </p>
      </div>
    </div>
  );
};

const ChatMe = ({ message }) => {
  console.log("dsadsa", message);
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded shadow ml-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

const ChatOther = ({ message }) => {
  console.log("Dsadadsadsadsadsadsa");
  console.log(message);
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
    id: 4,
    name: "huddin",
    message: "Dsadsad dasdsadsa dsa",
  },
];

export default function Chat() {
  const [show, setShow] = useState(false);
  const [people, setPeople] = useState(false);
  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;

    // clean the input field
    messageRef.current.value = "";

    // scroll to bottom
    messageRef.current.scrollIntoView({ behavior: "smooth" });

    // append the message to the list
    setMessages((prev) => [...prev, { from: "meg", message: message }]);
  };

  return (
    <div className="fixed right-5 bottom-5 z-10">
      <div
        className="flex items-center relative"
        onClick={() => {
          !show && setShow(true);
        }}
      >
        {show &&
          (people ? (
            <>
              <div className="opacity-5 fixed inset-0 z-20 bg-black "></div>
              <div className="w-96 absolute rounded-lg right-0 shadow-xl bottom-0 dark-nav z-20">
                <div className="dark-sidebar w-full flex justify-between items-center px-3 py-2 rounded-t-md ">
                  <div className="flex items-center">
                    <button onClick={() => setPeople(null)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                    </button>{" "}
                    {people.name}
                  </div>
                  <button
                    className="py-2 pl-2"
                    onClick={() => {
                      setPeople(null);
                      setShow(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="h-96">
                  <div className="relative w-full p-6 overflow-y-auto h-[20rem]">
                    <ul className="space-y-2">
                      {!loading ? (
                        messages && messages.length > 0 ? (
                          messages.map((item) => {
                            if (item.from === "me") {
                              return <ChatMe message={item.message} />;
                            } else {
                              return <ChatOther message={item.message} />;
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

                  <form
                    onSubmit={(e) => sendMessage(e)}
                    className="flex items-center justify-between w-full p-3 border-t-2 border-gray-500"
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
            </>
          ) : (
            <>
              <div className="opacity-5 fixed inset-0 z-20 bg-black "></div>
              <div className="w-96 absolute rounded-lg right-0 shadow-xl bottom-0 dark-nav z-20">
                <div className="dark-sidebar w-full flex justify-between items-center px-3 py-2 rounded-t-md ">
                  <div className="flex items-center text-lg">Chat</div>
                  <button className="py-2 pl-2" onClick={() => setShow(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="h-102 overflow-y-auto overflow-x-hidden">
                  {friendList && friendList.length > 0 ? (
                    friendList.map((item) => (
                      <Friend
                        key={item.id}
                        friend={item}
                        setPeople={setPeople}
                      />
                    ))
                  ) : (
                    <p>tidak ada</p>
                  )}
                </div>
              </div>
            </>
          ))}
        <div className="text-white bg-rose-900 focus:outline-none hover:bg-d1 transition-colors duration-150 py-1.5 px-3 cursor-pointer flex items-center text-sm rounded-full border-2 border-sky-300 shadow-lg shadow-red-700 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1.5 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          <span className="tracking-wide">Chat</span>
        </div>
      </div>
    </div>
  );
}
