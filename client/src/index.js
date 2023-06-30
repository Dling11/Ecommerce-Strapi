import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./app.scss";
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate              //The reason we need PersistGate, is that so that it will store the state, even you UI refreshes
        loading={"loading"} 
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
