import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useState} from 'react';
import ColorItem from '../../data/Colors/ColorItem';
import ColorPicker from 'react-native-wheel-color-picker';
import {useSelector, useDispatch} from 'react-redux';
import {addColorCurrentItem} from '../../redux/slice/currentItemSlice/currentItemSlice';

const ModalColor = props => {
  const dispatch = useDispatch();
  // const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    props.setMode(false);
  };

  const [color, setColor] = useState('');
  const [index, setIndex] = useState(0);
  const [colorCurrent, setColorCurren] = useState('red');

  const onColorChange = color => {
    setColor(color);
  };
  const ItemColor = ({colors, height, width, indexCur}) => {
    const borderColor = indexCur === index ? colors : 'transparent';
    return (
      <TouchableOpacity
        style={{borderWidth: 3, borderColor: borderColor}}
        className="rounded-full m-[2px] p-1"
        onPress={() => pickColor(colors, indexCur)}>
        <View
          style={{
            backgroundColor: colors,
            height: height,
            width: width,
          }}
          className="rounded-full"
        />
      </TouchableOpacity>
    );
  };
  const pickColor = (value, vt) => {
    setColorCurren(value);
    setIndex(vt);
    // console.log('pick color', colorCurrent);
  };
  const confirmItem = () => {
    dispatch(addColorCurrentItem(colorCurrent));
    props.setMode(false);
  };
  return (
    <View className="flex flex-1">
      <Modal
        className="flex justify-center items-center"
        isVisible={props.mode}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>
        <View className="pb-3 flex flex-col h-[90%] w-full bg-white absolute">
          <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
            <Text className="text-lg font-bold">Chọn màu</Text>
          </View>
          <View className="flex flex-1 flex-row flex-wrap justify-center p-2">
            {ColorItem.map((item, index) => (
              <ItemColor
                indexCur={index}
                height={37}
                width={37}
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
          <View className="flex flex-row justify-end gap-12 mx-6">
            <TouchableOpacity onPress={toggleModal}>
              <Text className="text-base text-red-500 font-bold">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmItem}>
              <Text className="text-base text-primary font-bold">Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalColor;
