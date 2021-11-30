import AppRouter from "./routers/AppRouter";

import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./state/store";

const VideogamesApp = () => {
  return (
    <Provider store={store}>
      <ToastContainer theme="dark" autoClose={3500} hideProgressBar={true} />
      <AppRouter />
    </Provider>
  );
};

export default VideogamesApp;
