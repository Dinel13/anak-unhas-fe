import type { AppProps } from "next/app";

import { Provider } from "react-redux";

import store from "../store";
import Layout from "../components/layout";
import "../styles/tailwind.css";
import Alert from "../components/layout/Alert";
import ErrorBoundary from "../components/layout/ErrorBoundaries";
import { AppWrapper } from "../context/state";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppWrapper>
          <Alert />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      </ErrorBoundary>
    </Provider>
  );
}

export default MyApp;
