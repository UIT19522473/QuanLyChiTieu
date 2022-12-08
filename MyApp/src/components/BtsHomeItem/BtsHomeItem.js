import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import AddItemHome from '../../screens/AddItemHome/addItemHome';
const BtsHomeItem = () => {
  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const refRBSheet = useRef();
  return (
    <View className="flex-1">
      <View className="flex flex-col bg-orange-500 p-4 gap-2">
        <Text className="text-base text-white">24/12/2022</Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-white">Demo</Text>
          <View className="p-2 rounded-full bg-slate-50 flex items-center justify-center">
            <Icon name="payments" size={24} color="blue" />
          </View>
        </View>

        <View>
          <View className="flex flex-row justify-between">
            <Text className="text-base font-bold text-white">2 giao dịch</Text>
            <View className="flex flex-row gap-2">
              <Text className="text-base text-white font-bold">0</Text>
              <Text className="text-base text-white font-bold">đ</Text>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center">
            <Progress.Bar
              color="white"
              progress={0.8}
              width={200}
              height={10}
            />
            <Text className="text-base text-white font-bold">100%</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-around mt-4">
        <TouchableOpacity className="p-3 bg-primary w-32 items-center rounded-3xl">
          <Text className="text-base font-bold text-white">Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openBottomSheet}
          className="p-3 bg-primary w-32 items-center rounded-3xl">
          <Text className="text-base font-bold text-white">Chỉnh sửa</Text>
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
        <AddItemHome />
      </RBSheet>
    </View>
  );
};

export default BtsHomeItem;
