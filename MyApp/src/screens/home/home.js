import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
// import HomeTabs from '../../components/HomeTabs/HomeTabs';
import TabHome from './tabHome';
import {FloatingAction} from 'react-native-floating-action';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddItemHome from '../AddItemHome/addItemHome';
import AddTransferHome from '../AddTransferHome/AddTransferHome';
const Home = ({navigation}) => {
  const [tab, setTab] = useState('DanhMuc');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(
    date.getDay() +
      '/' +
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear(),
  );

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDay() +
      '/' +
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    setText(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const actions = [
    {
      text: 'Danh mục mới',
      // icon: require('./images/ic_accessibility_white.png'),
      name: 'DanhMuc',
      position: 2,
    },
    {
      text: 'Thêm chi tiêu',
      // icon: require('./images/ic_language_white.png'),
      name: 'ThuChi',
      position: 1,
    },
  ];

  const openBottomSheet = name => {
    setTab(name);
    refRBSheet.current.open();
  };

  const refRBSheet = useRef();
  return (
    <SafeAreaView className="flex-1 pt-3 bg-primary">
      <View className="flex flex-row justify-between pb-3 px-1">
        <Icon size={24} color={'white'} name="menu" />
        <View className="flex justify-center items-center gap-1">
          <Text className="text-lg text-slate-100">Số dư của bạn</Text>
          <Text className="text-xl font-bold text-slate-100">0 đ</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotifyStack', {name: 'demo'})}>
          <Icon size={24} color={'white'} name="notifications" />
        </TouchableOpacity>
      </View>
      <View className="items-center flex flex-row justify-between p-3 bg-primary">
        <Icon color={'white'} name="chevron-left" size={30} />
        <TouchableOpacity
          className="flex flex-row gap-3 items-center"
          onPress={showMode}>
          <Text className="text-base font-bold text-white">{text}</Text>
          <Icon color={'white'} size={18} name="event" />
        </TouchableOpacity>
        <Icon color={'white'} name="chevron-right" size={30} />
      </View>
      {show && (
        <DateTimePicker
          value={date}
          // mode={mode}
          onChange={onChange}
          mode="date"
          // display="default"
          // is24Hour={true}
        />
      )}
      <View className="bg-slate-100 flex-1">
        <View className="flex-1 relative">
          <TabHome />
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Test', {name: 'Jane'})}
            className="absolute bottom-0 right-0 m-4 bg-primary p-4 rounded-full">
            <Icon color={'white'} name="add" size={28} />
          </TouchableOpacity> */}
          <FloatingAction
            actions={actions}
            onPressItem={name => {
              name === 'DanhMuc'
                ? openBottomSheet('DanhMuc')
                : // navigation.navigate('AddItemHomeStack', {name: 'demo'})
                  openBottomSheet('ThuChi');

              // navigation.navigate('AddItemHomeStack', {name: 'demo'});
            }}
          />
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={570}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            {tab === 'DanhMuc' ? <AddItemHome /> : <AddTransferHome />}
          </RBSheet>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
