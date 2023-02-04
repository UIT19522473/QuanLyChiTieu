import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {COLOR} from '../sign_in/component/Color';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Week from './Week';
import Month from './Month';
import Day from './Day';
import Year from './Year';

import CustomTotal from './Components/CustomTotal';
import HeaderTime from '../home/HeaderTime';
import HeaderTimeAll from '../home/HeaderTimeAll';

import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import AllTime from './AllTime';

const Tab = createMaterialTopTabNavigator();
const AnalyzeTab = () => {
  return (
    <Tab.Navigator initialRouteName="Hoe">
      <Tab.Screen
        name="Week"
        component={Week}
        options={{tabBarLabel: 'Tuần'}}
      />
      <Tab.Screen
        name="Month"
        component={Month}
        options={{tabBarLabel: 'Tháng'}}
      />
      <Tab.Screen
        name="Quarter"
        component={Quarter}
        options={{tabBarLabel: 'Quý'}}
      />
      <Tab.Screen name="Year" component={Year} options={{tabBarLabel: 'Năm'}} />
    </Tab.Navigator>
  );
};

const Item = props => {};

const TongQuan = () => {
  // const data = useSelector(State => State.transferItem.arr);
  // const modeTime = useSelector(State => State.currentTime.modeTime);
  const dataAll = useSelector(State => State.dataAll);

  console.log(dataAll.modeTime);

  //console.log(data.length);
  return (
    // <NavigationContainer independent={true}>
    //   <AnalyzeTab />
    // </NavigationContainer>
    <View className="flex-1">
      {/* <HeaderTime /> */}
      {/* <HeaderTimeAll /> */}
      {/* {data.map(item => (
        <Text>{item.time}</Text>
      ))} */}

      {dataAll.modeTime == 0 ? (
        <Day />
      ) : dataAll.modeTime == 1 ? (
        <Week pickedTime="05/01/2023" />
      ) : dataAll.modeTime == 2 ? (
        <Month />
      ) : dataAll.modeTime == 3 ? (
        <Year/>
      ) : dataAll.modeTime == 4 ? (
        <AllTime/>
      ) : (
        <></>
      )}
      {/* {modeTime == 0 ? <Day /> : <Month />} */}
      {/* <Week pickedTime="05/01/2023" /> */}

      {/* <Week /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.bgColor,
  },
});

export default TongQuan;
