import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useState} from 'react';
import ColorItem from '../../data/Colors/ColorItem';
import ColorPicker from 'react-native-wheel-color-picker';

const ModalColor = props => {
  // const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    props.setMode(false);
  };

  const [color, setColor] = useState('');

  const onColorChange = color => {
    setColor(color);
  };
  const ItemColor = ({colors, height, width}) => {
    return (
      <TouchableOpacity
        onPress={() => pickColor(colors)}
        style={{backgroundColor: colors, height: height, width: width}}
        className="rounded-full m-2"></TouchableOpacity>
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
            <Text className="text-lg font-bold">Chọn màu</Text>
          </View>
          <View className="flex flex-1 flex-row flex-wrap justify-center p-2">
            {ColorItem.map((item, index) => (
              <ItemColor
                height={40}
                width={40}
                colors={item.color}
                key={index}
              />
            ))}
            <View className="p-4 relative flex">
              <View
                // onPress={() => pickColor(color)}
                className="absolute -bottom-[80px] right-0 z-10">
                <ItemColor height={60} width={60} colors={color} />
              </View>
              <View className="">
                <ColorPicker
                  color={color}
                  onColorChange={color => onColorChange(color)}
                  // onColorChangeComplete={color =>
                  //   alert(`Color selected: ${color}`)
                  // }
                  thumbSize={20}
                  sliderSize={20}
                  noSnap={true}
                  row={false}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalColor;
