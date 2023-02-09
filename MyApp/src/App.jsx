import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import * as React from 'react';
import {
  NavigationContainer,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home/home';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import LichSu from './screens/LichSu/LichSu';
import HanMuc from './screens/HanMuc/HanMuc';
import ThemHanMuc from './screens/HanMuc/ThemHanMuc';
import Test from './screens/Test/Test';
import SignIn from './screens/sign_in/sign_in';

import firestore from '@react-native-firebase/firestore';
import TongQuan from './screens/TongQuan/TongQuan';

import {TailwindProvider} from 'tailwindcss-react-native';
import HomeTabs from './components/HomeTabs/HomeTabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Notify from './screens/Notify/Notify';
import ModalColor from './components/ModalColor/ModalColor';
import ModalIcon from './components/ModalIcon/ModalIcon';
import ChooseItem from './screens/ChooseItem/ChooseItem';
import BtsHomeItem from './components/BtsHomeItem/BtsHomeItem';
import HomeItem from './components/HomeItem/HomeItem';

import {useState} from 'react';
import {useEffect} from 'react';
import {useMemo} from 'react';

import {AuthContext} from './components/context';
import SignUp from './screens/sign_up/sign_up';

import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderTimeAll from './screens/home/HeaderTimeAll';

import TienIch from './screens/TienIch/TienIch';
import HanMucChi from './screens/TienIch/HanMucChi/HanMucChi';
import XuatFile from './screens/TienIch/XuatFile/XuatFile';
import Todo from './screens/TienIch/Todo/Todo';
import SearchValue from './screens/TienIch/SearchValue/SearchValue';
import Currency from './screens/TienIch/Currency';
import PickCurrency from './screens/TienIch/PickCurrency';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      {/* <HomeStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      /> */}
      <HomeStack.Screen name="HomeStack" component={Home} />
      {/* <HomeStack.Screen name="AddItemHomeStack" component={AddItemHome} /> */}
      <HomeStack.Screen name="NotifyStack" component={Notify} />
      <HomeStack.Screen name="Test" component={Test} />
      <HomeStack.Screen name="ModalColor" component={ModalColor} />
      <HomeStack.Screen name="ChooseItemStack" component={ChooseItem} />
      <HomeStack.Screen name="BottomSheetEdit" component={BtsHomeItem} />

      <HomeStack.Screen name="HomeItem" component={HomeItem} />
    </HomeStack.Navigator>
  );
}
const TienIchStack = createBottomTabNavigator();

function TienIchStackScreen() {
  return (
    <TienIchStack.Navigator
      screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
      <TienIchStack.Screen name="TienIchHome" component={TienIch} />
      <TienIchStack.Screen name="HanMucChi" component={HanMucChi} />
      <TienIchStack.Screen name="XuatFile" component={XuatFile} />
      <TienIchStack.Screen name="Todo" component={Todo} />
      <TienIchStack.Screen name="SearchValue" component={SearchValue} />
      <TienIchStack.Screen name="HanMuc" component={HanMuc} />
      <TienIchStack.Screen name="Currency" component={Currency} />
      <TienIchStack.Screen name='PickCurrency' component={PickCurrency}/>
    </TienIchStack.Navigator>
  );
}

const ThemHanMucStack = createNativeStackNavigator();
function ThemHanMucStackScreen() {
  return (
    <ThemHanMucStack.Navigator>
      <ThemHanMucStack.Screen
        name="ThemHanMucStack"
        component={ThemHanMuc}
        options={{
          headerTitle: 'Them Han Muc',
          headerBackTitle: 'Back',
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
          },
          headerLeft: () => <Button title="Back" />,
        }}
      />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </ThemHanMucStack.Navigator>
  );
}

const HanMucStack = createNativeStackNavigator();

function HanMuctackScreen() {
  const navigation = useNavigation();
  return (
    <HanMucStack.Navigator screenOptions={{headerShown: false}}>
      <HanMucStack.Screen
        name="HomeStack"
        component={HanMuc}
        options={{
          headerTitle: 'Han Muc',
          headerBackTitle: 'Back',
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
          },
          headerRight: () => (
            <Button
              title="Add"
              onPress={() => {
                navigation.dispatch(CommonActions.navigate('ThemHanMuc'));
              }}
            />
          ),
        }}
      />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </HanMucStack.Navigator>
  );
}

