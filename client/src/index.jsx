import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';

import { store } from './store/index.js';
import { router } from './router/index.jsx';
import { loadMe, logInUserWithOauth } from './store/authSlice.js';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  React.useEffect(() => {
    if (window.location.hash === '#_=_') window.location.hash = '';
    
    const cookieJwt = Cookies.get('x-auth-cookie');
    if (cookieJwt) {
      Cookies.remove('x-auth-cookie');
      store.dispatch(logInUserWithOauth(cookieJwt));
    } else {
      store.dispatch(loadMe());
    }
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);