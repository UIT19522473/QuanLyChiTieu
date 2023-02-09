import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addCurrentItem,
  addItemEdit,
} from '../../redux/slice/currentItemSlice/currentItemSlice';
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

  const allData = useSelector(State => State.dataAll);
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
      <View className="mx-1 flex justify-center items-center  w-[90px]">
        {/* <Text>{time}</Text> */}
        <Text className="font-bold text-sm mb-1">{name}</Text>
        <View style={{backgroundColor: color}} className="p-3 rounded-full">
          <Icon size={22} name={icon} color={'white'} />
        </View>
        <View className="flex-row justify-center items-center mt-[1px]">
          <Text
            numberOfLines={1}
            className="font-bold text-primary text-xs max-w-[140px">
            {value}
          </Text>
          <Text className="font-bold marker:text-xs text-primary"> đ</Text>
        </View>
      </View>
    );
  };
  const getSubTransferFB = time => {
    //sub transfer theo ngày
    if (timeMode == 0) {
      dispatch(clearSubTransfer());
      // firestore()
      //   .collection('Transfer')
      //   // Filter results
      //   .where('time', '==', time)
      //   .where('idItem', '==', id)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total items: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         id: documentSnapshot.data().id,
      //         idItem: documentSnapshot.data().idItem,
      //         note: documentSnapshot.data().note,
      //         time: documentSnapshot.data().time,
      //         value: documentSnapshot.data().value,
      //         type: documentSnapshot.data().type,
      //       };
      //       // listData.push(temp);

      //       dispatch(addSubTransfer(temp));
      //     });
      //   });
      allData.arrTrans.map(item => {
        if (time == item.time && item.idItem == id) {
          dispatch(addSubTransfer(item));
        }
      });
    }

    //sub transfer theo tuần
    if (timeMode == 1) {
      dispatch(clearSubTransfer());

      allData.arrTrans.map(item => {
        if (timeVal.week == item.week && item.idItem == id) {
          dispatch(addSubTransfer(item));
        }
      });

      // firestore()
      //   .collection('Transfer')
      //   // Filter results
      //   .where('week', '==', timeVal.week)
      //   .where('idItem', '==', id)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total items: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         id: documentSnapshot.data().id,
      //         idItem: documentSnapshot.data().idItem,
      //         note: documentSnapshot.data().note,
      //         time: documentSnapshot.data().time,
      //         value: documentSnapshot.data().value,
      //         type: documentSnapshot.data().type,
      //       };
      //       // listData.push(temp);

      //       dispatch(addSubTransfer(temp));
      //     });
      //   });
    }

    //sub transfer theo tháng
    if (timeMode == 2) {
      dispatch(clearSubTransfer());

      allData.arrTrans.map(item => {
        if (timeVal.month == item.month && item.idItem == id) {
          dispatch(addSubTransfer(item));
        }
      });

      // firestore()
      //   .collection('Transfer')
      //   // Filter results
      //   .where('month', '==', timeVal.month)
      //   .where('idItem', '==', id)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total items: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         id: documentSnapshot.data().id,
      //         idItem: documentSnapshot.data().idItem,
      //         note: documentSnapshot.data().note,
      //         time: documentSnapshot.data().time,
      //         value: documentSnapshot.data().value,
      //         type: documentSnapshot.data().type,
      //       };
      //       // listData.push(temp);

      //       dispatch(addSubTransfer(temp));
      //     });
      //   });
    }

    //sub transfer theo năm
    if (timeMode == 3) {
      dispatch(clearSubTransfer());

      allData.arrTrans.map(item => {
        if (timeVal.year == item.year && item.idItem == id) {
          dispatch(addSubTransfer(item));
        }
      });

      // firestore()
      //   .collection('Transfer')
      //   // Filter results
      //   .where('year', '==', timeVal.year)
      //   .where('idItem', '==', id)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total items: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         id: documentSnapshot.data().id,
      //         idItem: documentSnapshot.data().idItem,
      //         note: documentSnapshot.data().note,
      //         time: documentSnapshot.data().time,
      //         value: documentSnapshot.data().value,
      //         type: documentSnapshot.data().type,
      //       };
      //       // listData.push(temp);

      //       dispatch(addSubTransfer(temp));
      //     });
      //   });
    }

    //sub transfer tat ca cac nam
    if (timeMode == 4) {
      dispatch(clearSubTransfer());

      allData.arrTrans.map(item => {
        if (item.idItem == id) {
          dispatch(addSubTransfer(item));
        }
      });

      // firestore()
      //   .collection('Transfer')
      //   // Filter results
      //   .where('idItem', '==', id)
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total items: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         id: documentSnapshot.data().id,
      //         idItem: documentSnapshot.data().idItem,
      //         note: documentSnapshot.data().note,
      //         time: documentSnapshot.data().time,
      //         value: documentSnapshot.data().value,
      //         type: documentSnapshot.data().type,
      //       };
      //       // listData.push(temp);

      //       dispatch(addSubTransfer(temp));
      //     });
      //   });
    }
  };

  const openEdit = () => {
    getSubTransferFB(timeCurrent);
    setHeight(300);
    setTypeModal('edit');
    dispatch(addCurrentItem({value, name, color, icon, id, type}));
    dispatch(addItemEdit({value, name, color, icon, id, type}));
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
      // onLongPress={() => navigation.navigate('BottomSheetEdit')}
      onLongPress={() => openEdit()}
      onPress={() => openAddTransfer()}
      // onPress={
      //   // console.log('alo alo');
      //   props.moveScreen
      // }
      className="flex flex-col justify-center items-center m-2 rounded-xl mb-4">
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
        {typeModal === 'edit' ? (
          <BtsHomeItem moveScreen={props.moveScreen} id={id} />
        ) : (
          <AddTransferHome />
        )}

        {/* {typeModal === 'edit' ? <BtsHomeItem /> : <></>} */}
      </RBSheet>
    </TouchableOpacity>
  );
};

export default HomeItem;
