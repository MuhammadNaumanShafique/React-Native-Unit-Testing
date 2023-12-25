import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import LoginScreen from '../src/screens/login/Login';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {Alert} from 'react-native';

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
    // Add other navigation functions you might use in your component
    // Example: addListener, reset, etc.
  }),
}));

describe('LoginScreen component', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    // Mock your initial Redux store state here
    // Example: user: { isLoggedIn: false }
    auth: {users: [{email: 'nauman@gmail.com', password: 'password123'}]},
  });

  it('LoginScreen renders correctly', async () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <LoginScreen />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders email and password inputs', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <LoginScreen />
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
        <LoginScreen />
      </Provider>,
    );
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('executes loginUser function on button press with invalid credentials', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const loginButton = getByText('Login');
    const alertSpy = jest.spyOn(Alert, 'alert');

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');

    fireEvent.press(loginButton);

    expect(alertSpy).toHaveBeenCalledWith('User does not exists, signup first');

    alertSpy.mockRestore();
  });

  it('executes loginUser function on button press with wrong password', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const loginButton = getByText('Login');

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'nauman@gmail.com');
    fireEvent.changeText(passwordInput, 'password1234');

    expect(emailInput.props.value).toBe('nauman@gmail.com');
    expect(passwordInput.props.value).toBe('password1234');

    fireEvent.press(loginButton);

    expect(getByText('Invalid password')).toBeTruthy();
  });

  it('executes loginUser function on button press with valid credentials', () => {
    const {getByText, getByPlaceholderText} = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const loginButton = getByText('Login');
    const consoleSpy = jest.spyOn(console, 'log');

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'nauman@gmail.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('nauman@gmail.com');
    expect(passwordInput.props.value).toBe('password123');

    fireEvent.press(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('homeScreen');

    consoleSpy.mockRestore();
  });
});
