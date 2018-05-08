import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, } from 'react-navigation';


import HomeScreen from "./HomeScreen";
import DataScreen from "./DataScreen";



const Projektinis = StackNavigator({
  Home: {
    screen: DataScreen,
        },
  Data: {
    screen: HomeScreen,
            },
  });


export default class App extends React.Component {
  render() {
    return (
      <Projektinis/>
    )
  }
}