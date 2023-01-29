import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';

const ModalDetailItem = props => {
  const dispatch = useDispatch();

  const ItemCurrent = useSelector(State => State.currentItem);
  const allData = useSelector(State => State.dataAll);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View className="rounded-xl flex flex-col h-[90%] w-full bg-white absolute py-4">
      <View className="flex-row items-center justify-center">
        <View className="flex justify-center items-center  w-[90px]">
          <View
            style={{backgroundColor: ItemCurrent.color}}
            className="p-3 rounded-full">
            <Icon size={22} name={ItemCurrent.icon} color={'white'} />
          </View>
        </View>

        {/* <View className="flex-row max-w-[300px]"> */}
        <Text
          numberOfLines={1}
          className="text-xl font-bold text-slate-900  max-w-[220px]">
          {ItemCurrent.name}
        </Text>
        {/* </View> */}
      </View>

      <View>
        {show && (
          <DateTimePicker
            value={date}
            //   // mode={mode}
            //   onChange={onChange}
            mode="date"
            display="default"
            is24Hour={true}
          />
        )}

        <Text>Ngày, tuần</Text>
        <Text>20000 money</Text>
      </View>

      <View>
        <Text>item </Text>
        <Text>item </Text>
        <Text>item </Text>
      </View>

      <View className="justify-end flex-row mt-auto">
        <TouchableOpacity onPress={props.toggleModalDetail} className="mr-8">
          <Text className="text-lg font-bold text-gray-500">Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalDetailItem;
