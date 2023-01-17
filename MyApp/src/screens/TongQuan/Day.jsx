import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Pie from 'react-native-pie';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
import HomeItem from '../../components/HomeItem/HomeItem';

const Day = () => {
  // const [itemArr, SetItemArr] = useState([]);

  let itemArr = useSelector(state => state.itemHomeArr.arrItem);
  let moneyIn = 0;
  let moneyOut = 0;

  itemArr.map(item =>
    item.type === 'thu' ? (moneyIn += item.value) : (moneyOut += item.value),
  );

  const arrThu = itemArr.filter(item => item.type === 'thu');

  const arrChi = itemArr.filter(item => item.type === 'chi');

  const [inMax, SetInMax] = useState({});
  const [outMax, SetOutMax] = useState({});

  useEffect(() => {
    SetInMax(
      arrThu.length > 0
        ? arrThu.reduce((prev, current) =>
            prev.value > current.value ? prev : current,
          )
        : {name: 'Không có'},
    );
    SetOutMax(
      arrChi.length > 0
        ? arrChi.reduce((prev, current) =>
            prev.value > current.value ? prev : current,
          )
        : {name: 'Không có'},
    );
  }, [itemArr]);

  const total = moneyIn + moneyOut != 0 ? moneyIn + moneyOut : 1;
  const percentIn = Math.round((moneyIn / total) * 100);
  const precentOut = 100 - percentIn;

  //get count tranfer by day

  const transferByDay = useSelector(State => State.transferItem.arr);
  return (
    <ScrollView className="flex-1">
      <View className="flex-1 justify-center items-center p-4">
        <Pie
          radius={120}
          innerRadius={100}
          sections={
            [
              {
                // percentage: Math.round((moneyIn / (moneyIn + moneyOut)) * 100),
                percentage: percentIn,
                color: 'green',
              },
              {
                // percentage: Math.round((moneyOut / (moneyIn + moneyOut)) * 100),
                percentage: precentOut,
                color: 'red',
              },
            ]
            //dataPie
          }
          backgroundColor="#aab1bd"
        />
        {/* <View style={styles.gauge}> */}
        <View className="absolute items-center justify-center top-[5%] h-[210px] w-[200px]">
          {/* <Text className="text-base font-semibold text-slate-90">Chi phí</Text> */}
          <View className="items-center justify-center">
            <Text className="text-lg font-bold text-rose-600">Chi phí</Text>
            <Text className="text-xl font-semibold text-rose-600">
              {moneyOut} đ
            </Text>
            <Text>-------------------------------</Text>
            <Text className="text-lg font-bold text-green-600">Thu nhập</Text>
            <Text className="text-xl font-semibold text-green-600">
              {moneyIn} đ
            </Text>
          </View>
        </View>

        <View className="w-full mt-4 border-[1px] rounded-xl border-gray-400">
          <View
            // style={styles.shadow}
            className="flex-row justify-between p-4 border-b-[1px] border-gray-400">
            <Text className="text-xl text-zinc-500 font-bold">
              Tiền dư trong ngày :
            </Text>
            <Text className="text-2xl font-bold text-primary">
              {moneyIn - moneyOut}
            </Text>
          </View>

          <View
            // style={styles.shadow}
            className="flex-row justify-between items-center p-4 border-b-[1px] border-gray-400">
            <Text className="text-xl text-zinc-500 font-bold">
              Mục chi nhiều nhất :
            </Text>
            {outMax.value != 0 ? (
              <HomeItem
                hide={false}
                id={outMax.id}
                name={outMax.name}
                value={outMax.value}
                icon={outMax.icon}
                color={outMax.color}
                type={outMax.type}
              />
            ) : (
              <Text className="text-2xl font-bold text-primary">Không có</Text>
            )}
          </View>
          <View
            // style={styles.shadow}
            className="flex-row justify-between items-center p-4 border-b-[1px] border-gray-400 ">
            <Text className="text-xl text-zinc-500 font-bold">
              Mục thu nhiều nhất :
            </Text>
            {inMax.value != 0 ? (
              <HomeItem
                hide={false}
                id={inMax.id}
                name={inMax.name}
                value={inMax.value}
                icon={inMax.icon}
                color={inMax.color}
                type={inMax.type}
              />
            ) : (
              <Text className="text-2xl font-bold text-primary">Không có</Text>
            )}
          </View>

          <View
            // style={styles.shadow}
            className="flex-row justify-between  p-4 ">
            <Text className="text-xl text-zinc-500 font-bold">
              Tổng số giao dịch :
            </Text>
            <Text className="text-2xl font-bold text-primary">
              {transferByDay.length}
            </Text>
          </View>
          {/* <Text>Mục chi nhiều nhất</Text>
        <Text>Mục thu nhiều nhất</Text> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', height: 1050},
  gauge: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',

    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    elevation: 3,
  },
});
