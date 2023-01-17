import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addCurrentItem} from '../../redux/slice/currentItemSlice/currentItemSlice';
// import AddTransferHome from '../../screens/AddTransferHome';
import AddTransferHome from '../../screens/AddTransferHome/AddTransferHome';

import BtsHomeItem from '../BtsHomeItem/BtsHomeItem';
import {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  clearSubTransfer,
  addSubTransfer,
} from '../../redux/slice/subTransferSlice/subTransferSlice';

const HomeItem = props => {
  const dispatch = useDispatch();
  // const time = useSelector(state => state.currentTime.time);

  // const item = useSelector(state => state.currentItem);
  const timeCurrent = useSelector(state => state.currentTime.time);

  const timeVal = useSelector(state => state.currentTime);
  const timeMode = useSelector(state => state.currentTime.modeTime);
  // console.log('time check', timeMode);

  const refRBSheet = useRef();

  const [height, setHeight] = useState(570);
  const [typeModal, setTypeModal] = useState('add');
  const {value, name, color, icon, id, type} = props;
  // console.log('item data here', props.value);
  // console.log('id iTem', id);
  // console.log(useSelector(state => state.currentItem.time));
  const Body = () => {
    return (
      <View className="mx-2 flex justify-center items-center">
        {/* <Text>{time}</Text> */}
        <Text className="font-bold text-sm mb-1">{name}</Text>
        <View style={{backgroundColor: color}} className="p-3 rounded-full">
          <Icon size={22} name={icon} color={'white'} />
        </View>
        <Text className="font-bold text-primary text-xs mt-[1px]">
          {value} đ
        </Text>
      </View>
    );
  };
  const getSubTransferFB = time => {
    //sub transfer theo ngày
    if (timeMode == 0) {
      dispatch(clearSubTransfer());
      firestore()
        .collection('Transfer')
        // Filter results
        .where('time', '==', time)
        .where('idItem', '==', id)
        .get()
        .then(querySnapshot => {
          console.log('Total items: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            const temp = {
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            };
            // listData.push(temp);

            dispatch(addSubTransfer(temp));
          });
        });
    }

    //sub transfer theo tuần
    if (timeMode == 1) {
      dispatch(clearSubTransfer());
      firestore()
        .collection('Transfer')
        // Filter results
        .where('week', '==', timeVal.week)
        .where('idItem', '==', id)
        .get()
        .then(querySnapshot => {
          console.log('Total items: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            const temp = {
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            };
            // listData.push(temp);

            dispatch(addSubTransfer(temp));
          });
        });
    }

    //sub transfer theo tháng
    if (timeMode == 2) {
      dispatch(clearSubTransfer());
      firestore()
        .collection('Transfer')
        // Filter results
        .where('month', '==', timeVal.month)
        .where('idItem', '==', id)
        .get()
        .then(querySnapshot => {
          console.log('Total items: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            const temp = {
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            };
            // listData.push(temp);

            dispatch(addSubTransfer(temp));
          });
        });
    }

    //sub transfer theo năm
    if (timeMode == 3) {
      dispatch(clearSubTransfer());
      firestore()
        .collection('Transfer')
        // Filter results
        .where('year', '==', timeVal.year)
        .where('idItem', '==', id)
        .get()
        .then(querySnapshot => {
          console.log('Total items: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            const temp = {
              id: documentSnapshot.data().id,
              idItem: documentSnapshot.data().idItem,
              note: documentSnapshot.data().note,
              time: documentSnapshot.data().time,
              value: documentSnapshot.data().value,
              type: documentSnapshot.data().type,
            };
            // listData.push(temp);

            dispatch(addSubTransfer(temp));
          });
        });
    }
  };

  const openEdit = () => {
    getSubTransferFB(timeCurrent);
    setHeight(300);
    setTypeModal('edit');
    dispatch(addCurrentItem({value, name, color, icon, id, type}));
    refRBSheet.current.open();
  };

  const openAddTransfer = () => {
    setHeight(570);
    // console.log('addTransfer');
    setTypeModal('add');
    dispatch(addCurrentItem({value, name, color, icon, id, type}));
    refRBSheet.current.open();
  };
  return (
    <TouchableOpacity
      onLongPress={() => openEdit()}
      onPress={() => openAddTransfer()}
      className="flex flex-col justify-center items-center gap-1 m-2  p-2 rounded-xl">
      <Body />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {typeModal === 'edit' ? <BtsHomeItem /> : <AddTransferHome />}
      </RBSheet>
    </TouchableOpacity>
  );
};

export default HomeItem;
