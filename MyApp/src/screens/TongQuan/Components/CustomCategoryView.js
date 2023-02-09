import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CustomProgressBar from './CustomProgressBar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const defaultIconUri =
  'https://cdn-icons-png.flaticon.com/512/3106/3106703.png';
const CustomCategoryView = ({
  item,
  title = 'undefined',
  iconUri = defaultIconUri,
  fillColor,
  progress,
  money,
}) => {
  console.log('item', item);
  return (
    <View style={styles.container}>
      <View style={styles.firstLine}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <Image source={{uri: iconUri}} style={{width: 24, height: 24}} /> */}
          {/* <Text>{item.icon}</Text> */}
          <View
            style={{backgroundColor: item.color}}
            className="rounded-full h-[50px] w-[50px] items-center justify-center mr-2">
            <Icon name={item?.icon} size={22} color="white" />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View
          className="justify-center items-center"
          style={{flexDirection: 'row'}}>
          <Text
            className="text-lg font-bold"
            style={{color: item.type == 'thu' ? 'green' : 'red'}}>
            {money + ' đ'}
          </Text>
          <Text
            className="text-slate-600"
            //   style={{ color: 'c8c8c8' }}
          >
            ( {progress * 100} % )
          </Text>
        </View>
      </View>
      <CustomProgressBar color={fillColor} progress={progress} />
    </View>
  );
};

export default CustomCategoryView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // paddingVertical: 1,
    height: 85,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 3,
  },
  title: {
    paddingLeft: 5,
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
