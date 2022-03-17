import React, { lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import { login, selectToken } from "./store/authSlice";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import Loading from "./components/loading/LoadingFull";
import NotifModal from "./components/modal/notifModal";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Register"));
const MyAccount = lazy(() => import("./pages/account/MyAccount"));
const UpdateAccount = lazy(() => import("./pages/account/Update"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  React.useEffect(() => {
    if (localStorage.getItem("jdsaudsau@23")) {
      const data = JSON.parse(localStorage.getItem("jdsaudsau@23"));
      const [token, id, name] = data.split("9gTe1Sku");
      dispatch(login({ token, id, name}));
    }
  }, [dispatch]);

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
      <Header />
      <NotifModal />
      <main style={{ minHeight: "85vh" }}>
        <Suspense fallback={<Loading />}>{routes}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
