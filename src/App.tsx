import React from 'react';
import MainContainer from './components/MainContainer/MainContainer';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';


function App() {

  const store = setupStore();

  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>

  );
}

export default App;
