import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';

const XuatFile = ({navigation}) => {
  const dataAll = useSelector(State => State.dataAll);
  const auth = useSelector(State => State.auth);

  return (
    <View className="flex-1">
      <View className="flex-row items-center bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-[85%] items-center">
          <Text className="text-gray-50 font-bold text-2xl">Xuất file</Text>
        </View>
      </View>

      <Text className="border-b-2">{auth.userName}</Text>
      <View className="border-b-2">
        {dataAll.arrItem.map(item => (
          <Text>{item.name}</Text>
        ))}
      </View>

      <View className="">
        {dataAll.arrTrans.map(trans => (
          <Text>{trans.id}</Text>
        ))}
      </View>
    </View>
  );
};

export default XuatFile;
