import { login as loginSlice } from "./authSlice";
import { showNotif } from "./notifSlice";

export const login = (email, password, successLogin, failLogin) => {
  return async (dispatch) => {
    try {
      const response = await await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message || "Tidak bisa masuk");
      }
      dispatch(loginSlice(result.user));
      successLogin();
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
      failLogin();
    }
  };
};

export const signup = (email, name, password, onSuccesSingup, setPending) => {
  return async (dispatch) => {
    try {
      const response = await await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            full_name: name,
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message || "Tidak bisa mendaftar!");
      }
      dispatch(loginSlice(result.user));
      setTimeout(() => onSuccesSingup(), 1000);
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    } finally {
      setPending(false);
    }
  };
};
