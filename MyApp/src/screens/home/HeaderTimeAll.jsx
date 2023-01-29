import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useSelector, useDispatch} from 'react-redux';

import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {addTimeCurrentItem} from '../../redux/slice/currentItemSlice/currentItemSlice';

import {
  addCurrentTime,
  addModeTime,
} from '../../redux/slice/currentTimeSlice/currentTimeSlice';

import {AuthContext} from '../../components/context';
import {useContext} from 'react';

import {
  getAllItem,
  clearAllItem,
  clearAllValue,
  udValueItem,
} from '../../redux/slice/getItemAllSlice/getItemAllSlice';
import {
  getAllTransfer,
  clearAllTransfer,
} from '../../redux/slice/getTransferAllSlice/getTransferAllSlice';

import {
  addAllDataItem,
  addAllDataTransfer,
  removeValueItemById,
  addDataItem,
  addDataTransfer,
  addTimeInfo,
  addModeTimeData,
  clearDataItem,
  clearDataTransfer,
  updateValueItem,
  removeValueAllItem,
} from '../../redux/slice/dataAllSlice/dataAllSlice';

//function
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

//-------------------
// component

const HeaderTimeAll = ({navigation}) => {
  // const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const userName = useSelector(State => State.auth.userName);

  // console.log('UserName', userName);
  //mode date ngày, tuần, tháng, năm
  const [pressDate, setPressDate] = useState(0);

  const [tab, setTab] = useState('DanhMuc');
  // const [change, setChange] = useState(0);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState(
    // '',
    'Empty',
  );

  const arrData = useSelector(State => State.dataAll);

  useEffect(() => {
    getDataByModeTime(text, pressDate);
  }, []);

  if (text === 'Empty') {
    // console.log('Empty.....');
    const date2 = new Date();
    const value =
      date2.getDate() +
      '/' +
      (date2.getMonth() + 1) +
      '/' +
      date2.getFullYear();

    // getDataByModeTime(value, pressDate, arrData);
    dispatch(addTimeCurrentItem(value));
    dispatch(addCurrentTime(value));

    const week = getDateStartWeek(value);
    const month = date.getMonth() + 1 + '/' + date.getFullYear();
    const year = date.getFullYear();
    dispatch(addTimeInfo({time: value, week: week, month: month, year: year}));
  } else {
    // console.log('Full.....');

    const value =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    // getDataByModeTime(value, pressDate, arrData);
    dispatch(addTimeCurrentItem(value));
    dispatch(addCurrentTime(value));

    const week = getDateStartWeek(value);
    const month = date.getMonth() + 1 + '/' + date.getFullYear();
    const year = date.getFullYear();
    dispatch(addTimeInfo({time: value, week: week, month: month, year: year}));
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(false);
    setDate(currentDate);
    // setChange(Math.random());

    console.log('onchange');

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

    const week = getDateStartWeek(fDate);
    const month = date.getMonth() + 1 + '/' + date.getFullYear();
    const year = date.getFullYear();
    dispatch(addTimeInfo({time: fDate, week: week, month: month, year: year}));
    // getDataFB();
    // getTransferFB(fDate);
    //updateDataItems();
    //dispatch(udValueItem({}))
    setText(fDate);
    // getItemByDate(fDate,pre);
    getDataByModeTime(fDate, pressDate);
    //console.log('date', fDate);
  };

  const handleDowDate = () => {
    const val = date;
    const day = 60 * 60 * 24 * 1000;
    // const camp =
    //   type === 'dow'
    //     ? new Date(val.getTime() - day)
    //     : new Date(val.getTime() + day);

    const camp = new Date(val.getTime() - day);

    const txt =
      camp.getDate() + '/' + (camp.getMonth() + 1) + '/' + camp.getFullYear();
    setDate(camp);
    setText(txt);
    dispatch(addTimeCurrentItem(txt));
    dispatch(addCurrentTime(txt));

    const week = getDateStartWeek(txt);
    const month = date.getMonth() + 1 + '/' + date.getFullYear();
    const year = date.getFullYear();
    dispatch(addTimeInfo({time: txt, week: week, month: month, year: year}));
    // dispatch(addTimeCurrentItem('22/2/2022'));
    // dispatch(addCurrentTime('22/2/2022'));
    // getDataFB(txt);
    // getTransferFB(txt, pressDate);
    //updateDataItems();
    // getItemByDate(txt);

    getDataByModeTime(txt, pressDate);
  };

  const handleUpDate = () => {
    const val = date;
    const day = 60 * 60 * 24 * 1000;
    const camp = new Date(val.getTime() + day);

    const txt =
      camp.getDate() + '/' + (camp.getMonth() + 1) + '/' + camp.getFullYear();
    setDate(camp);
    setText(txt);
    dispatch(addTimeCurrentItem(txt));
    dispatch(addCurrentTime(txt));

    const week = getDateStartWeek(txt);
    const month = date.getMonth() + 1 + '/' + date.getFullYear();
    const year = date.getFullYear();
    dispatch(addTimeInfo({time: txt, week: week, month: month, year: year}));
    // dispatch(addTimeCurrentItem('22/2/2022'));
    // dispatch(addCurrentTime('22/2/2022'));
    // getDataFB(txt);
    // getTransferFB(txt, pressDate);
    //updateDataItems();
    // getItemByDate(txt);

    getDataByModeTime(txt, pressDate);
  };

  //get data

  //get data by date
  const getItemByDate = time => {
    dispatch(removeValueAllItem());
    arrData.arrTrans.forEach(trans => {
      if (trans.time === time) {
        dispatch(
          updateValueItem({
            idItem: trans.idItem,
            value: trans.value,
          }),
        );
      }
    });
  };
  //get data by week
  const getItemByWeek = time => {
    dispatch(removeValueAllItem());
    const week = getDateStartWeek(time);
    arrData.arrTrans.forEach(trans => {
      if (trans.week === week) {
        dispatch(
          updateValueItem({
            idItem: trans.idItem,
            value: trans.value,
          }),
        );
      }
    });
  };
  // get data by month
  const getItemByMonth = time => {
    dispatch(removeValueAllItem());
    const timeSplit = time.split('/');
    const month = timeSplit[1] + '/' + timeSplit[2];
    arrData.arrTrans.forEach(trans => {
      if (trans.month === month) {
        dispatch(
          updateValueItem({
            idItem: trans.idItem,
            value: trans.value,
          }),
        );
      }
    });
  };
  // get data by year
  const getItemByYear = time => {
    dispatch(removeValueAllItem());
    const timeSplit = time.split('/');
    const year = timeSplit[2];
    arrData.arrTrans.forEach(trans => {
      if (trans.year === year) {
        dispatch(
          updateValueItem({
            idItem: trans.idItem,
            value: trans.value,
          }),
        );
      }
    });
  };

  //get data all year
  const getItemAll = () => {
    dispatch(removeValueAllItem());
    // const timeSplit = time.split('/');
    // const year = timeSplit[2];
    arrData.arrTrans.forEach(trans => {
      // if (trans.year === year) {
      dispatch(
        updateValueItem({
          idItem: trans.idItem,
          value: trans.value,
        }),
      );
    });
  };

  //switch get data by modeTime
  const getDataByModeTime = (time, modeTime) => {
    // console.log('time...', time);
    const date2 = new Date();
    const timeFake =
      date2.getDate() +
      '/' +
      (date2.getMonth() + 1) +
      '/' +
      date2.getFullYear();

    if (time === 'Empty') {
      time = timeFake;
    }

    if (modeTime == 0) {
      getItemByDate(time);
    } else if (modeTime == 1) {
      getItemByWeek(time);
    } else if (modeTime == 2) {
      getItemByMonth(time);
    } else if (modeTime == 3) {
      getItemByYear(time);
    } else if (modeTime == 4) {
      getItemAll();
    }
  };

  //get week

  //-------------

  //get AllItems
  const getDataItems = () => {
    dispatch(clearDataItem());
    firestore()
      .collection('Items')
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        // dispatch(addAllDataItem(querySnapshot));
        // console.log('size', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          dispatch(
            addDataItem({
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
        // dispatch(addAllDataItem(arrItem));
      });
  };
  //get All Transfer
  const getDataTransfers = () => {
    dispatch(clearDataTransfer());
    firestore()
      .collection('Transfer')
      .where('user', '==', userName)
      .get()
      .then(querySnapshot => {
        // console.log('Total transfer: ', querySnapshot.size);
        let moneyIn = 0;
        let moneyOut = 0;
        // dispatch(addAllDataTransfer(querySnapshot));
        querySnapshot.forEach(documentSnapshot => {
          // console.log('test here', documentSnapshot.data().type);
          // documentSnapshot.data().type === 'thu'
          //   ? (moneyIn += documentSnapshot.data().value)
          //   : (moneyOut += documentSnapshot.data().value);

          dispatch(
            addDataTransfer({
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              month: documentSnapshot.data().month,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              type: documentSnapshot.data().type,
              user: documentSnapshot.data().user,
              value: documentSnapshot.data().value,
              week: documentSnapshot.data().week,
              year: documentSnapshot.data().year,
            }),
          );
        });
        // setBlank(moneyIn - moneyOut);
        // dispatch(addBlankInOut({In: moneyIn, Out: moneyOut}));
        // dispatch(addAllDataTransfer(arrTrans));
      });
  };

  // useEffect(() => {
  //   const getAllData = async () => {
  //     await getDataItems();
  //     await getDataTransfers();
  //   };
  //   getAllData();
  // }, []);

  // const dataItems = useSelector(State => State.getItemAll.arrItem);
  // const dataTransfers = useSelector(State => State.getTransferAll.arrTransfer);

  // console.log('dataItems', dataItems.length);

  // console.log('dataTransfer', dataTransfers.length);
  //------------------------------
  // console.log('length', itemHome.length);

  // useEffect(() => {
  //   // getItemByDate(text);
  //   getDataByModeTime(text, pressDate);
  // }, []);

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

  const BtnDate = ({title, id}) => {
    const bg = pressDate === id ? 'white' : '#6c7ee1';
    const txtColor = pressDate === id ? '#6c7ee1' : 'white';

    const handleChooseModeDate = () => {
      setPressDate(id);
      getDataByModeTime(text, id);
      // getTransferFB(text, id);
      dispatch(addModeTime(id));
      dispatch(addModeTimeData(id));
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
  // let InMoney = 0;
  // let OutMoney = 0;
  // const AllData = useSelector(State => State.dataAll);
  // AllData.arrTrans.map(item => {
  //   if (item.type == 'chi') {
  //     OutMoney += item.value;
  //   } else {
  //     InMoney += item.value;
  //   }
  // });

  return (
    <View className="w-full">
      <View className="flex flex-row justify-between py-2 px-1 bg-primary">
        <Icon size={24} color={'white'} name="menu" />
        <View className="flex justify-center items-center gap-1">
          <Text className="text-lg text-slate-100">Xin chào: {userName}</Text>
          {/* <Text className="text-lg text-slate-100"> Số dư của bạn </Text>

          <Text className="text-xl font-bold text-slate-100">

            {InMoney - OutMoney}
          </Text> */}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotifyStack', {name: 'demo'})}>
          <Icon size={24} color={'white'} name="notifications" />
        </TouchableOpacity>
      </View>

      <View className="items-center flex flex-row justify-between p-3 bg-primary">
        <TouchableOpacity onPress={() => handleDowDate()}>
          <Icon color={'white'} name="chevron-left" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row gap-3 items-center"
          onPress={showMode}>
          {/* <Text className="text-base font-bold text-white"> {text} </Text> */}
          <Text className="text-base font-bold text-white">
            {text == 'Empty'
              ? date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear()
              : text}
          </Text>
          <Icon color={'white'} size={18} name="event" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpDate()}>
          <Icon color={'white'} name="chevron-right" size={30} />
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center bg-primary pb-4">
        <View className="w-[70%] items-center flex-row justify-center">
          <BtnDate title={'Ngày'} id={0} />
          <BtnDate title={'Tuần'} id={1} />
          <BtnDate title={'Tháng'} id={2} />
          <BtnDate title={'Năm'} id={3} />
          <BtnDate title={'Tất cả'} id={4} />
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

export default HeaderTimeAll;
