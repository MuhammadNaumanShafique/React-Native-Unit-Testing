import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppContainer from './naviagtion/appNavigation';
import store, {persistor} from './store/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
