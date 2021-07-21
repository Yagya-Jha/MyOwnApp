import React from 'react';
import Login from './Screens/Login';
import Form from './Screens/Form';
import Profile from './Screens/Profile';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: Login,
  FormScreen: Form,
  ProfileScreen: Profile
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
    <AppNavigator />
  );
}