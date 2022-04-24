import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { selectId, selectName } from "../store/authSlice";
import Loading from "../components/common/LoadingButton";
import { showAlert } from "../store/alertSlice";
import Friend from "../components/chat/Friend";
import { ChatMe, ChatOther } from "../components/chat/Chat";
import { useAppContext } from "../context/state";

export interface Friend {
  frn_id: number;
  message: string;
  frn_image: string;
  frn_name: string;
  notif?: boolean;
}

interface SendMessage {
  action: string;
  message: string;
  from: number;
  to: number;
}

interface Message {
  message: string;
  from?: number;
  time?: string;
}

interface WSFromServer {
  id?: string;
  action: string;
  from: number;
  to?: number;
  read?: boolean;
  message: string;
  time?: string;
}

interface QueryUser {
  id: string;
  name: string;
  image: string;
}

const Chat: FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [crrnFrn, setCrrnFrn] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [ldRead, setLdRead] = useState(false);
  const [ldUnrd, setLdUnrd] = useState(false);
  const [ldFriend, setLdFriend] = useState(false);
  const { socket } = useAppContext();
  const userId = useSelector(selectId);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();
  const router = useRouter();
  const userQuery = router.query.user ? router.query.user + "" : undefined;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (socket) {
    socket.onmessage = (e: MessageEvent<any>) => {
      const data: WSFromServer = JSON.parse(e.data);
      if (data.action === "chat") {
        // jika pengirim pesan sama dengan people yang sedang dilihat
        // maka make chat read
        // jika tidak maka tampahkan notif ke frinds jika ada
        if (data.from === crrnFrn?.frn_id) {
          const newMessage: Message = {
            message: data.message,
            from: data.from,
            time: new Date().toString(),
          };
          setMessages([...messages, newMessage]);
          // makeChatRead(data.from);
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
  } else {
    typeof window !== "undefined" && !userId && router.push("/");
  }

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
        data.data?.length > 0 ? setMessages(data.data) : getReadChat(friendId);
      } catch (error) {
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
      } catch (error) {}
    },
    [userId]
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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
        data.data?.length > 0 && setFriends(data.data);
      } catch (error) {
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

    if (userQuery) {
      const dataQuery = JSON.parse(userQuery);
      setCrrnFrn({
        frn_id: parseInt(dataQuery.id),
        message: "",
        frn_image: dataQuery.image,
        frn_name: dataQuery.name,
        notif: false,
      });
    }
  }, [userId, dispatch, userQuery]);

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
    setMessages([
      ...messages,
      { from: parseInt(userId), message, time: Date.now().toString() },
    ]);
  };

  return (
    <div className="flex">
      <div className="w-32 vvs:w-36 vs:w-44 xs:w-52 sm:w-60 md:w-72 dark-nav">
        <div className="flex gap-3 p-2 bg-d5">
          <div className="relative h-10">
            <Image src="/u.jpg" alt="avatar" layout="fill" />
          </div>
          <p className="chat-truncate mt-1 leading-8 text-lg">{userName}</p>
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
      {crrnFrn ? (
        <div className="flex-grow relative">
          <div className="bg-d2 h-14 w-full flex justify-between items-center">
            <Link href={"/user/" + crrnFrn?.frn_id}>
              <a className="text-lg text-gray-200 ml-3">{crrnFrn?.frn_name}</a>
            </Link>
          </div>
          <div
            className="relative w-full p-6 overflow-y-auto mb-3"
            style={{ height: "82vh" }}
          >
            <ul className="space-y-2">
              {!ldUnrd ? (
                messages && messages.length > 0 ? (
                  messages.map((item) => {
                    if (item.from === crrnFrn.frn_id) {
                      return (
                        <ChatOther key={item.time} message={item.message} />
                      );
                    } else {
                      return <ChatMe key={item.time} message={item.message} />;
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
              <div ref={messagesEndRef} className="mt-20 mb-10 block">d</div>
            </ul>
          </div>
          <div className="absolute bottom-0 w-full bg-d5">
            <form
              onSubmit={(e) => sendMessage(e)}
              className="flex items-center justify-between w-full p-3"
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
        </div>
      ) : (
        <div className="flex-grow relative">
          <div
            className="flex w-full justify-center items-center text-center text-gray-400"
            style={{ height: "82vh" }}
          >
            <p>
              Mulai chat dengan memilih teman disamping atau cari terlebih
              dahulu
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
