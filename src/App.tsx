import React from 'react';
import Navigator from './routes/homeStack';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
  <Navigator />
  <Toast />
    </>)
  ;
};

export default App;
