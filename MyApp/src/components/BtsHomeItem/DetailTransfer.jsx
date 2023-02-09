import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChooseItem from '../../screens/ChooseItem/ChooseItem';
import Modal from 'react-native-modal';
import {useState} from 'react';
import * as convertTime from '../../screens/FunctionGlobal/convertTimeByString';

import firestore from '@react-native-firebase/firestore';
import {
  updateValueItem,
  addDataTransfer,
  updateTransfer,
  removeTransfer,
} from '../../redux/slice/dataAllSlice/dataAllSlice';

import DateTimePicker from '@react-native-community/datetimepicker';

const DetailTransfer = ({data, refRBSheet}) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const ItemCurrent = useSelector(State => State.currentItem);
  const Auth = useSelector(State => State.auth);
  const [txtDate, setTxtDate] = useState('');
  const [number, onChangeNumber] = React.useState('');
  const [text, onChangeText] = React.useState('');
  useEffect(() => {
    setTxtDate(data.time);
    onChangeNumber(data.value + '');
    onChangeText(data.note);
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateTransfer = () => {
    console.log('update');

    // const id = new Date().getTime();
    const id = data.id;
    const idItemCurrent = ItemCurrent.id;
    const idItemEdit = ItemCurrent.itemEdit.id;
    ToastAndroid.showWithGravity(
      'Đã lưu chi tiêu',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    // const test = {
    //   idItemCurrent: ItemCurrent.id,
    //   idItemEdit: ItemCurrent.itemEdit.id,
    //   id: id,
    //   idItem: ItemCurrent.itemEdit.id,
    //   value: parseInt(number),
    //   time: txtDate,
    //   year: convertTime.getYear(txtDate),
    //   month: convertTime.getMonth(txtDate),
    //   week: convertTime.getStartWeek(txtDate),
    //   note: text,
    //   type: ItemCurrent.type,
    //   user: Auth.userName,
    // };
    // console.log('test', test);

    firestore()
      .collection('Transfer')
      .doc('' + id)
      .update({
        id: id,
        idItem: ItemCurrent.itemEdit.id,
        value: parseInt(number),
        time: txtDate,
        year: convertTime.getYear(txtDate),
        month: convertTime.getMonth(txtDate),
        week: convertTime.getStartWeek(txtDate),
        note: text,
        type: ItemCurrent.type,
        user: Auth.userName,
      })
      .then(() => {
        console.log('item upDate!');

        // dispatch(
        //   updateValueItem({
        //     idItem: currentItem.itemEdit.id,
        //     value: result - 0,
        //   }),
        // );
        dispatch(
          updateTransfer({
            idItemCurrent: idItemCurrent,
            idItemEdit: idItemEdit,
            id: id,
            idItem: idItemEdit,
            value: parseInt(number),
            time: txtDate,
            year: convertTime.getYear(txtDate),
            month: convertTime.getMonth(txtDate),
            week: convertTime.getStartWeek(txtDate),
            note: text,
            type: ItemCurrent.type,
            user: Auth.userName,
          }),
        );
      });
    refRBSheet.current.close();
  };

  const handleRemoveTransfer = () => {
    console.log('removeTransfer');

    const id = data.id;
    const idItem = ItemCurrent.id;

    // console.log('sss', id + '-' + idItem);
    dispatch(removeTransfer({id: id, idItem: idItem}));
    refRBSheet.current.close();
  };

  const handleDeleteTransfer = () => {
    const id = data.id;
    const idItem = ItemCurrent.id;
    Alert.alert('Xóa giao dịch', 'Bạn có chắc muốn xóa giao dịch này', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => handleRemoveTransfer(),
      },
    ]);
  };

  const showMode = currentMode => {
    setShow(true);
    // setMode(currentMode);
  };

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

    setTxtDate(fDate);
  };

  return (
    <View className="flex-1">
      <Modal
        className="flex justify-center items-center"
        isVisible={isModalVisible}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>

        <View className="flex flex-col h-5/6 w-full bg-white absolute">
          <ChooseItem
            edit={true}
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            toggleModal={toggleModal}
          />
        </View>
      </Modal>

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
      <TouchableOpacity
        className="px-8 py-2 flex-row items-center"
        style={{backgroundColor: ItemCurrent.itemEdit.color}}
        onPress={showMode}>
        <Icon color={'white'} size={18} name="event" />
        <Text className="text-base font-bold text-slate-200 ml-2">
          {txtDate}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleModal}
        style={{backgroundColor: ItemCurrent.itemEdit.color}}
        className="flex-row px-8 justify-between pb-6 pt-2">
        <View>
          {/* <Text>Đến danh mục</Text> */}
          <Text className="text-2xl font-bold text-slate-200">
            {ItemCurrent.itemEdit.name}
          </Text>
        </View>
        <View className="flex-row w-[40px] h-[40px] bg-slate-200 rounded-full justify-center items-center">
          <Icon
            name={ItemCurrent.itemEdit.icon}
            size={22}
            color={ItemCurrent.itemEdit.color}
          />
        </View>
      </TouchableOpacity>
      <View className="w-full justify-center items-center mt-4 border-b-[1px] border-gray-300">
        <Text className="text-base text-slate-700 font-bold">Chi phí</Text>
        {/* <Text className>{data.value}</Text> */}
        <View className="flex-row justify-center items-center">
          <TextInput
            className="text-2xl text-primary font-bold"
            value={number}
            keyboardType="numeric"
            onChangeText={onChangeNumber}
          />
          <Text className="text-2xl text-primary font-bold">đ</Text>
        </View>
      </View>

      {/* <View className="flex-row w-full justify-center items-center mt-4 border-b-[1px] border-gray-300 "> */}
      <View className="max-h-[90px] py-4 justify-center items-center mb-4">
        <ScrollView
          className="w-full border-b-[1px] border-gray-300"
          contentContainerStyle={{flexGrow: 1}}>
          <View className="flex-row w-full justify-center items-center ">
            <TextInput
              multiline={true}
              className="text-lg flex-wrap py-2 px-4 "
              value={text}
              //   keyboardType="numeric"
              placeholder="Ghi chú..."
              onChangeText={onChangeText}
            />
          </View>
        </ScrollView>
      </View>

      {/* </View> */}

      <View className="flex-row justify-around mt-auto mb-8">
        <TouchableOpacity
          onPress={() => handleDeleteTransfer()}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-red-300 rounded-full justify-center items-center">
            <Icon name="delete-sweep" size={24} color={'#c92424'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleUpdateTransfer()}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-blue-300 rounded-full justify-center items-center">
            <Icon name="save" size={24} color="blue" />
          </View>
          <Text className="text-xs font-semibold text-gray">Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-orange-300 rounded-full justify-center items-center">
            <Icon name="close" size={24} color={'yellow'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailTransfer;
