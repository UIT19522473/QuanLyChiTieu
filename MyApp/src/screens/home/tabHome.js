import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeTabChiPhi from '../../components/HomeTabChiPhi/HomeTabChiPhi';
import HomeTabThuNhap from '../../components/HomeTabThuNhap/HomeTabThuNhap';

const TabTop = createMaterialTopTabNavigator();

const TabHome = ({navigate}) => {
  return (
    <TabTop.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarStyle: {backgroundColor: '#92b9e3'},
      }}>
      <TabTop.Screen
        name="TabChiPhi"
        component={HomeTabChiPhi}
        options={{tabBarLabel: 'Chi Phí'}}
        listeners={{tabPress: e => console.log('Tab Chi Phi', e.target)}}
      />
      <TabTop.Screen
        name="TabThuNhap"
        component={HomeTabThuNhap}
        options={{tabBarLabel: 'Thu Nhập'}}
        listeners={{tabPress: e => console.log('Tab Thu Nhap', e.target)}}
      />
    </TabTop.Navigator>
  );
};
export default TabHome;
// const Demo = () => {
//   return (
//     <View style={{backgroundColor: 'black', flex: 1}}>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <Text>Hello</Text>
//       <MyTabs />
//     </View>
//   );
// };
