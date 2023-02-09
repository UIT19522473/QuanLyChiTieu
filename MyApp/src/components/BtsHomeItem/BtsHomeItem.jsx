import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import AddItemHome from '../../screens/AddItemHome/addItemHome';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  clearSubTransfer,
  addSubTransfer,
} from '../../redux/slice/subTransferSlice/subTransferSlice';
import {
  removeItemById,
  removeTransferByIdItem,
} from '../../redux/slice/dataAllSlice/dataAllSlice';

import ModalDetailItem from './ModalDetailItem';
import * as getSubTrans from '../../screens/FunctionGlobal/getSubTransfer';

const BtsHomeItem = props => {
  const dispatch = useDispatch();

  const allData = useSelector(State => State.dataAll);
  const timeCurrent = useSelector(State => State.currentTime);

  const item = useSelector(state => state.currentItem);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalDetailVisible, setModalDetailVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalDetail = () => {
    setModalDetailVisible(!isModalDetailVisible);
  };

  //time last week
  const timeWeek = useSelector(state => state.currentTime.week);
  const timeWeekArr = timeWeek.split('/');
  const day = 60 * 60 * 24 * 1000;
  const tempDate = new Date(
    parseInt(timeWeekArr[2]),
    parseInt(timeWeekArr[1]) - 1,
    parseInt(timeWeekArr[0]),
  );
  const lastWeek = new Date(tempDate.getTime() + day * 6);

  let time = useSelector(state => state.currentTime.time);

  const timeVal = useSelector(state => state.currentTime);

  if (timeVal.modeTime == 0) {
    time = 'Ngày ' + useSelector(state => state.currentTime.time);
  } else if (timeVal.modeTime == 1) {
    time =
      'Từ: ' +
      useSelector(state => state.currentTime.week) +
      ' - ' +
      lastWeek.getDate() +
      '/' +
      lastWeek.getMonth() +
      1 +
      '/' +
      lastWeek.getFullYear();
  } else if (timeVal.modeTime == 2) {
    time = 'Tháng ' + useSelector(state => state.currentTime.month);
  } else if (timeVal.modeTime == 3) {
    time = 'Năm ' + useSelector(state => state.currentTime.year);
  }

  const subTransfer = useSelector(state => state.subTransferItem.arr);
  // console.log('subTransfer', subTransfer.length);
  const subArrTrans = getSubTrans.getSubTrans(allData, timeCurrent, props.id);
  // console.log(
  //   'Test SubTrans',
  //   getSubTrans.getSubTrans(allData, timeCurrent, props.id).length,
  // );

  // console.log('new');
  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const ItemCurrent = useSelector(State => State.currentItem);

  let count = 0;

  allData.arrTrans.map(item => {
    if (item.idItem == ItemCurrent.id) {
      count++;
    }
  });
  // console.log('All data... ', allData);
  const deleteHandler = () => {
    Alert.alert(
      'Bạn có chắc muốn xóa ' + ItemCurrent.name + '?',
      'Tất cả các giao dịch (' +
        subTransfer.length +
        ') liên quan đến danh mục này sẽ bị xóa.',
      [
        {text: 'Có', onPress: () => console.log('yes delete')},
        {text: 'Hủy', onPress: () => console.log('No delete')},
      ],
    );
  };

  const handleDeleteItem = () => {
    // console.log('delete Item');

    toggleModal();
    //remove item
    firestore()
      .collection('Items')
      .doc(item.id.toString())
      .delete()
      .then(() => {
        console.log('deleted items!!!');
        dispatch(removeItemById(item.id));
      });

    // remove transfer
    dispatch(removeTransferByIdItem(item.id));
    firestore()
      .collection('Transfer')
      .where('idItem', '==', item.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          firestore()
            .collection('Transfer')
            .doc(documentSnapshot.id.toString())
            .delete()
            .then(() => {
              console.log('deleted transfer!!!');
            });
        });
      });
  };

  // console.log('all item now...', allData.arrItem);

  // console.log('all transfer now...', allData.arrTrans);

  const refRBSheet = useRef();
  return (
    <View className="flex-1 ">
      {/* modal delete */}
      <Modal
        className="flex justify-center items-center"
        isVisible={isModalVisible}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>

        <View className="rounded-xl flex flex-col h-[220px] w-full bg-white absolute py-4">
          <View className="flex-row items-center">
            <View className="mx-1 flex justify-center items-center  w-[90px]">
              <View
                style={{backgroundColor: ItemCurrent.color}}
                className="p-3 rounded-full">
                <Icon size={22} name={ItemCurrent.icon} color={'white'} />
              </View>
            </View>

            <View className="flex-wrap flex-row w-[250px]">
              <Text className="text-xl font-bold text-slate-900">
                Bạn muốn xóa {ItemCurrent.name}?
              </Text>
            </View>
          </View>
          <View className="flex-row flex-wrap px-6 mt-4">
            <Text className="text-base text-gray-600">
              Tất cả các giao dịch
              <Text className="font-bold">{' (' + count + ') '}</Text>
              liên quan đến danh mục này sẽ bị xóa
            </Text>
          </View>

          <View className="justify-end flex-row px-6 mt-8">
            <TouchableOpacity onPress={toggleModal} className="mr-14">
              <Text className="text-lg font-bold text-gray-500">Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteItem}>
              <Text className="text-lg font-bold text-red-600">Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* ------------ */}

      {/* modal chi tiet----------------- */}

      <Modal
        className="flex justify-center items-center"
        isVisible={isModalDetailVisible}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModalDetail}></TouchableOpacity>

        <ModalDetailItem
          toggleModalDetail={toggleModalDetail}
          item={item}
          id={props.id}
        />
      </Modal>
      {/* ------------------------------ */}

      <View
        style={{backgroundColor: item.color}}
        className="flex flex-col bg-orange-500 p-4 gap-2">
        <Text className="text-base text-white">{time}</Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-white">{item.name}</Text>
          <View className="p-2 rounded-full bg-slate-50 flex items-center justify-center">
            <Icon name={item.icon} size={24} color={item.color} />
          </View>
        </View>

        <View className="py-3">
          <View className="flex flex-row justify-between">
            <Text className="text-base font-bold text-white">
              {/* {subTransfer.length} giao dịch */}
              {subArrTrans.length} giao dịch
            </Text>
            <View className="flex flex-row gap-2">
              <Text className="text-base text-white font-bold">
                {item.value}
              </Text>
              <Text className="text-base text-white font-bold">đ</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-around mt-4">
        <TouchableOpacity
          // onPress={openBottomSheet}
          // onPress={() => deleteHandler()}
          onPress={toggleModal}
          className="p-2  items-center ">
          <View className="rounded-full p-3 bg-red-200 mb-1">
            <Icon name="delete-sweep" size={24} color={'#c92424'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openBottomSheet}
          className="p-2  items-center ">
          <View className="rounded-full p-3 bg-green-200 mb-1">
            <Icon name="edit" size={24} color={'green'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={props.moveScreen}
          onPress={toggleModalDetail}
          className="p-2  items-center ">
          <View className="rounded-full p-3 bg-blue-200 mb-1">
            <Icon name="assignment" size={24} color={'blue'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Chi tiết</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={550}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <AddItemHome mode="edit" />
      </RBSheet>
    </View>
  );
};

export default BtsHomeItem;
