import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
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

const BtsHomeItem = () => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.currentItem);

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

  // console.log('new');
  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const refRBSheet = useRef();
  return (
    <View className="flex-1">
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
              {subTransfer.length} giao dịch
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
          // onPress={openBottomSheet}
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
