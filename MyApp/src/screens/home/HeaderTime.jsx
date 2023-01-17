import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Button,
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

import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../../redux/slice/testSlice/testSlice';
import {
  addItem,
  clearItem,
  updateValueItem,
} from '../../redux/slice/itemHomeSlice/itemHomeSlice';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {addTimeCurrentItem} from '../../redux/slice/currentItemSlice/currentItemSlice';
import {
  addTransfer,
  clearTransfer,
} from '../../redux/slice/transferSlice/transferSlice';
import {
  addCurrentTime,
  addModeTime,
} from '../../redux/slice/currentTimeSlice/currentTimeSlice';
import {addBlankInOut} from '../../redux/slice/blankInOutSlice/blankInOutSlice';

import {AuthContext} from '../../components/context';
import {useContext} from 'react';

const HeaderTime = ({navigation}) => {
  // const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const userName = useSelector(State => State.auth.userName);

  // const itemHome = useSelector(state => state.itemHomeArr);

  // console.log('item home', itemHome);

  //mode date ngày, tuần, tháng, năm
  const [pressDate, setPressDate] = useState(0);

  const [tab, setTab] = useState('DanhMuc');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(
    // date.getDay() +
    //   '/' +
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
  );
  dispatch(addTimeCurrentItem(text));
  dispatch(addCurrentTime(text));

  //   const testTime = useSelector(State => State.currentTime.time);

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      // tempDate.getDay() +
      // '/' +
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    dispatch(addTimeCurrentItem(fDate));
    dispatch(addCurrentTime(fDate));
    getDataFB();
    getTransferFB(fDate);
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
  //-----------------------------

  // const test = firestore().collection('Items').get();
  // console.log('data fake', test);

  // const items = useSelector(state => state.itemHomeArr.arrItem);
  // const trans = useSelector(state => state.transferItem.arr);
  //getItemHome
  const getDataFB = () => {
    dispatch(clearItem());
    firestore()
      .collection('Items')
      // Filter results
      // .where('time', '==', time)
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        // console.log('data items: ', querySnapshot._docs.data());

        querySnapshot.forEach(documentSnapshot => {
          // const temp = {
          //   id: documentSnapshot.data().id,
          //   color: documentSnapshot.data().color,
          //   name: documentSnapshot.data().name,
          //   icon: documentSnapshot.data().icon,
          //   time: documentSnapshot.data().time,
          //   value: documentSnapshot.data().value,
          //   type: documentSnapshot.data().type,
          // };
          // listData.push(temp);

          dispatch(
            addItem({
              id: documentSnapshot.data().id,
              color: documentSnapshot.data().color,
              name: documentSnapshot.data().name,
              icon: documentSnapshot.data().icon,
              time: documentSnapshot.data().time,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            }),
          );
        });
      });
  };

  // const timeCheck = useSelector(state => state.currentTime.time);
  // console.log('time check', timeCheck.time);

  const getTransferFB = time => {
    // console.log('transfer', items);

    // transfer theo ngày

    if (pressDate == 0) {
      dispatch(clearTransfer());
      dispatch(addModeTime(0));
      firestore()
        .collection('Transfer')
        // Filter results
        .where('time', '==', time)
        .where('user', '==', userName)
        .get()
        .then(querySnapshot => {
          //console.log('Total transfer: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            dispatch(
              updateValueItem({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );

            dispatch(
              addTransfer({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );
          });
        });
    }

    // theo tuần
    else if (pressDate == 1) {
      // console.log('mode week', pressDate);
      //const time = useSelector(state => state.currentTime.time);
      // const month = time.split('/');

      // // get number week in year
      // const currentDate = new Date(
      //   parseInt(month[2]),
      //   parseInt(month[1]) - 1,
      //   parseInt(month[0]) + 1,
      // );
      const week = getDateStartWeek(time);

      dispatch(clearTransfer());
      dispatch(addModeTime(1));
      firestore()
        .collection('Transfer')
        // Filter results
        .where('week', '==', week)
        .where('user', '==', userName)
        .get()
        .then(querySnapshot => {
          //console.log('Total transfer: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            dispatch(
              updateValueItem({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );

            dispatch(
              addTransfer({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );
          });
        });
    }
    // // theo tháng
    else if (pressDate == 2) {
      // console.log('mode week', pressDate);
      //const time = useSelector(state => state.currentTime.time);
      const month = time.split('/');
      const monthQuery = month[1] + '/' + month[2];

      //console.log('month', month[1] + '/' + month[2]);

      dispatch(clearTransfer());
      dispatch(addModeTime(2));
      firestore()
        .collection('Transfer')
        // Filter results
        .where('month', '==', monthQuery)
        .where('user', '==', userName)
        .get()
        .then(querySnapshot => {
          // console.log('Total transfer: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            dispatch(
              updateValueItem({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );

            dispatch(
              addTransfer({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );
          });
        });
    }

    // // theo năm
    else if (pressDate == 3) {
      // console.log('mode week', pressDate);
      //const time = useSelector(state => state.currentTime.time);
      const month = time.split('/');
      const yearQuery = month[2];

      //console.log('month', month[1] + '/' + month[2]);

      dispatch(clearTransfer());
      dispatch(addModeTime(3));
      firestore()
        .collection('Transfer')
        // Filter results
        .where('year', '==', yearQuery)
        .where('user', '==', userName)
        .get()
        .then(querySnapshot => {
          //console.log('Total transfer: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            dispatch(
              updateValueItem({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );

            dispatch(
              addTransfer({
                id: documentSnapshot.data().id,
                idItem: documentSnapshot.data().idItem,
                time: documentSnapshot.data().time,
                year: documentSnapshot.data().year,
                month: documentSnapshot.data().month,
                week: documentSnapshot.data().week,
                value: documentSnapshot.data().value,
              }),
            );
          });
        });
    }
  };

  //get week

  const getDateStartWeek = timeVal => {
    const month = timeVal.split('/');

    // get number week in year
    const date = new Date(
      parseInt(month[2]),
      parseInt(month[1]) - 1,
      parseInt(month[0]) + 1,
    );

    let timeReturn = 0;
    const day = 60 * 60 * 24 * 1000;

    switch (date.getDay()) {
      //th8
      case 1:
        timeReturn = new Date(date.getTime() - 6 * day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      case 2:
        timeReturn = new Date(date.getTime());
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      //th3
      case 3:
        timeReturn = new Date(date.getTime() - day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      //th4
      case 4:
        timeReturn = new Date(date.getTime() - 2 * day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      //th5
      case 5:
        timeReturn = new Date(date.getTime() - 3 * day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      //th6
      case 6:
        timeReturn = new Date(date.getTime() - 4 * day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      //th7
      case 0:
        timeReturn = new Date(date.getTime() - 5 * day);
        return (
          timeReturn.getDate() -
          1 +
          '/' +
          timeReturn.getMonth() +
          1 +
          '/' +
          timeReturn.getFullYear()
        );
      default:
        return date;
    }

    //return date.getDay();
  };
  //-------------

  // const [blank, setBlank] = useState(0);
  const blank = useSelector(state => state.blankInOut);
  const getAllTransferFB = () => {
    firestore()
      .collection('Transfer')
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        // console.log('Total transfer: ', querySnapshot.size);
        let moneyIn = 0;
        let moneyOut = 0;
        querySnapshot.forEach(documentSnapshot => {
          // console.log('test here', documentSnapshot.data().type);
          documentSnapshot.data().type === 'thu'
            ? (moneyIn += documentSnapshot.data().value)
            : (moneyOut += documentSnapshot.data().value);
        });
        // setBlank(moneyIn - moneyOut);
        dispatch(addBlankInOut({In: moneyIn, Out: moneyOut}));
      });

    // console.log(blank);
  };

  useEffect(() => {
    const getData = async () => {
      await getDataFB();
      await getTransferFB(text);
      await getAllTransferFB();
    };
    getData();
  }, [pressDate]);

  //------------------------------
  // console.log('length', itemHome.length);

  const openBottomSheet = name => {
    setTab(name);
    refRBSheet.current.open();
  };
  const testLogin = () => {
    navigation.navigate('Test');
  };

  const {signOutMain} = useContext(AuthContext);

  const handleSignOut = () => {
    //navigation.navigate('Test');
    signOutMain();
  };
  const handleUpDowDate = type => {
    const val = date;
    const day = 60 * 60 * 24 * 1000;
    const camp =
      type === 'dow'
        ? new Date(val.getTime() - day)
        : new Date(val.getTime() + day);

    const txt =
      camp.getDate() + '/' + (camp.getMonth() + 1) + '/' + camp.getFullYear();
    setDate(camp);
    setText(txt);
    dispatch(addTimeCurrentItem(txt));
    dispatch(addCurrentTime(txt));
    getDataFB(txt);
    getTransferFB(txt, pressDate);
  };

  const BtnDate = ({title, id}) => {
    const bg = pressDate === id ? 'white' : '#6c7ee1';
    const txtColor = pressDate === id ? '#6c7ee1' : 'white';

    const handleChooseModeDate = () => {
      setPressDate(id);
      // getTransferFB(text, id);
    };

    return (
      <TouchableOpacity
        onPress={handleChooseModeDate}
        style={{backgroundColor: bg}}
        className="p-1 px-2 border-[1px] border-slate-100 ">
        <Text style={{color: txtColor}} className="font-bold text-slate-100">
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full">
      <View className="items-center flex flex-row justify-between p-3 bg-primary">
        <TouchableOpacity onPress={() => handleUpDowDate('dow')}>
          <Icon color={'white'} name="chevron-left" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row gap-3 items-center"
          onPress={showMode}>
          {/* <Text className="text-base font-bold text-white"> {text} </Text> */}
          <Text className="text-base font-bold text-white"> {text} </Text>
          <Icon color={'white'} size={18} name="event" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpDowDate('up')}>
          <Icon color={'white'} name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center mb-2 bg-primary pb-4">
        <View className="w-[70%] items-center flex-row justify-center">
          <BtnDate title={'Ngày'} id={0} />
          <BtnDate title={'Tuần'} id={1} />
          <BtnDate title={'Tháng'} id={2} />
          <BtnDate title={'Năm'} id={3} />
        </View>
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
    </View>
  );
};

export default HeaderTime;
