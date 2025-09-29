import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import { LoginJDP } from './components/LoginJDP';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Greeting />
      </HashRouter>
    </React.StrictMode>
  </Provider>
);

function Greeting() {
  const queryParams = new URLSearchParams(window.location.search);  // Manejar parámetros de la URL

  const currentUser = localStorage.getItem("currentUser");
  const sessionUser = sessionStorage.getItem("usuarioJDP");

  // Si hay un usuario en localStorage, renderizamos el layout con la app
  if (currentUser) {
    return (
      <Layout>
        <App />
      </Layout>
    );
  }

  // Si hay parámetros en la URL o el usuario está en sessionStorage, mostramos el login
  if (queryParams || sessionUser) {
    return <LoginJDP />;
  }

  // Caso por defecto, renderizamos el login
  return <LoginJDP />;
}

reportWebVitals();
