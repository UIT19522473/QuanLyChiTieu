import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addIdCurrentItem,
  addNameCurrentItem,
  addColorCurrentItem,
  addIconCurrentItem,
  addValueCurrentItem,
} from '../../redux/slice/currentItemSlice/currentItemSlice';

const ChooseItem = props => {
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState();
  const [icon, setIcon] = useState();
  const [value, setValue] = useState();
  const [indexCurrent, setIndexCurrent] = useState(-1);
  const SubItem = props => {
    //   const refRBSheet = useRef();
    //   const openBottomSheet = () => {
    //     refRBSheet.current.open();
    //   };
    const {value, name, color, icon, id, index} = props;
    // console.log('item data here', props.value);
    // console.log('id iTem', id);
    // console.log(useSelector(state => state.currentItem.time));
    const bgColor = indexCurrent === index ? color : '';
    const circleColor = indexCurrent === index ? 'white' : color;
    const iconColor = indexCurrent === index ? color : 'white';

    const handleOnPress = () => {
      setIndexCurrent(index);
      setValue(value);
      setName(name);
      setColor(color);
      setIcon(icon);
      setId(id);
    };
    return (
      <TouchableOpacity
        onPress={() => handleOnPress()}
        style={{backgroundColor: bgColor}}
        className="mx-2 flex justify-center items-center py-4 px-5 rounded-xl mb-2">
        <Text
          style={{color: circleColor}}
          className="font-bold text-sm mb-1 w-[56px] text-center">
          {name}
        </Text>
        <View
          style={{backgroundColor: circleColor}}
          className="p-3 rounded-full">
          <Icon size={22} name={icon} color={iconColor} />
        </View>
        <Text
          style={{color: circleColor}}
          className="font-bold text-primary text-xs mt-[1px]">
          {value} đ
        </Text>
      </TouchableOpacity>
    );
  };

  // const data = useSelector(state => state.itemHomeArr.arrItem);
  const data = useSelector(State => State.dataAll.arrItem);
  const [tab, setTab] = useState('chi');
  const borderChi = tab === 'chi' ? 3 : 0;
  const borderThu = tab === 'thu' ? 3 : 0;
  const handleConfirmItem = type => {
    // isModalVisible = {isModalVisible} setModalVisible = {setModalVisible}
    if (type === 'close') {
      props.setModalVisible(!props.isModalVisible);
    } else {
      dispatch(addIdCurrentItem(id));
      dispatch(addNameCurrentItem(name));
      dispatch(addColorCurrentItem(color));
      dispatch(addIconCurrentItem(icon));
      dispatch(addValueCurrentItem(value));
      props.setModalVisible(!props.isModalVisible);
    }
  };
  return (
    <View className="flex flex-1">
      <View className="flex flex-row justify-between border-b-[1px] border-gray-400 bg-blue-300">
        <TouchableOpacity
          style={{borderBottomWidth: borderChi, borderColor: 'blue'}}
          onPress={() => setTab('chi')}
          className="flex-1 items-center p-4 ">
          <Text className="font-bold text-slate-100 text-base">Chi Phi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{borderBottomWidth: borderThu, borderColor: 'blue'}}
          onPress={() => setTab('thu')}
          className="flex-1 items-center p-4">
          <Text className="font-bold text-slate-100 text-base">Thu Nhap</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {tab === 'chi' ? (
          <View className="flex flex-row flex-wrap py-4 px-2">
            {data.map((item, index) =>
              item.type === 'chi' ? (
                <SubItem
                  value={item.value}
                  name={item.name}
                  color={item.color}
                  icon={item.icon}
                  id={item.id}
                  index={index}
                  key={index}
                />
              ) : (
                <></>
              ),
            )}
          </View>
        ) : (
          <></>
        )}

        {tab === 'thu' ? (
          <View className="flex flex-row flex-wrap py-4 px-2">
            {data.map((item, index) =>
              item.type === 'thu' ? (
                <SubItem
                  value={item.value}
                  name={item.name}
                  color={item.color}
                  icon={item.icon}
                  id={item.id}
                  index={index}
                  key={index}
                />
              ) : (
                <></>
              ),
            )}
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      <View className=" flex flex-row justify-end gap-12 p-4">
        <TouchableOpacity onPress={() => handleConfirmItem('close')}>
          <Text className="font-bold text-base text-red-500">Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleConfirmItem('confirm')}>
          <Text className="font-bold text-base text-primary">Xong</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseItem;
