import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';

import React from 'react';
import { ProgressBar } from '@react-native-community/progress-bar-android';



class PlanDetailObj {

  constructor(name, startTimeAsMillis, endTimeAsMillis, limitExpense, curExpense, type) {
    this.name = name
    this.startDay = startTimeAsMillis
    this.endDay = endTimeAsMillis
    this.limitExpense = limitExpense
    this.curExpense = curExpense,
      this.type = type
  }
  *getIntervalDay() {
    let start = new Date(this.startTimeAsMillis);
    let end = new Data(this.endTimeAsMillis)
    return `${start.getDay}/${start.getMonth}-${end.getDay}/${end.getMonth}`
  }
  *getPercentageProgress() {
    return 0.4
  }
}



const MockData= ()=>{
  let l = [1, 2, 4, 5, 6, 7, 3, 3, 6]
  new PlanDetailObj(`name`, Date.now, Date.now + 1000000, 100000, 30000, '')
  let planz = l.map(i => new PlanDetailObj(`name${i}`, Date.now, Date.now + 1000000, 100000, 30000, 'temp'))
  return planz
}

const data = MockData()

const rederPlanCard = ({item}) =>
(
  <View style={styles.HanMucCard}>
    <View style={styles.HanMucLabel}>
      <View flexDirection='row'>
        <Image source={require('../../asset/restaurant.png')} style={styles.icon} />
        <View flexDirection='column' justifyContent='flex-end'>
          <Text style={styles.header}>{item.name}</Text>
          <Text style={styles.paragraphs}>{item.getIntervalDay}</Text>
        </View>
      </View>
      <Text style={styles.header2}>{item.limitExpense}</Text>
    </View>
    <View style={styles.HanMucProcess}>
      <View style={{ width: '80%', justifyContent: 'center' }}>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          animating={true}
          progress={0.4}
        />
      </View>
    </View>
    <View style={styles.HanMucDetail}>
      <Text name="expire">Con 12 ngay</Text>
      <View style={styles.paragraphs} flexDirection='row' justifyContent='space-between'>
        <Text style={styles.paragraphs} name="expense-type">({item.type}) </Text>
        <Text stylel={styles.paragraphs} name="expense-amount"> {item.curExpense} VND</Text>
      </View>
    </View>
  </View>
);



class HanMuc extends React.Component {

  constructor(props) {
    super(props)
    this.plans = MockData()
  }

  render() {
    return (
      <FlatList data={this.plans} renderItem={rederPlanCard} />
    );
  }
};

const styles = StyleSheet.create({
  HanMucCard: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  HanMucLabel: {
    width: '100%',
    flexDirection: 'row',
    height: '55%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  HanMucDetail: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-around'
  },
  HanMucProcess: {
    height: '15%',
    backgroundColor: 'white',
    width: '100%',
  },

  icon: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    resizeMode: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    padding: 5
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 3
  },
  header2: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 6
  },
  paragraphs: {
    fontSize: 13,
    padding: 3
  }
});


export default HanMuc;
