import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Pie from 'react-native-pie';
import HomeItem from '../HomeItem/HomeItem';
import {dataThuChi} from '../../data/dataHome';
import {CalculatorInput} from 'react-native-calculator';
import {useState} from 'react';

const HomeTabThuNhap = () => {
  const [value, setValue] = useState(0);

  return (
    <ScrollView className="flex-1 ">
      <View className="flex-1 flex gap-6 items-center">
        <View className="flex flex-row justify-center w-10/12 ">
          <HomeItem />
          <HomeItem />
          <HomeItem />
          <HomeItem />
        </View>

        <View className="flex flex-row justify-center items-center w-10/12 ">
          <View className="flex flex-col">
            <HomeItem />
            <HomeItem />
          </View>
          <View className="flex justify-center items-center">
            <Pie
              radius={95}
              innerRadius={85}
              sections={[
                {
                  percentage: 60,
                  color: '#f00',
                },
                {
                  percentage: 10,
                  color: 'green',
                },
                {
                  percentage: 10,
                  color: 'blue',
                },
              ]}
              backgroundColor="#aab1bd"
            />
            <View style={styles.gauge}>
              <Text className="text-base font-semibold text-slate-90">
                Chi phí
              </Text>
              <Text className="text-xl font-semibold text-rose-600">0 đ</Text>
              <Text className="text-base font-semibold text-green-600">
                0 đ
              </Text>
            </View>
          </View>

          <View className="flex flex-col">
            <HomeItem />
            <HomeItem />
          </View>
        </View>
        <View className="flex-row overflow-scroll flex flex-wrap justify-center">
          {dataThuChi.map(item => (
            <HomeItem key={item.id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeTabThuNhap;

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center', height: 1050},
  gauge: {
    position: 'absolute',
    width: 100,
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
