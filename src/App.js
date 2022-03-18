import React, { lazy, Suspense, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { login, logout, selectToken, selectUserId } from "./store/authSlice";
import Footer from "./components/layout/Footer";
import Layout from "./components/layout";
import Loading from "./components/loading/LoadingFull";
import NotifModal from "./components/modal/notifModal";
import Chat from "./components/Chat";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Register"));
const MyAccount = lazy(() => import("./pages/account/MyAccount"));
const UpdateAccount = lazy(() => import("./pages/account/Update"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);

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
      `${process.env.REACT_APP_SERVER_WS}/ws/notif/${userId}`
    );
    socket.onopen = () => {
      console.log("connected notif server");
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("data", data);
      if (data.component === "chat") {
        console.log("chat", data);
      } else {
        console.log("not know data", data);
      }
    };

    return socket;
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jdsaudsau@23")) {
      const data = JSON.parse(localStorage.getItem("jdsaudsau@23"));
      const [token, id, name] = data.split("9gTe1Sku");
      dispatch(login({ token, id, name}));
      verifyToken(token); // logut if token not valid
    }
    let socket;
    if (userId) {
      socket = connectSocket(userId);
    }
    return () => {
      socket && socket.close();
    };
  }, [dispatch, verifyToken, userId, connectSocket]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/masuk" element={<Navigate to="/" />} />
        <Route path="/daftar" element={<Navigate to="/" />} />
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
        <Route path="/akunku" element={<Navigate to="/masuk" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <div className="font-pop dark-main">
      <Layout />
      <NotifModal />
      <main style={{ minHeight: "85vh" }}>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </main>
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
