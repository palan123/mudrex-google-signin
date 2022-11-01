import React, {Component} from "react";
import { View, Text } from "react-native";
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: 'https://909148264453-ps3k4im0suf1viff48sdf8q1shusgrmk.apps.googleusercontent.com',
  offlineAccess: true
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userGoogleInfo: {},
      loaded: false
    };
  }

  signIn = async()=> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userGoogleInfo: userInfo,
        loaded: true
      });
    }catch(error) {
      console.log(error);
    }
  }

  render() {
    return(
      <View>
        <GoogleSigninButton
          onPress={this.signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={{width: 100, height: 100}}
        />
        { this.state.loaded ?

          <View>
            <Text>{this.state.userGoogleInfo.name}</Text>
            <Text>{this.state.userGoogleInfo.email}</Text>
          </View>
          :
          <Text>User is not signin</Text>
        }
      </View>
    )
  }
}

export default App;