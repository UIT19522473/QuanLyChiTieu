import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {COLOR} from '../sign_in/component/Color'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Week from './Week';
import Month from './Month';
import Quarter from './Quarter';
import Year from './Year';

import CustomTotal from './Components/CustomTotal';

const Tab = createMaterialTopTabNavigator();
const AnalyzeTab = () => {
  return (

        <Tab.Navigator
        initialRouteName='Hoe'>
            <Tab.Screen name='Week' component={Week} options={{tabBarLabel: 'Tuần'}}  />
            <Tab.Screen name='Month' component={Month} options={{tabBarLabel: 'Tháng'}}  />
            <Tab.Screen name='Quarter' component={Quarter} options={{tabBarLabel: 'Quý'}}  />
            <Tab.Screen name='Year' component={Year} options={{tabBarLabel: 'Năm'}} />
        </Tab.Navigator>
    

  );
}

const TongQuan = () => {
  return (


      

        <NavigationContainer independent={true}>
          <AnalyzeTab/>
        </NavigationContainer>


  );
};

const styles = StyleSheet.create(
  {
    container : {
      backgroundColor : COLOR.bgColor
    }
  }
);

export default TongQuan;
