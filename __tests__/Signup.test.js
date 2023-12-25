import {render, fireEvent, waitFor} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUpScreen from '../src/screens/signup/Signup';
import {addUser} from '../src/store/slices/authSlice';
import axios from 'axios';

jest.mock('axios');

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

describe('SignupScreen component', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    auth: {users: [{email: 'nauman@gmail.com', password: 'password123'}]},
  });

  it('SignupScreen renders correctly', async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SignUpScreen />,
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders email and password inputs', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <SignUpScreen />,
      </Provider>,
    );
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('updates email and password state on input change', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <SignUpScreen />,
      </Provider>,
    );
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('executes loginUser function on button press with existing credentials', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <SignUpScreen />,
      </Provider>,
    );
    const signupButton = getByText('Signup');
    const consoleSpy = jest.spyOn(console, 'log');

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'nauman@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('nauman@gmail.com');
    expect(passwordInput.props.value).toBe('password123');

    fireEvent.press(signupButton);

    expect(consoleSpy).toHaveBeenCalledWith('User already exists try sign in');

    consoleSpy.mockRestore();
  });

  it('executes signup function on button press with new credentials', async () => {
    const mockedEmail = 'test@example.com';
    const mockedPassword = 'password';

    axios.post.mockResolvedValue({
      data: {email: 'test@example.com', password: 'password'},
    });

    // axios.post.mockRejectedValue(new Error('Request failed'));

    const {getByTestId} = render(
      <Provider store={store}>
        <SignUpScreen />
      </Provider>,
    );

    const emailInput = getByTestId('emailInputField');
    const passwordInput = getByTestId('passwordInputField');
    const signupButton = getByTestId('signupButton');

    fireEvent.changeText(emailInput, mockedEmail);
    fireEvent.changeText(passwordInput, mockedPassword);
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        {email: mockedEmail.toLowerCase(), password: mockedPassword},
      );
    });

    const actions = store.getActions();
    const expectedAction = addUser({
      email: mockedEmail,
      password: mockedPassword,
    });

    expect(actions).toContainEqual(expectedAction);
    expect(actions.length).toBe(1); // Ensure only one action is dispatched
    expect(mockNavigate).toHaveBeenCalledWith('loginScreen');
  });
});
