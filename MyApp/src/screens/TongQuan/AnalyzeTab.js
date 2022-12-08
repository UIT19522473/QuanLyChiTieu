import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NavigationContainer } from '@react-navigation/native';
import Week from './Week';
import Month from './Month';
import Quarter from './Quarter';
import Year from './Year';

const Tab = createMaterialTopTabNavigator();
const AnalyzeTab2 = () => {
  return (

        <Tab.Navigator>
            <Tab.Screen name='Week' component={Week}  />
            <Tab.Screen name='Month' component={Month}  />
            <Tab.Screen name='Quarter' component={Quarter}  />
            <Tab.Screen name='Year' component={Year}  />
        </Tab.Navigator>
    

  );
}

export default AnalyzeTab2;