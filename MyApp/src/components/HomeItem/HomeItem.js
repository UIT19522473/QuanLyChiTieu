import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';

import BtsHomeItem from '../BtsHomeItem/BtsHomeItem';
const HomeItem = props => {
  const refRBSheet = useRef();
  const openBottomSheet = () => {
    refRBSheet.current.open();
  };
  return (
    <TouchableOpacity
      onPress={() => openBottomSheet()}
      className="flex flex-col justify-center items-center gap-1 m-2  p-2 rounded-xl">
      <Text className="font-bold text-sm">Bách hóa</Text>
      <View className="bg-amber-600 p-3 rounded-full">
        <Icon size={22} name="shopping-bag" color={'white'} />
      </View>
      <Text className="font-bold text-primary text-xs">1000 đ</Text>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <BtsHomeItem />
      </RBSheet>
    </TouchableOpacity>
  );
};

export default HomeItem;
