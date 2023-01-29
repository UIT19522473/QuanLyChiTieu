import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTabChiPhi from '../../components/HomeTabChiPhi/HomeTabChiPhi';
import HomeTabThuNhap from '../../components/HomeTabThuNhap/HomeTabThuNhap';

const TabTop = createMaterialTopTabNavigator();

const TabHome = props => {
  return (
    <TabTop.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: '#92b9e3'},
      }}>
      <TabTop.Screen
        initialParams={{moveScreen: props.handleNavigateEdit}}
        name="TabChiPhi"
        component={HomeTabChiPhi}
        options={{tabBarLabel: 'Chi Phí'}}
        listeners={{tabPress: e => console.log('Tab Chi Phi', e.target)}}
      />
      <TabTop.Screen
        initialParams={{moveScreen: props.handleNavigateEdit}}
        name="TabThuNhap"
        component={HomeTabThuNhap}
        options={{tabBarLabel: 'Thu Nhập'}}
        listeners={{tabPress: e => console.log('Tab Thu Nhap', e.target)}}
      />
    </TabTop.Navigator>
  );
};
export default TabHome;
