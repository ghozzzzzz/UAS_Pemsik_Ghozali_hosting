import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './pages/Redux/stores';
import { RouterProvider } from 'react-router-dom';
import RouteList from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  </React.StrictMode>
);
