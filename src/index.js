import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from 'react-query'
import allReducers from "./Redux/Reducers/Index";
const queryClient = new QueryClient();

const persistConfig = {
  key: "Todo",
  storage,
  whitelist: ["myTodo", "isLogged", "onlineUser", "verifiedCount", "verifiedCountLan","apiLink"], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
