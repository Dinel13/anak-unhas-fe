import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import store from "../store";
import Layout from "../components/layout";
import "../styles/tailwind.css";
import Alert from "../components/layout/Alert";

function MyApp({ Component, pageProps }: AppProps) {
 return <Provider store={store}>
      <Alert />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>;
}

export default MyApp;
