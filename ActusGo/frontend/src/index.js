import React from "react";
import { createRoot } from "react-dom/client";
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
import { SocketProvider } from "./socket";

const store = createStore(rootReducer, composeWithDevTools());

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
<<<<<<< HEAD
        <Router>
            <SharedDataProvider>
                <UserProvider>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </UserProvider>
            </SharedDataProvider>
        </Router>
  </Provider>,
  document.getElementById("root")
=======
    <Router>
      <SharedDataProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SharedDataProvider>
    </Router>
  </Provider>
>>>>>>> 9b2ce3a2d46ccced7100afc2aa2695bf325f19fd
);
