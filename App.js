import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { View,Text } from 'react-native';
import FirstRouter from './src/components/firstRouter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShowApp: false,
    };
  }
  componentDidMount = async () => {
    SplashScreen.hide();
    // Ignore log notification by message:
    // LogBox.ignoreLogs(['Warning: ...']);

    // Ignore all log notifications:
    // LogBox.ignoreAllLogs();
    ////new add
    ///locally add
  }

  render() { 
    return ( 
      <FirstRouter/>
     );
  }
}
export default App;
