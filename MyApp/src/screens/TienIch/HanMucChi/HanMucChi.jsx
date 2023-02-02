import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {useState} from 'react';
import DateTimePicker1 from '@react-native-community/datetimepicker';
import DateTimePicker2 from '@react-native-community/datetimepicker';

import {useSelector, useDispatch} from 'react-redux';

import {
  addSwitchAll,
  addArrChoose,
  clearArrChoose,
  allTickCheck,
  updateTick,
} from '../../../redux/slice/HanMucSlice/HanMucSlice';

// import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';

const ItemMenu = props => {
  const dispatch = useDispatch();
  const dataAll = useSelector(State => State.dataAll);
  const HanMucAdd = useSelector(State => State.HanMucAdd);
  const chooseCurrent = HanMucAdd.arrChoose.find(
    choose => choose.id == props.item.id,
  );
  // HanMucAdd.arrChoose.map(choose => {
  //   console.log(choose.id);
  // });
  // console.log('chooseCurrent', chooseCurrent);
  const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const toggleTick = () => {
    setToggleCheckBox(!toggleCheckBox);
    // chooseCurrent.tick = !toggleCheckBox;
    dispatch(updateTick({id: chooseCurrent.id, tick: !toggleCheckBox}));
    // console.log(chooseCurrent.tick);
  };
  return (
    <View className="flex-row my-2 items-center justify-between">
      <View className="flex-row items-center">
        <View
          style={{backgroundColor: props.item.color}}
          className="w-[32px] h-[32px] rounded-full mr-2 justify-center items-center">
          <Icon name={props.item.icon} color="white" size={18} />
        </View>

        <Text className="font-bold">{props.item.name}</Text>
      </View>

      <TouchableOpacity
        onPress={toggleTick}
        className="h-[18px] w-[18px] border-[1px] rounded-sm justify-center items-center">
        {/* {toggleCheckBox && (
          <View className="bg-green-600 flex-1 w-full justify-center items-center">
            <Icon name="done" color={'white'} size={14} />
          </View>
        )} */}

        {chooseCurrent.tick && (
          <View className="bg-green-600 flex-1 w-full justify-center items-center">
            <Icon name="done" color={'white'} size={14} />
          </View>
        )}
      </TouchableOpacity>

      {/* <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      /> */}
    </View>
  );
};

const ItemHanMuc = () => {
  return (
    <TouchableOpacity className="p-4 border-b-[1px] border-zinc-400 mb-4">
      <View className="flex-row mb-6 items-center">
        <View className="p-2 rounded-full border-green-600 border-[2px]">
          <Icon name="payments" size={28} color="green" />
        </View>
        <View className="ml-4">
          <Text className="text-gray-900 text-lg font-bold">Demo</Text>
          <Text className="text-base text-gray-600">Time 1/2-2/2</Text>
        </View>
        <View className="ml-auto">
          <Text className="text-lg text-primary font-bold">20000 đ</Text>
        </View>
      </View>
      <View className="w-full h-[10px] rounded-xl bg-slate-300 mb-2">
        <View
          style={{width: '30%', backgroundColor: 'red'}}
          className="h-[10px] rounded-xl"></View>
      </View>
      <View className="justify-between flex-row">
        <Text className="text-base text-gray-600">Còn 20 ngày</Text>
        <Text className="text-base text-gray-900 font-bold">15.000đ</Text>
      </View>
    </TouchableOpacity>
  );
};

