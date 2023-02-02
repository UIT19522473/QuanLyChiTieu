import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Todo = ({navigation}) => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-[85%] items-center">
          <Text className="text-gray-50 font-bold text-2xl">
            Việc hằng ngày
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Todo;
