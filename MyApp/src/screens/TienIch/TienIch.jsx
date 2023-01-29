import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../components/context';
import {useContext} from 'react';

const TienIch = ({navigation}) => {
  const {signOutMain} = useContext(AuthContext);
  return (
    <View className="flex-1">
      <View className="w-full justify-center items-center my-2 border-b-[0.7px] p-4 mb-8">
        <Text className="text-primary text-2xl font-bold">Tiện ích</Text>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('HanMuc')}>
        <Text>Next</Text>
      </TouchableOpacity> */}

      <View className="flex-row justify-evenly">
        <TouchableOpacity className="w-[150px] h-[150px] border-[1px] rounded-3xl border-orange-500 justify-center items-center">
          <Icon size={46} name="payments" color="orange" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Hạn mức chi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[150px] h-[150px] border-[1px] rounded-3xl border-green-500 justify-center items-center">
          <Icon size={46} name="file-present" color="green" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Xuất file excel
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-evenly mt-6">
        <TouchableOpacity className="w-[150px] h-[150px] border-[1px] rounded-3xl border-blue-500 justify-center items-center">
          <Icon size={46} name="done-all" color="blue" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Việc hôm nay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[150px] h-[150px] border-[1px] rounded-3xl border-red-500 justify-center items-center">
          <Icon size={46} name="search" color="red" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Tra cứu tỷ giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Text>Xuat file</Text>
      <Text>To do</Text>
      <Text>Tra cuu ti gia</Text> */}

      <TouchableOpacity
        onPress={() => signOutMain()}
        className="mt-auto border-[1px] p-3 mx-4 mb-4 rounded-xl flex-row items-center border-stone-400">
        <Icon name="logout" size={28} color="red" />
        <Text className="ml-4 text-xl text-red-500 font-bold">Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TienIch;
