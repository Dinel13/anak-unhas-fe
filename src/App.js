import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { login, logout, selectToken, selectUserId } from "./store/authSlice";
import Layout from "./components/layout";
import Loading from "./components/loading/LoadingFull";
import NotifModal from "./components/modal/notifModal";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Register"));
const MyAccount = lazy(() => import("./pages/account/MyAccount"));
const UpdateAccount = lazy(() => import("./pages/account/Update"));
const Pencarian = lazy(() => import("./pages/Pencarian"));
const ChatPage = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const [socket, setSocket] = useState(null);
  const [notif, setNotif] = useState(null);

  const verifyToken = useCallback(
    async (token) => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/user/token`,
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
          throw new Error("Server sedang bermasalah");
        }
        if (!data.user) {
          dispatch(logout());
          localStorage.removeItem("jdsaudsau@23");
        }
        return;
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );


  const connectSocket = useCallback((userId) => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_SERVER_WS}/ws/${userId}`
    );
    socket.onopen = () => {
      console.log("connected notif server");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "Notif") {
        setNotif(data.notif);
      }
    };

    setSocket(socket);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jdsaudsau@23")) {
      const data = JSON.parse(localStorage.getItem("jdsaudsau@23"));
      const [token, id, name] = data.split("9gTe1Sku");
      dispatch(login({ token, id, name}));
      verifyToken(token); // logut if token not valid
    }
    if (userId && !socket) {
      connectSocket(userId)
    }
    return () => {
      socket && socket.close();
    };
  }, [dispatch, verifyToken, userId, connectSocket, socket]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masuk" element={<Navigate to="/" />} />
        <Route path="/daftar" element={<Navigate to="/" />} />
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
        <Route path="/akunku">
          <Route index element={<MyAccount />} />
          <Route path="update" element={<UpdateAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masuk" element={<Login />} />
        <Route path="/daftar" element={<Signup />} />
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/akunku" element={<Navigate to="/masuk" />} />
        <Route path="/chat" element={<Navigate to="/masuk" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div className="font-pop dark-main">
      <Layout notif={notif}/>
      <NotifModal />
      <main style={{ minHeight: "90vh" }}>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </main>
    </div>
  );
}

export default App;
