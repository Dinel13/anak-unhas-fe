import { Fragment, ReactChild, useCallback, useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectId } from "../../store/authSlice";
import { useAppContext } from "../../context/state";

function Layout({ children }: { children: ReactChild }) {
  const [notif, setNotif] = useState<number>(0);
  const [scktStatus, setScktStatus] = useState("");
  const userId = useSelector(selectId);
  const dispatch = useDispatch();
  const { socket, setSocket, CloseSocket } = useAppContext();

  const verifyToken = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/token`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.data || "Server sedang bermasalah");
        }
        if (!data.data) {
          CloseSocket();
          dispatch(logout());
          localStorage.removeItem("_ayt-has");
        }
        return;
      } catch (error) {
        CloseSocket();
        dispatch(logout());
      }
    },
    [dispatch, CloseSocket]
  );

  const connectSocket = useCallback((userId) => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_SERVER_WS}/ws/${userId}`
    );
    socket.onopen = () => {
      console.log("connected websocket");
      setScktStatus("open");
    };

    socket.onclose = () => {
      console.log("connection closed");
      setScktStatus("close");
    };

    socket.onerror = (error) => {
      console.log("there was an error on socket", error);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.action === "notif") {
        setNotif(data);
      }
    };

    return socket;
  }, []);

  useEffect(() => {
    const locData = localStorage.getItem("_ayt-has");
    if (locData && !userId) {
      const [id, token, name] = locData.split("e+das");
      dispatch(login({ token, id, name }));
      verifyToken(token); // logut if token not valid
    }
  }, [dispatch, verifyToken, userId]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (userId && !socket) {
      setSocket(connectSocket(userId));
    } else if (userId && scktStatus === "close") {
      timeout = setTimeout(() => {
        setSocket(connectSocket(userId));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [userId, connectSocket, setSocket, socket, scktStatus]);

  return (
    <Fragment>
      <Header notif={notif} />
      <main style={{ minHeight: "80vh" }} className="bg-slate-800">
        {children}
      </main>
      {/* {socket && userId && <Chat socket={socket} />} */}
      <Footer />
    </Fragment>
  );
}

export default Layout;