const LichSuStack = createNativeStackNavigator();

function LichSuStackScreen() {
  return (
    <LichSuStack.Navigator screenOptions={{headerShown: false}}>
      <LichSuStack.Screen name="LichSuStack" component={LichSu} />
      {/* <HomeStack.Screen name="DetailScreen" component={Detail} /> */}
    </LichSuStack.Navigator>
  );
}

const TongQuanStack = createNativeStackNavigator();

function TongQuanStackScreen() {
  return (
    <TongQuanStack.Navigator screenOptions={{headerShown: false}}>
      <TongQuanStack.Screen name="Tổng quan" component={TongQuan} />
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

const Stack = createNativeStackNavigator();
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
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => ({
    signInMain: () => {
      setUserToken('sksk');
      setIsLoading(false);
    },
    signOutMain: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUpMain: () => {
      setUserToken('sksk');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <TailwindProvider>
        <AuthContext.Provider value={authContext}>
          {userToken != null ? <HeaderTimeAll /> : <></>}
          <NavigationContainer>
            {userToken != null ? (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    height: 50,
                    paddingBottom: 4,
                  },
                  tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                  },
                }}>
                <Tab.Screen
                  options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({focused}) => (
                      <Icon
                        name="home"
                        size={28}
                        color={focused ? 'blue' : 'gray'}
                      />
                    ),
                  }}
                  name="TrangChu"
                  component={HomeStackScreen}
                />
                <Tab.Screen
                  options={{
                    tabBarLabel: 'Thống kê',
                    tabBarIcon: ({focused}) => (
                      <Icon
                        name="analytics"
                        size={24}
                        color={focused ? 'blue' : 'gray'}
                      />
                    ),
                  }}
                  name="TongQuan"
                  component={TongQuanStackScreen}
                />
                <Tab.Screen
                  options={{
                    tabBarLabel: 'Lịch sử',
                    tabBarIcon: ({focused}) => (
                      <Icon
                        name="history"
                        size={24}
                        color={focused ? 'blue' : 'gray'}
                      />
                    ),
                  }}
                  name="LichSu"
                  component={LichSuStackScreen}
                />
                {/* <Tab.Screen
                  options={{
                    tabBarLabel: 'Hạn mức',
                    tabBarIcon: ({focused}) => (
                      <Icon
                        name="payments"
                        size={24}
                        color={focused ? 'blue' : 'gray'}
                      />
                    ),
                  }}
                  name="HanMuc"
                  component={HanMuctackScreen}
                /> */}

                <Tab.Screen
                  options={{
                    tabBarLabel: 'Tiện ích',
                    tabBarIcon: ({focused}) => (
                      <Icon
                        name="extension"
                        size={24}
                        color={focused ? 'blue' : 'gray'}
                      />
                    ),
                  }}
                  name="TienIch"
                  component={TienIchStackScreen}
                />

                {/* <Tab.Screen /> */}
                {/* <Tab.Screen
                  name="ThemHanMuc"
                  component={ThemHanMucStackScreen}
                /> */}
              </Tab.Navigator>
            ) : (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </Stack.Navigator>
              // <SignIn />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </TailwindProvider>
    </Provider>
  );

  // return (
  //   <Provider store={store}>
  //     <TailwindProvider>
  //       <NavigationContainer>
  //         <Tab.Navigator screenOptions={{headerShown: false}}>
  //           <Tab.Screen name="TrangChu" component={HomeStackScreen} />
  //           <Tab.Screen name="TongQuan" component={TongQuanStackScreen} />
  //           <Tab.Screen name="LichSu" component={LichSuStackScreen} />
  //           <Tab.Screen name="HanMuc" component={HanMuctackScreen} />
  //           <Tab.Screen name="ThemHanMuc" component={ThemHanMucStackScreen} />
  //         </Tab.Navigator>
  //       </NavigationContainer>
  //     </TailwindProvider>
  //   </Provider>
  // );
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
