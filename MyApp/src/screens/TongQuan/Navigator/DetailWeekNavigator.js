import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native';

import Income from '../DetailView/WeekDetail/Income';
import Expense from '../DetailView/WeekDetail/Expense';
import { TabBar } from 'react-native-tab-view';

const Tab = createMaterialTopTabNavigator();

const DetailWeekNavigator = ({navigation}) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Expense' component={Expense} options={{tabBarLabel: 'Chi'}}/>
        <Tab.Screen name='Income' component={Income} options={{tabBarLabel: 'Thu'}} />
      </Tab.Navigator>
  )
}

export default DetailWeekNavigator;

const styles = StyleSheet.create({});