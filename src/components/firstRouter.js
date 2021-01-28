import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountHeader from './account/accountHeader';
import PasswordReset from './account/passwordReset';
import HomeDrawer from './homeDrawer';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    > 
      <Stack.Screen name="AccountHeader" component={AccountHeader} /> 
      <Stack.Screen name="ResetScreen" component={PasswordReset} />
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} /> 
    </Stack.Navigator>
  );
}
//first router goes with login and redirect to drawer
export default function FirstRouter() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

