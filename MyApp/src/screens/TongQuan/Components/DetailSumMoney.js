import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailSumMoney = ({money, type}) => {
  const typeTitle = {
    income: 'thu',
    expense: 'chi',
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tổng {typeTitle[type]}</Text>
      <Text
        className="text-xl font-bold"
        style={{color: type == 'thu' ? 'green' : 'red'}}
        // style={{ styles.money, color: 'red' }}
      >
        {money + ' đ'}
      </Text>
    </View>
  );
};

export default DetailSumMoney;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  money: {
    fontSize: 20,
    // color: 'black',
    fontWeight: 'bold',
  },
});
