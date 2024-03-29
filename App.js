import { Provider } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/Home';
import Animated from 'react-native-reanimated';

export default function App() {
    
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Home />
      </Provider>
    </NavigationContainer>
  );
}