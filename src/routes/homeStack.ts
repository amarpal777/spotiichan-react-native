import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import DownloadPage from '../screens/DownloadPage';
import SearchPage from '../screens/SearchPage';

const screens = {
  Search: {
    screen: SearchPage,
  },
  DownloadPage: {
    screen: DownloadPage,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
    cardStyle: {
      backgroundColor: '#212121',
    },
  },
});

export default createAppContainer(HomeStack);
