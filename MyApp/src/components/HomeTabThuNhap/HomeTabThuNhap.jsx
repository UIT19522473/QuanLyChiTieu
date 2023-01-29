import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Pie from 'react-native-pie';
import HomeItem from '../HomeItem/HomeItem';
import {dataThuChi} from '../../data/dataHome';
import {CalculatorInput} from 'react-native-calculator';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {udValueItem} from '../../redux/slice/getItemAllSlice/getItemAllSlice';

import {getItemByDate} from '../../FuncGlobal/getItemByDWMY';
import {useEffect} from 'react';
import {getAllItemCurrentByDate} from '../../redux/slice/getItemCurrentAllSlice/getItemCurrentAllSlice';
const HomeTabThuNhap = props => {
  const dispatch = useDispatch();
  const moveScreen = props.route.params.moveScreen;
  //test------------------------
  const [value, setValue] = useState(0);

  const AllData = useSelector(State => State.dataAll);

  let moneyIn = 0;
  let moneyOut = 0;
  let total = 0;
  AllData.arrItem.map(item =>
    item.type === 'thu'
      ? ((moneyIn += item.value), (total += item.value))
      : (moneyOut += item.value),
  );

  let dataPie = [];
  total = total === 0 ? 1 : total;
  AllData.arrItem.map(item => {
    if (item.type == 'thu') {
      const dt = {percentage: (item.value / total) * 100, color: item.color};
      dataPie.push(dt);
    }
  });
  return (
    <ScrollView className="flex-1">
      {/* </View> */}
      <View className="pb-16">
        <View className="flex mt-4 flex-row items-center px-4">
          <View>
            <Pie
              radius={95}
              innerRadius={80}
              sections={
                //   [
                //   {
                //     percentage: 60,
                //     color: '#f00',
                //   },
                //   {
                //     percentage: 10,
                //     color: 'green',
                //   },
                //   {
                //     percentage: 10,
                //     color: 'blue',
                //   },
                // ]
                dataPie
              }
              backgroundColor="#aab1bd"
            />
            <View className="absolute top-[30%] left-[15%] justify-center items-center">
              <Text className="font-semibold text-xl text-slate-500 mb-2">
                Số dư
              </Text>
              <View className="flex-row items-center justify-center w-[130px]">
                <Text
                  numberOfLines={1}
                  className="text-base font-semibold text-primary max-w-[115px]">
                  {moneyIn - moneyOut}
                </Text>
                <Text className="text-lg font-semibold text-primary"> đ</Text>
              </View>
            </View>
          </View>

          <View className="ml-3 w-[164px] mr-4">
            <View className="mb-1 border-b-[1px] w-full border-gray-500">
              <Text className="text-base font-semibold text-slate-500">
                Thu nhập
              </Text>
              <View className="flex-row">
                <Text
                  numberOfLines={1}
                  className="text-xl font-semibold text-green-600 max-w-[155px]">
                  {moneyIn}
                </Text>
                <Text className="text-lg font-semibold text-green-600"> đ</Text>
              </View>
            </View>

            <View className="mb-1 border-b-[1px] w-full border-gray-500">
              <Text className="text-base font-semibold text-slate-500">
                Chi phí
              </Text>
              <View className="flex-row">
                <Text
                  numberOfLines={1}
                  className="text-xl font-semibold text-rose-600 max-w-[155px]">
                  {moneyOut}
                </Text>
                <Text className="text-lg font-semibold text-rose-600"> đ</Text>
              </View>
            </View>
          </View>
        </View>

        {/* items */}

        <View className="flex-row overflow-scroll flex flex-wrap mt-4  items-center px-4 ml-3">
          {/* {itemArr.map((item, index) => (
            <HomeItem
              moveScreen={moveScreen}
              key={index}
              hide={false}
              id={item.id}
              name={item.name}
              value={item.value}
              icon={item.icon}
              color={item.color}
              type={item.type}
            />
          ))} */}

          {AllData.arrItem.map((item, index) =>
            item.type === 'thu' ? (
              <HomeItem
                moveScreen={moveScreen}
                key={item.id}
                hide={false}
                id={item.id}
                name={item.name}
                value={item.value}
                icon={item.icon}
                color={item.color}
                type={item.type}
              />
            ) : (
              <></>
            ),
          )}
        </View>
      </View>
      {/* <TouchableOpacity onPress={moveScreen} className="bg-red-800">
        <Text>asdadads</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default HomeTabThuNhap;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', height: 1050},
  gauge: {
    position: 'absolute',
    width: 150,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
});
