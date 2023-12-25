import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './authStack';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
}

export default AppContainer;
