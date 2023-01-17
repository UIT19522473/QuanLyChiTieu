import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useState} from 'react';
import ColorItem from '../../data/Colors/ColorItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IconsItemThu, IconsItemChi} from '../../data/Icons/IconsItem';
import {useSelector, useDispatch} from 'react-redux';
import {addIconCurrentItem} from '../../redux/slice/currentItemSlice/currentItemSlice';

const ModalIcon = props => {
  // const [isModalVisible, setModalVisible] = useState(true);
  const dispatch = useDispatch();
  const toggleModal = () => {
    // setModalVisible(!isModalVisible);
    props.setMode(false);
  };

  const [color, setColor] = useState('');
  const [currenIndex, setCurrentIndex] = useState(0 + 'thu');
  const [nameIcon, setNameIcon] = useState('payments');

  const onColorChange = color => {
    setColor(color);
  };
  const ItemIcon = ({value, height, width, index}) => {
    // console.log(value);
    const bgColor = index === currenIndex ? '#6b7280' : '';
    const clIcon = index === currenIndex ? 'white' : '';
    const getIcon = () => {
      setCurrentIndex(index);
      setNameIcon(value);
    };
    return (
      <TouchableOpacity
        onPress={getIcon}
        style={{height: height, width: width, backgroundColor: bgColor}}
        className="rounded-full m-2 flex justify-center items-center border-[1px] border-zinc-300">
        <Icon color={clIcon} size={24} name={value} />
      </TouchableOpacity>
    );
  };
  const pickColor = value => {
    console.log('pick color', value);
  };

  const confirmIcon = () => {
    dispatch(addIconCurrentItem(nameIcon));
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
        <View className=" flex flex-col h-[92%] w-full bg-white absolute">
          <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
            <Text className="text-lg font-bold">Chọn biểu tượng</Text>
          </View>
          <View className="flex flex-1 flex-col  p-2">
            <View className="mb-2">
              <Text className="mb-2">Biểu tượng thu nhập</Text>
              <View className="flex flex-row flex-wrap justify-between">
                {IconsItemThu.map((item, index) => (
                  <ItemIcon
                    index={index + 'thu'}
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
                    index={index + 'chi'}
                    height={45}
                    width={45}
                    value={item.value}
                    key={index}
                  />
                ))}
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-end gap-12 mb-3 mx-6">
            <TouchableOpacity onPress={toggleModal}>
              <Text className="text-base font-bold text-red-500">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIcon}>
              <Text className="text-base font-bold text-primary">Xong</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalIcon;
