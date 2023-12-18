import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/index.css';
import './styles/theme.css'
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import ThemeProvider from './theme/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId='607803725269-bvddrtb05dhqrc7eblo7gfd41i9rd7kk.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

