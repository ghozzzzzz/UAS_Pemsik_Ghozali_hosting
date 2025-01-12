import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { RouterProvider } from 'react-router-dom';
import RouteList from './routes';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={RouteList} />
    </Provider>
  );
}

export default App;
