import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);

  const signUpUser = () => {
    if (email.length > 0 && password.length > 0) {
      let user = users.find(user => user.email === email.toLowerCase());
      if (!user) {
        axios
          .post('https://jsonplaceholder.typicode.com/posts', {
            email: email.toLowerCase(),
            password: password,
          })
          .then(function (response) {
            dispatch(
              addUser({
                email: response.data.email,
                password: response.data.password,
              }),
            );
            navigation.navigate('loginScreen');
          })
          .catch(function (error) {});
      } else {
        console.log('User already exists try sign in');
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.signInLabel}>Sign up</Text>
        <TextInput
          testID="emailInputField"
          style={styles.inputFieldStyle}
          placeholder="Enter your email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          testID="passwordInputField"
          style={styles.inputFieldStyle}
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        {/* <TouchableOpacity onPress={signUpUser}>
          <Text>Signup</Text>
        </TouchableOpacity> */}
        <Button
          testID="signupButton"
          title="Signup"
          color={'blue'}
          onPress={signUpUser}
        />
        <View style={styles.signUpView}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
            <Text style={styles.signInButton}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  signInLabel: {fontSize: 30, textAlign: 'center', marginBottom: '20%'},
  inputFieldStyle: {
    padding: 20,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 2,
    width: '100%',
  },
  signUpView: {marginTop: 20, flexDirection: 'row'},
  signInButton: {color: 'blue'},
});
