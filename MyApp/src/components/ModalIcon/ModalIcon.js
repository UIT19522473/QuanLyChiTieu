import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useState} from 'react';
import ColorItem from '../../data/Colors/ColorItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconsItemThu, IconsItemChi} from '../../data/Icons/IconsItem';

const ModalIcon = props => {
  // const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    props.setMode(false);
  };

  const [color, setColor] = useState('');

  const onColorChange = color => {
    setColor(color);
  };
  const ItemIcon = ({value, height, width}) => {
    console.log(value);
    return (
      <TouchableOpacity
        style={{height: height, width: width}}
        className="rounded-full m-2 flex justify-center items-center border-[1px] border-zinc-300">
        <Icon size={24} name={value} />
      </TouchableOpacity>
    );
  };
  const pickColor = value => {
    console.log('pick color', value);
  };
  return (
    <View className="flex flex-1">
      <Modal
        className="flex justify-center items-center"
        isVisible={props.mode}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>
        <View className="flex flex-col h-5/6 w-full bg-white absolute">
          <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
            <Text className="text-lg font-bold">Chọn biểu tượng</Text>
          </View>
          <View className="flex flex-1 flex-col  p-2">
            <View className="mb-4">
              <Text className="mb-2">Biểu tượng thu nhập</Text>
              <View className="flex flex-row flex-wrap justify-between">
                {IconsItemThu.map((item, index) => (
                  <ItemIcon
                    height={40}
                    width={40}
                    value={item.value}
                    key={index}
                  />
                ))}
              </View>
            </View>

            <View>
              <Text className="mb-2">Biểu tượng chi tiêu</Text>
              <View className="flex flex-row flex-wrap justify-between">
                {IconsItemChi.map((item, index) => (
                  <ItemIcon
                    height={45}
                    width={45}
                    value={item.value}
                    key={index}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalIcon;
