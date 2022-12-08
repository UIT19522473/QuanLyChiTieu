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
const getBtnColor = type => {
  if (type === 'top') {
    return '#35FBD6';
  } else if (type === 'right') {
    return 'blue';
  } else {
    return 'black';
  }
};
const AddTransferHome = () => {
  const [result, setResult] = useState('0');

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
          <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
            <Text className="text-lg font-bold">Chi Phí</Text>
          </View>
          <ScrollView className="">
            <View className="flex flex-row flex-wrap justify-center p-1">
              {dataThuChi.map(item => (
                <HomeItem key={item.id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={toggleModal}
        className="flex flex-row justify-between bg-blue-600 px-8 py-2 items-center">
        <View>
          <Text className="text-base font-bold text-slate-200 mb-2">
            Đến danh mục
          </Text>
          <Text className="text-xl font-bold text-slate-200">Gia đình</Text>
        </View>

        <View className="flex flex-row gap-4 items-center">
          <View className="p-2 rounded-full bg-slate-200 flex flex-row">
            <Icon name="shopping-cart" size={20} color="blue" />
          </View>
          <TouchableOpacity
            onPress={() => {
              ToastAndroid.showWithGravity(
                'Đã thêm chi tiêu',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
            className="">
            <Icon name="done" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View className="flex flex-row items-center justify-center p-2 border-b-[0.5px] border-zinc-500">
        <Text className="text-base mb-2 mr-auto font-bold">Hiện có</Text>
        <View className="flex flex-row items-center gap-2">
          <Text className="text-3xl">{result}</Text>
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
        <TextInput className="text-center text-lg" placeholder="Ghi chú..." />
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
