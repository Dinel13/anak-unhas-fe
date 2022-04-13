import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { selectId } from "../../store/authSlice";
import Loading from "./Loading";
import { showAlert } from "../../store/alertSlice";

interface Friend {
  frn_id: number;
  message: string;
  frn_image: string;
  frn_name: string;
  notif?: boolean;
}

interface FriendProps {
  crrnFrn: Friend;
  setCrrnFrn: (crrnFrn: Friend) => void;
}

const Friend: FC<FriendProps> = ({ crrnFrn, setCrrnFrn }) => {
  return (
    <div
      className="flex p-3 hover:bg-d3 cursor-pointer"
      onClick={() => setCrrnFrn(crrnFrn)}
    >
      <div className="relative h-14">
        <Image
          src={crrnFrn.frn_image ? crrnFrn.frn_image : "/image/avatar.svg"}
          alt="avatar"
          className="rounded-full"
          layout="fill"
        />
      </div>
      <div className="ml-2 flex-grow flex flex-col items-start h-full">
        <div className="text-xl font-bold">{crrnFrn.frn_name}</div>
        <p className="text-sm text-gray-300 chat-truncate">{crrnFrn.message}</p>
      </div>
    </div>
  );
};

const ChatMe = ({ message }: { message: string }) => {
  console.log("dsadsa", message);
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded shadow ml-2">
        <span className="block">{message}</span>
      </div>
    </li>
  );
};

const ChatOther = ({ message }: { message: string }) => {
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

interface SendMessage {
  action: string;
  message: string;
  from: number;
  to: number;
}

interface Message {
  message: string;
  from?: number;
}

interface WSFromServer {
  id?: string;
  action: string;
  from: number;
  to?: number;
  read?: boolean;
  message: string;
  time?: number;
}

interface ChatProps {
  socket: WebSocket;
}

const Chat: FC<ChatProps> = ({ socket }) => {
  console.log("dsadsa", socket);

  const [show, setShow] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [crrnFrn, setCrrnFrn] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [ldRead, setLdRead] = useState(false);
  const [ldUnrd, setLdUnrd] = useState(false);
  const [ldFriend, setLdFriend] = useState(false);
  const userId = useSelector(selectId);
  const dispatch = useDispatch();

  const getReadChat = useCallback(
    async (friendId) => {
      try {
        setLdRead(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/reads/${userId}/${friendId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.data);
        }
        data.messages?.length > 0 &&
          setMessages((prev) => [...prev, ...data.messages]);
      } catch (error) {
        console.log(error);
        dispatch(
          showAlert({
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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/unreads/${userId}/${friendId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.data);
        }
        data.messages?.length > 0
          ? setMessages((prev) => [...prev, ...data.messages])
          : getReadChat(friendId);
      } catch (error) {
        console.log(error);
        dispatch(
          showAlert({
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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/read/`,
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

  socket.onmessage = (e) => {
    const data: WSFromServer = JSON.parse(e.data);
    if (data.action === "chat") {
      // jika pengirim pesan sama dengan people yang sedang dilihat
      // maka make chat read
      // jika tidak maka tampahkan notif ke frinds jika ada
      if (data.from === crrnFrn?.frn_id) {
        const newMessage: Message = {
          message: data.message,
          from: data.from,
        };
        setMessages((prev) => [...prev, newMessage]);
        makeChatRead(data.from);
      } else {
        let finded = false;
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].frn_id === data.from) {
            friends[i].notif = true;
            setFriends([...friends]);
            finded = true;
            break;
          }
        }
        if (!finded) {
          const newFriend: Friend = {
            frn_id: data.from,
            notif: true,
            message: data.message,
            frn_image: "",
            frn_name: "Teman baru",
          };
          setFriends([newFriend, ...friends]);
        }
      }
    }
  };
  useEffect(() => {
    const getAllFriends = async () => {
      try {
        setLdFriend(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/friends/${userId}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.data);
        }
        data.friends?.length > 0 &&
          setFriends((prev) => [...prev, ...data.friends]);
      } catch (error) {
        console.log(error);
        dispatch(
          showAlert({
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
    if (crrnFrn) {
      getUnreadChat(crrnFrn.frn_id);
    }
  }, [crrnFrn, getUnreadChat]);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && crrnFrn) {
      const payload: SendMessage = {
        action: "chat",
        message,
        from: parseInt(userId),
        to: crrnFrn.frn_id,
      };
      socket.send(JSON.stringify(payload));
    }
    setMessage("");
    setMessages((prev) => [
      ...prev,
      { from: parseInt(userId), message, time: Date.now() },
    ]);
  };

  return (
    <div className="fixed right-5 bottom-5 z-10">
      <div
        className="flex items-center relative"
        onClick={() => {
          !show && setShow(true);
        }}
      >
        {show && (
          <>
            <div className="opacity-5 fixed inset-0 z-20 bg-black "></div>
            <div className="w-80 xs:w-102 absolute rounded-lg right-0 shadow-xl bottom-0 dark-nav z-20">
              <div className="flex">
                <div className="w-32 border-r border-d2 rounded-l-xl">
                  <div className="flex gap-3 px-2 py-3 bg-d2 rounded-l-xl">
                    <p>Chat</p>
                  </div>
                  <div
                    className="overflow-y-auto overflow-x-hidden bg-d1"
                    style={{ height: "70vh"  }}
                  >
                    {!ldFriend ? (
                      friends && friends.length > 0 ? (
                        friends.map((item) => (
                          <Friend
                            key={item.frn_id}
                            crrnFrn={item}
                            setCrrnFrn={setCrrnFrn}
                          />
                        ))
                      ) : (
                        <p className="text-center text-sm mt-10">Belum ada temen</p>
                      )
                    ) : (
                      <Loading />
                    )}
                  </div>
                </div>
                <div className="grow rounded-r-xl">
                  <div className="flex items-center justify-between bg-d2 rounded-r-xl px-2">
                    <p>{crrnFrn?.frn_name}</p>
                    <button
                      className="py-2 pl-2"
                      onClick={() => {
                        setCrrnFrn(null);
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

                  {crrnFrn ? (
                    <>
                      <div
                        className="relative w-full p-6 overflow-y-auto bg-d1"
                        style={{ height: "70vh"  }}
                      >
                        <ul className="space-y-2">
                          {!ldUnrd ? (
                            messages && messages.length > 0 ? (
                              messages.map((item, index) => {
                                if (item.from === crrnFrn.frn_id) {
                                  return (
                                    <ChatOther
                                      key={index}
                                      message={item.message}
                                    />
                                  );
                                } else {
                                  return (
                                    <ChatMe
                                      key={index}
                                      message={item.message}
                                    />
                                  );
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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
                    </>
                  ) : (
                      <div
                        className="flex w-full justify-center items-center bg-d1"
                        style={{ height: "70vh"  }}
                      >
                        <p className="text-center text-xl">
                        Mulai obrolan!
                        </p>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

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
};

export default Chat;
