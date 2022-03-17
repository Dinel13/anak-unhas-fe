import  { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/authSlice";

export default function UseSocket({setChat, setNotif}) {
  const userId = useSelector(selectUserId);
  console.log("UseSocket", userId);
  const socketRef = useRef();

  const connectSocket = useCallback((userId, setChat, setNotif) => {
    console.log("connectSocket", userId);
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_SERVER_WS}/ws/notif/${userId}`
    );
    socket.onopen = () => {
      console.log("connected notif server");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("data", data.notif);
      setNotif(data.notif);
      if (data.component === "chat") {
        console.log("chat", data);
        setChat(data);
      } else if (data.component === "notif") {
        console.log("notif", data);
        setNotif(data);
      } else {
        console.log("not know data", data);
      }
    };

    return socket;
  }, []);

  useEffect(() => {
    if (userId && !socketRef.current) {
      console.log(userId && !socketRef.current);
      socketRef.current = connectSocket(userId, setChat, setNotif);
    }
    return () => {
      socketRef.current.close();
    };
  }, [socketRef, userId, connectSocket, setChat, setNotif]);

  const sendMessage = useCallback(
    (data) => {
      socketRef.current.send(JSON.stringify(data));
    },
    [socketRef]
  );

  return [sendMessage];
}
