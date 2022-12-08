import { View, Text, StyleSheet, Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/home';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LichSu from './screens/LichSu/LichSu';
import HanMuc from './screens/HanMuc/HanMuc';
import ThemHanMuc from './screens/HanMuc/ThemHanMuc';
import Test from './screens/Test/Test';

import firestore from '@react-native-firebase/firestore';
import TongQuan from './screens/TongQuan/TongQuan';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeStack" component={Home} />
      <HomeStack.Screen name="Test" component={Test} />
    </HomeStack.Navigator>
  );
}





const ThemHanMucStack= createNativeStackNavigator();
function ThemHanMucStackScreen() {
  return (
    <ThemHanMucStack.Navigator>
      <ThemHanMucStack.Screen name="ThemHanMuc" component={ThemHanMuc} options={
        {
          
          headerTitle: 'Them Han Muc',
          headerBackTitle: 'Back',
          headerTitleStyle: {
            color: 'black',
            fontSize: 20
          },
          headerLeft: () => (
            <Button title='Back'/>
            )
          }
        } />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </ThemHanMucStack.Navigator>
  );
}

const HanMucStack = createNativeStackNavigator();

function HanMuctackScreen() {
  const navigation = useNavigation()
  return (
    <HanMucStack.Navigator>
      <HanMucStack.Screen name="HomeStack" component={HanMuc} options={
        {

          headerTitle: 'Han Muc',
          headerBackTitle: 'Back',
          headerTitleStyle: {
            color: 'black',
            fontSize: 20
          },
          headerRight: () => (
            <Button title='Add' onPress={() => {
              navigation.dispatch(CommonActions.navigate('ThemHanMuc'));
            }} />
          )
        }
      } />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </HanMucStack.Navigator>
  );
}

const LichSuStack = createNativeStackNavigator();

function LichSuStackScreen() {
  return (
    <LichSuStack.Navigator>
      <LichSuStack.Screen name="LichSuStack" component={LichSu} />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </LichSuStack.Navigator>
  );
}

const TongQuanStack = createNativeStackNavigator();

function TongQuanStackScreen() {
  return (
    <TongQuanStack.Navigator>
      <TongQuanStack.Screen name="LichSuStack" component={TongQuan} />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </TongQuanStack.Navigator>
  );
}

// const SettingsStack = createNativeStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="SettingScreen" component={Setting} />
//       <SettingsStack.Screen name="DetailScreen" component={Detail} />
//     </SettingsStack.Navigator>
//   );
// }

// const TestsStack = createNativeStackNavigator();
// function TestStacksScreen() {
//   return (
//     <TestsStack.Navigator>
//       <TestsStack.Screen name="TestScreen" component={TestScreen} />
//     </TestsStack.Navigator>
//   );
// }

const Tab = createBottomTabNavigator();

function App() {
  // firestore()
  //   .collection('test')
  //   .get()
  //   .then(querySnapshot => {
  //     console.log('Total users: ', querySnapshot.size);

  //     querySnapshot.forEach(documentSnapshot => {
  //       console.log(
  //         'User ID: ',
  //         documentSnapshot.id,
  //         documentSnapshot.data().age,
  //       );
  //     });
  //   });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="TrangChu" component={HomeStackScreen} />
          <Tab.Screen name="TongQuan" component={TongQuanStackScreen} />
          <Tab.Screen name="LichSu" component={LichSuStackScreen} />
          <Tab.Screen name="HanMuc" component={HanMuctackScreen} />
          <Tab.Screen name="ThemHanMuc" component={ThemHanMucStackScreen} />
          {/* <Tab.Screen name="Settings" component={SettingsStackScreen} />
          <Tab.Screen name="Test" component={TestStacksScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
