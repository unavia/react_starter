import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '@components/App';

// Import base styling (resets)
import './index.scss';

// Render the React app in the HTML DOM
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('@components/App', () => render(App));
}

/* eslint react/jsx-filename-extension: 'off' */
