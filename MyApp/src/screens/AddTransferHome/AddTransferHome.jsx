import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Button,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';

import Modal from 'react-native-modal';
import {dataThuChi} from '../../data/dataHome';
import HomeItem from '../../components/HomeItem/HomeItem';
import ChooseItem from '../ChooseItem/ChooseItem';
import {useSelector, useDispatch} from 'react-redux';
import {addTransfer} from '../../redux/slice/transferSlice/transferSlice';
import firestore from '@react-native-firebase/firestore';
import {updateValueItem} from '../../redux/slice/itemHomeSlice/itemHomeSlice';
import {
  updateBlankIn,
  updateBlankOut,
} from '../../redux/slice/blankInOutSlice/blankInOutSlice';
const getBtnColor = type => {
  if (type === 'top') {
    return '#35FBD6';
  } else if (type === 'right') {
    return 'blue';
  } else {
    return 'black';
  }
};

const getDateStartWeek = date => {
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

const AddTransferHome = () => {
  const dispatch = useDispatch();
  const time = useSelector(state => state.currentTime.time);
  const month = time.split('/');

  // get number week in year
  const currentDate = new Date(
    parseInt(month[2]),
    parseInt(month[1]) - 1,
    parseInt(month[0]) + 1,
  );
  // const startDate = new Date(currentDate.getFullYear(), 0, 1);
  // const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  //th5:0
  //th6:1
  //th7:2
  //th8:3
  //th2:4
  //th3:5
  //th4:6

  //const weekNumber = Math.ceil(days / 7);
  // const weekNumber = Math.ceil((currentDate.getDate() + 1 + days) / 7);

  // console.log('full year', currentDate - startDate);

  // console.log('date', time);
  // console.log('week num', currentDate.getDay());

  // const d = new Date(2023, 1, 14);
  // let day = d.getDate();
  // console.log('test', getDateStartWeek(currentDate));
  // console.log('test', currentDate.getDay());
  // console.log('thu 2', getDateStartWeek(currentDate));
  // console.log('test', currentDate.getDay());

  //-------------------------

  const currentItem = useSelector(state => state.currentItem);
  const [result, setResult] = useState('0');
  const [text, setText] = useState('');

  const calculate = title => {
    if (title === 'C') {
      setResult('0');
    } else if (title === 'DL') {
      if (result !== '0') {
        setResult(result.substring(0, result.length - 1));
      }
    } else if (title === '=') {
      const value = Number(eval(result).toFixed(3)).toString();
      setResult(value);
    } else {
      if (result === '0') {
        setResult(title);
      } else {
        setResult(result + title);
      }
    }
  };
  const Btn = ({title, type}) => {
    return (
      <TouchableOpacity
        onPress={() => calculate(title)}
        className="rounded-lg items-center w-20 h-10 bg-slate-400 m-1 flex justify-center">
        <Text style={{color: getBtnColor(type)}} className="text-xl font-bold">
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const userName = useSelector(State => State.auth.userName);
  const handleAddTransfer = () => {
    const id = new Date().getTime();
    ToastAndroid.showWithGravity(
      'Đã thêm chi tiêu',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    firestore()
      .collection('Transfer')
      .doc('' + id)
      .set({
        id: id,
        idItem: currentItem.id,
        value: result - 0,
        time: time,
        year: month[2],
        month: month[1] + '/' + month[2],
        week: getDateStartWeek(currentDate),
        note: text,
        type: currentItem.type,
        user: userName,
      })
      .then(() => {
        console.log('item added!');

        dispatch(
          updateValueItem({
            idItem: currentItem.id,
            value: result - 0,
          }),
        );

        currentItem.type === 'thu'
          ? dispatch(updateBlankIn(result - 0))
          : dispatch(updateBlankOut(result - 0));
      });
  };
  return (
    <View className="flex-1">
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal
        className="flex justify-center items-center"
        isVisible={isModalVisible}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>

        <View className="flex flex-col h-5/6 w-full bg-white absolute">
          <ChooseItem
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            toggleModal={toggleModal}
          />
        </View>
      </Modal>
      <Text>{time}</Text>
      <TouchableOpacity
        onPress={toggleModal}
        style={{backgroundColor: currentItem.color}}
        className="flex flex-row justify-between bg-blue-600 px-8 py-2 items-center">
        <View>
          <Text className="text-sm font-bold text-slate-200 mb-2">
            Đến danh mục
          </Text>
          <Text className="text-2xl font-bold text-slate-200">
            {currentItem.name}
          </Text>
        </View>

        <View className="flex flex-row gap-4 items-center">
          <View className="p-2 rounded-full bg-slate-200 flex flex-row">
            <Icon name={currentItem.icon} size={20} color={currentItem.color} />
          </View>
          <TouchableOpacity onPress={() => handleAddTransfer()} className="">
            <Icon name="done" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-center p-2 border-b-[0.5px] border-zinc-500">
        <Text className="text-base mb-2 mr-auto font-bold">Hiện có</Text>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-3xl">{currentItem.value}</Text>
          <Text className="text-2xl">đ</Text>
        </View>
      </View>
      <View className="flex flex-col items-center justify-center p-2 border-b-[0.5px] border-zinc-500">
        <Text className="text-base mb-2 mr-2 font-bold">Chi phí thêm</Text>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-4xl">{result}</Text>
          <Text className="text-3xl">đ</Text>
        </View>
      </View>
      <View className="border-b-[0.5px] p-1 border-zinc-500 ">
        <TextInput
          onChangeText={value => setText(value)}
          className="text-center text-lg"
          placeholder="Ghi chú..."
        />
      </View>
      <View className="flex-1 flex-row flex-wrap justify-center">
        <Btn title="C" type="top" />
        <Btn title="DL" type="top" />
        <Btn title="/" type="top" />
        <Btn title="%" type="right" />
        <Btn title="7" />
        <Btn title="8" />
        <Btn title="9" />
        <Btn title="*" type="right" />
        <Btn title="4" />
        <Btn title="5" />
        <Btn title="6" />
        <Btn title="-" type="right" />
        <Btn title="1" />
        <Btn title="2" />
        <Btn title="3" />
        <Btn title="+" type="right" />
        <Btn title="00" />
        <Btn title="0" />
        <Btn title="." />
        <Btn title="=" type="right" />
      </View>
    </View>
  );
};

export default AddTransferHome;
