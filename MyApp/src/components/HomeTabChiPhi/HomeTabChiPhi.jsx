import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Pie from 'react-native-pie';
import HomeItem from '../HomeItem/HomeItem';
import {dataThuChi} from '../../data/dataHome';
import {CalculatorInput} from 'react-native-calculator';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
const HomeTabChiPhi = props => {
  const [value, setValue] = useState(0);
  let itemArr = useSelector(state => state.itemHomeArr.arrItem);
  let moneyIn = 0;
  let moneyOut = 0;
  itemArr.map(item =>
    item.type === 'thu' ? (moneyIn += item.value) : (moneyOut += item.value),
  );

  itemArr = itemArr.filter(function (item) {
    return item.type === 'chi';
  });
  // console.log(itemArr);

  // console.log(count.length);
  // const [showLeft, setShowLefft] = useState(true);
  // const [showRight, setShowRight] = useState(true);
  let total = 0;
  itemArr.map(item => {
    total += item.value;
  });
  let dataPie = [];
  itemArr.map(item => {
    total = total === 0 ? 1 : total;
    const dt = {percentage: (item.value / total) * 100, color: item.color};
    dataPie.push(dt);
  });
  // console.log('data pie', dataPie);
  // if (count > 3) {
  //   setShowLefft(false);
  // }
  // if (count > 6) {
  //   setShowRight(false);
  // }
  return (
    <ScrollView className="flex-1 ">
      {/* <View className="flex-1 flex gap-6 items-center "> */}
      {/* <View className="flex flex-row justify-center w-full ">
          {itemArr.map((item, index) =>
            index < 4 ? (
              <HomeItem
                key={index}
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
        </View> */}

      {/* <View className="flex flex-row items-center w-full">
          <View className="flex flex-col flex-1">
       
            {itemArr.map((item, index) =>
              index >= 4 && index < 6 ? (
                <HomeItem
                  key={index}
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
          </View> */}

      {/* <View className="flex justify-center items-center  flex-1 mx-8">
            <Pie
              radius={95}
              innerRadius={85}
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
            <View style={styles.gauge}>
              <Text className="text-base font-semibold text-slate-90">
                Chi phí
              </Text>
              <Text className="text-2xl font-semibold text-rose-600">
                {moneyOut} đ
              </Text>
              <Text className="text-base font-semibold text-green-600">
                {moneyIn} đ
              </Text>
            </View>
          </View> */}

      {/* <View className="flex flex-col flex-1">
            {itemArr.map((item, index) =>
              index >= 6 && index < 8 ? (
                <HomeItem
                  key={index}
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
        </View> */}
      {/* <View className="flex-row overflow-scroll flex flex-wrap justify-center">
          {itemArr.map((item, index) =>
            index >= 7 ? (
              <HomeItem
                key={index}
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
        </View> */}

      {/* doughnut chart */}

      {/* </View> */}
      <View>
        <View className="flex mx-4 mt-4 flex-row items-center">
          <Pie
            radius={80}
            innerRadius={60}
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
          <View className="">
            <Text className="text-base font-semibold text-slate-90">
              Chi phí
            </Text>
            <Text className="text-2xl font-semibold text-rose-600">
              {moneyOut} đ
            </Text>
            <Text className="text-base font-semibold text-slate-90">
              Thu nhập
            </Text>
            <Text className="text-base font-semibold text-green-600">
              {moneyIn} đ
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeTabChiPhi;

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
