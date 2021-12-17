import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";

import AppRouter from "./routers/AppRouter";
import store from "./state/store";

import "./styles/index.css";
import "./styles/detailsScreen.css";
import "./styles/card.css";
import "./styles/modal.css";
import "./styles/typography.css";

const VideogamesApp = () => {
  return (
    <Provider store={store}>
      <ToastContainer theme="dark" autoClose={3500} hideProgressBar={true} />
      <AppRouter />
    </Provider>
  );
};

export default VideogamesApp;
