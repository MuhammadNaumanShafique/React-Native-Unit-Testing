import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/Login';
import HomeScreen from '../screens/home/Home';
import SignUpScreen from '../screens/signup/Signup';

const Stack = createNativeStackNavigator();
export class AuthStack extends React.Component {
  render() {
    return (
      <Stack.Navigator
        initialRouteName={'loginScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="loginScreen" component={LoginScreen} />
        <Stack.Screen name="signupScreen" component={SignUpScreen} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  }
}
