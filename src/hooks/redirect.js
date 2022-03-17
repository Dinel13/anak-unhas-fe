import { useHistory } from "react-router";

export default function useRedirect() {
  const history = useHistory();
  function redirect(from) {
      history.push({
        pathname: "/masuk",
        state: {
          from,
        },
      });
  }

  return redirect
}
