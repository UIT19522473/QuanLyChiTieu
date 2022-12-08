import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTabChiPhi from '../HomeTabChiPhi/HomeTabChiPhi';
import HomeTabThuNhap from '../HomeTabThuNhap/HomeTabThuNhap';
const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="HomeTabChiPhi" component={HomeTabChiPhi} />
      <Tab.Screen name="HomeTabThuNhap" component={HomeTabThuNhap} /> */}
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen
          name="HomeTabChiPhi"
          component={HomeTabChiPhi}
          options={{tabBarLabel: 'Chi Phi'}}
        />
        <Tab.Screen
          name="HomeTabThuNhap"
          component={HomeTabThuNhap}
          options={{tabBarLabel: 'Thu Nhap'}}
        />
      </Tab.Navigator>
    </Tab.Navigator>
  );
};

export default HomeTabs;
