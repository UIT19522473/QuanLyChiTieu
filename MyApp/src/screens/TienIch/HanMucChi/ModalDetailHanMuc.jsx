import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import {
  addHanMuc,
  updateTichHanMuc,
  updateHanMuc,
} from '../../../redux/slice/dataAllSlice/dataAllSlice';

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
    //   dispatch(updateTick({ id: chooseCurrent.id, tick: !toggleCheckBox }));
    dispatch(
      updateTichHanMuc({
        id: chooseCurrent.id,
        tick: !toggleCheckBox,
        idHanMuc: props.idHanMuc,
      }),
    );
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

        {props.item.tick && (
          <View className="bg-green-600 flex-1 w-full justify-center items-center">
            <Icon name="done" color={'white'} size={14} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ModalDetailHanMuc = ({toggleModal, data}) => {
  const dispatch = useDispatch();
  const allData = useSelector(State => State.dataAll);
  const auth = useSelector(State => State.auth);

  const [value, setValue] = useState(0);
  const [name, setName] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [dataBack, setDataBack] = useState({});
  const [arrChooseBack, setArrChooseBack] = useState([]);

  useEffect(() => {
    const currentDateStart = data.timeStart.split('/');
    const currentDateEnd = data.timeEnd.split('/');
    // setShow2(false);

    const DateStart = new Date(
      parseInt(currentDateStart[2]),
      parseInt(currentDateStart[1]) - 1,
      parseInt(currentDateStart[0]),
    );
    const DateEnd = new Date(
      parseInt(currentDateEnd[2]),
      parseInt(currentDateEnd[1]) - 1,
      parseInt(currentDateEnd[0]),
    );

    setDate(DateStart);
    setDate2(DateEnd);

    let tempDate = new Date(DateStart);
    let fDate =
      // tempDate.getDay() +
      // '/' +
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    let tempDate2 = new Date(DateEnd);
    let fDate2 =
      // tempDate.getDay() +
      // '/' +
      tempDate2.getDate() +
      '/' +
      (tempDate2.getMonth() + 1) +
      '/' +
      tempDate2.getFullYear();

    setText2(fDate2);

    setText(fDate);

    //---------------------------
    setName(data.name);
    setValue(data.money + '');

    let arrChooseB = [];
    data.arrChoose.map(item => {
      arrChooseB.push(item);
    });
    setArrChooseBack(arrChooseB);
    setDataBack({
      arrChoose: arrChooseBack,
      id: data.id,
      money: data.money,
      name: data.name,
      timeEnd: data.timeEnd,
      timeStart: data.timeStart,
      user: data.user,
    });
  }, []);

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
  // const auth = useSelector(State=>State.auth)

  const handleDeleteHanMuc = () => {
    Alert.alert('Xóa hạn mức', 'Bạn có chắc muốn xóa hạn mức này ?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        // onPress: () => handleRemoveTransfer(),
      },
    ]);
  };

  const handleCreateHanMuc = () => {
    // console.log('Save Han muc', data);

    const hanMucAdd = {
      id: data.id,
      money: value,
      name: name,
      timeStart: text,
      timeEnd: text2,
      user: auth.userName,
      arrChoose: data.arrChoose,
    };
    console.log('HanMuc', hanMucAdd);

    //arrItemChoose
    // const arrChoose = HanMucAdd.arrChoose.filter(item => item.tick === true);

    // //function firebase add Han muc
    if (value !== '') {
      // const id = new Date().getTime();
      firestore()
        .collection('HanMuc')
        .doc('' + data.id)
        .update({
          id: data.id,
          money: value,
          name: name,
          timeStart: text,
          timeEnd: text2,
          user: auth.userName,
          arrChoose: data.arrChoose,
        })
        .then(() => {
          console.log('item added!');
          dispatch(
            updateHanMuc({
              id: data.id,
              hanMucAdd: {
                id: data.id,
                money: value,
                name: name,
                timeStart: text,
                timeEnd: text2,
                user: auth.userName,
                arrChoose: data.arrChoose,
              },
            }),
          );

          ToastAndroid.showWithGravity(
            'Đã thêm hạn mức',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          toggleModal();
        });
    } else {
      console.log('ko dung dinh dang');
    }
  };

  let itemHaveNow = [];
  allData.arrItem.map(item => {
    itemHaveNow.push(item.id);
  });

  const closeModal = () => {
    toggleModal();
    arrChooseBack.map(item => {
      dispatch(
        updateTichHanMuc({
          id: item.id,
          tick: item.tick,
          idHanMuc: data.id,
        }),
      );
    });
    console.log('back data', dataBack);
  };

  return (
    <View className=" flex flex-col h-[90%] w-full bg-white absolute">
      <View className="flex items-center justify-center p-2 border-b-[1px] mb-2">
        <Text className="text-lg font-bold">Hạn mức: {data.name}</Text>
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
                {data.arrChoose.map((item, index) =>
                  itemHaveNow.includes(item.id) ? (
                    <ItemMenu item={item} key={index} idHanMuc={data.id} />
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
      {/* 
      <View className="flex flex-row justify-end gap-12 mb-3 mx-6 mt-auto">
        <TouchableOpacity
          //   onPress={toggleModal}
          onPress={() => closeModal()}>
          <Text className="text-lg font-bold text-red-500 mr-4">Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateHanMuc}>
          <Text className="text-lg font-bold text-blue-500">Lưu</Text>
        </TouchableOpacity>
      </View> */}

      <View className="flex-row justify-around mt-auto mb-8">
        <TouchableOpacity
          onPress={() => handleDeleteHanMuc()}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-red-300 rounded-full justify-center items-center">
            <Icon name="delete-sweep" size={24} color={'#c92424'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Xóa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateHanMuc}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-blue-300 rounded-full justify-center items-center">
            <Icon name="save" size={24} color="blue" />
          </View>
          <Text className="text-xs font-semibold text-gray">Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => closeModal()}
          className="flex-col justify-center items-center">
          <View className="mb-[1px] w-[40px] h-[40px] bg-orange-300 rounded-full justify-center items-center">
            <Icon name="close" size={24} color={'yellow'} />
          </View>
          <Text className="text-xs font-semibold text-gray">Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalDetailHanMuc;