const ModalAddHanMuc = ({toggleModal}) => {
  const dispatch = useDispatch();
  const allData = useSelector(State => State.dataAll);
  const auth = useSelector(State => State.auth);

  const [value, setValue] = useState(0);
  const [name, setName] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);

  const [text, setText] = useState(
    // '',
    'Empty',
  );

  const [text2, setText2] = useState(
    // '',
    'Empty',
  );
  const showMode = currentMode => {
    setShow(true);
    // setMode(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    // setMode(currentMode);
  };

  const onChange = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      // tempDate.getDay() +
      // '/' +
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    setText(fDate);
  };

  const onChange2 = (event, selectDate) => {
    const currentDate = selectDate || date;
    setShow2(false);
    setDate2(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      // tempDate.getDay() +
      // '/' +
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    setText2(fDate);
  };

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  //switch
  const HanMucAdd = useSelector(State => State.HanMucAdd);
  const [isEnabled, setIsEnabled] = useState(false);

  // HanMucAdd.switchAll ? setIsEnabled(true) : setIsEnabled(false);
  // console.log(HanMucAdd.switchAll);

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const toggleSwitch = () => {
    dispatch(addSwitchAll(!isEnabled));
    // dispatch(addSwitchAll(false));
    dispatch(allTickCheck(!isEnabled));
    setIsEnabled(!isEnabled);
    // console.log('switch', HanMucAdd.switchAll);
  };

  const handleCreateHanMuc = () => {
    console.log('Save Han muc');

    //arrItemChoose
    const arrChoose = HanMucAdd.arrChoose.filter(item => item.tick === true);

    //function firebase add Han muc
    if (arrChoose.length > 0) {
      const id = new Date().getTime();
      firestore()
        .collection('HanMuc')
        .doc('' + id)
        .set({
          id: id,
          money: value,
          name: name,
          arrChoose: arrChoose,
          timeStart:
            text == 'Empty'
              ? date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear()
              : text,
          timeEnd:
            text2 == 'Empty'
              ? date2.getDate() +
                '/' +
                (date2.getMonth() + 1) +
                '/' +
                date2.getFullYear()
              : text2,
          user: auth.userName,
        })
        .then(() => {
          console.log('item added!');

          ToastAndroid.showWithGravity(
            'Đã thêm hạn mức',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

          // dispatch(
          //   updateValueItem({
          //     idItem: currentItem.id,
          //     value: result - 0,
          //   }),
          // );
          // dispatch(
          //   addDataTransfer({
          //     id: id,
          //     idItem: currentItem.id,
          //     value: result - 0,
          //     time: time,
          //     year: month[2],
          //     month: month[1] + '/' + month[2],
          //     week: getDateStartWeek(currentDate),
          //     note: text,
          //     type: currentItem.type,
          //     user: userName,
          //   }),
          // );
        });
    } else {
      console.log('ko dung dinh dang');
    }
  };

  return (
    <View className=" flex flex-col h-[90%] w-full bg-white absolute">
      <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
        <Text className="text-lg font-bold">Thêm hạn mức</Text>
      </View>
      <View>
        <View className="p-4">
          <View className="flex-row items-center w-[95%] justify-between  border-b-[1px] mx-4">
            <Text className="text-primary font-bold text-lg">Số tiền</Text>
            <View className="flex-row items-center">
              <TextInput
                className="text-end text-3xl font-bold text-primary "
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                placeholder="0"
              />
              <Text className="text-3xl text-primary font-bold">đ</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center w-[85%] border-b-[1px] mx-8">
          <Icon name="create" size={24} color="green" />
          <TextInput
            className="text-end text-xl font-bold ml-2"
            value={name}
            onChangeText={setName}
            // keyboardType="numeric"
            placeholder="Tên hạn mức"
          />
          {/* <Text className="text-2xl text-primary font-bold">đ</Text> */}
        </View>

        <TouchableOpacity
          onPress={toggleMenu}
          className="flex-row justify-between m-6">
          <View className="flex-row items-center">
            <Icon name="category" size={28} color="orange" />
            <Text className="ml-4 text-lg font-bold text-gray-700">
              Chọn mục chi
            </Text>
          </View>
          {showMenu ? (
            <Icon name="expand-more" size={28} />
          ) : (
            <Icon name="chevron-right" size={28} />
          )}
        </TouchableOpacity>
        {showMenu && (
          <View className="px-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center pb-4">
                <Icon name="list" size={24} />
                <Text className="text-base font-bold ml-4">Chọn tất cả</Text>
              </View>
              <Switch
                onValueChange={toggleSwitch}
                value={HanMucAdd.switchAll}
              />
            </View>
            <ScrollView
              className="max-h-[140px] p-2"
              contentContainerStyle={{flexGrow: 1}}>
              <View className="p-4">
                {allData.arrItem.map((item, index) =>
                  item.type == 'chi' ? (
                    <ItemMenu item={item} key={index} />
                  ) : (
                    <></>
                  ),
                )}
              </View>
            </ScrollView>
          </View>
        )}

        <View className="border-t-[1px] py-3">
          <TouchableOpacity
            onPress={showMode}
            className="flex-row items-center mx-6">
            <Icon name="insert-invitation" size={32} color="green" />
            <View className="ml-4">
              <Text className="text-xs">Ngày bắt đầu</Text>
              <Text className="text-lg font-bold text-green-600">
                {text == 'Empty'
                  ? date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear()
                  : text}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showMode2}
            className="flex-row items-center mx-6 my-4">
            <Icon name="insert-invitation" size={32} color="red" />
            <View className="ml-4">
              <Text className="text-xs">Ngày Kết thúc</Text>
              <Text className="text-lg font-bold text-red-500">
                {text2 == 'Empty'
                  ? date2.getDate() +
                    '/' +
                    (date2.getMonth() + 1) +
                    '/' +
                    date2.getFullYear()
                  : text2}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker1
            value={date}
            // mode={mode}
            onChange={onChange}
            mode="date"
            // display="default"
            // is24Hour={true}
          />
        )}

        {show2 && (
          <DateTimePicker2
            value={date2}
            // mode={mode}
            onChange={onChange2}
            mode="date"
            // display="default"
            // is24Hour={true}
          />
        )}
      </View>

      <View className="flex flex-row justify-end gap-12 mb-3 mx-6 mt-auto">
        <TouchableOpacity onPress={toggleModal}>
          <Text className="text-lg font-bold text-red-500 mr-4">Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateHanMuc}>
          <Text className="text-lg font-bold text-blue-500">Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HanMucChi = ({navigation}) => {
  const dispatch = useDispatch();
  const [modeModal, setModeModal] = useState(false);
  const toggleModal = () => {
    setModeModal(!modeModal);
  };
  const allData = useSelector(State => State.dataAll);
  const HanMucAdd = useSelector(State => State.HanMucAdd);
  useEffect(() => {
    dispatch(addSwitchAll(false));
    dispatch(clearArrChoose());
    allData.arrItem.map(item => {
      if (item.type === 'chi') {
        dispatch(
          addArrChoose({
            id: item.id,
            name: item.name,
            icon: item.icon,
            color: item.color,
            tick: false,
          }),
        );
      }
    });
  }, []);

  // console.log('Han muc add', HanMucAdd.arrChoose);
  // console.log('Item', allData.arrItem.length);

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-gray-50 font-bold text-2xl">Hạn mức chi</Text>
        </View>

        <TouchableOpacity onPress={toggleModal}>
          <Icon name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ItemHanMuc />
        {/* <ItemHanMuc />
        <ItemHanMuc />
        <ItemHanMuc />
        <ItemHanMuc />
        <ItemHanMuc /> */}
      </ScrollView>

      <Modal className="flex justify-center items-center" isVisible={modeModal}>
        <TouchableOpacity
          className="flex-1 w-full relative"
          onPress={toggleModal}></TouchableOpacity>
        <ModalAddHanMuc toggleModal={toggleModal} />
      </Modal>
    </View>
  );
};

export default HanMucChi;
