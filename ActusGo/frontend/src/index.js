import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import "./styles/dark.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { SharedDataProvider } from "./SharedDataProvider";
import { UserProvider } from "./customHooks/UserHook";

const store = createStore(rootReducer, composeWithDevTools());


ReactDOM.render(
  <Provider store={store}>
        <Router>
            <SharedDataProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </SharedDataProvider>
        </Router>
  </Provider>,
  document.getElementById("root")
);
