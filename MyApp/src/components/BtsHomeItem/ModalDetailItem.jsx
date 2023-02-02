import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';

//function compare to sort array
function compare(a, b) {
  //var dateStringA = "23/10/2015"; // Oct 23

  const datePartsA = a.time.split('/');

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObjectA = new Date(
    +datePartsA[2],
    datePartsA[1] - 1,
    +datePartsA[0],
  );

  const datePartsB = b.time.split('/');

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObjectB = new Date(
    +datePartsB[2],
    datePartsB[1] - 1,
    +datePartsB[0],
  );

  // console.log('in floop', dateObjectA - dateObjectB);

  if (dateObjectA < dateObjectB) {
    return 1;
  }
  if (dateObjectA > dateObjectB) {
    return -1;
  }
  return 0;
}

const ItemDetail = ({data}) => {
  const time = data.time.split('/');
  return (
    <View className="flex-row items-center p-4 bg-slate-200 mb-2">
      <Text className="text-2xl font-bold text-primary">{time[0]}</Text>
      <View className="ml-4">
        <Text className="text-base font-bold text-slate-600">hôm nay</Text>
        <Text className="text-base font-bold text-primary">
          tháng {time[1] + '/' + time[2]}
        </Text>
      </View>
      <View className="ml-auto">
        <Text
          style={{
            color: data.type === 'chi' ? 'red' : 'green',
          }}
          className="text-xl font-bold mb-2">
          {data.type === 'chi' ? '- ' + data.value : data.value} {' đ'}
        </Text>
        {data.note != '' ? (
          <Text className="italic">{'Ghi chú: ' + data.note}</Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const ModalDetailItem = props => {
  const dispatch = useDispatch();

  const dataAll = useSelector(State => State.dataAll);
  const subTransfer = useSelector(state => state.subTransferItem.arr);
  const subTransferSlice = subTransfer.slice();
  subTransferSlice.sort(compare);

  // let money = 0;
  // money = subTransferSlice.map(item => {
  //   console.log(item.value);
  //   money += item.value;
  // });
  // console.log('log...', subTransferSlice);

  const ItemCurrent = useSelector(State => State.currentItem);
  const allData = useSelector(State => State.dataAll);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <View className="rounded-xl flex flex-col h-[90%] w-full bg-white absolute py-4">
      <View className="flex-row items-center justify-center mb-6">
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

      <View className="flex-row justify-center items-center mb-4">
        <Text className="text-xl font-bold ">
          {ItemCurrent.type === 'thu' ? 'Tổng thu' : 'Tổng chi'}
        </Text>
        <Text
          style={{
            color: ItemCurrent.type === 'chi' ? 'red' : 'green',
          }}
          className="ml-4 text-2xl font-bold">
          {ItemCurrent.value}
        </Text>
      </View>

      {/* <View>
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
      </View> */}

      <View>
        {subTransferSlice.map(item => (
          // <Text>{item.id}</Text>
          <ItemDetail data={item} />
        ))}
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
