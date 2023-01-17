import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-element-textinput';
import React from 'react';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalColor from '../../components/ModalColor/ModalColor';
import ModalIcon from '../../components/ModalIcon/ModalIcon';
import firestore from '@react-native-firebase/firestore';
import {Dropdown} from 'react-native-element-dropdown';

import {useSelector, useDispatch} from 'react-redux';
import {
  addItem,
  itemHomeArr,
  updateNameColorIconItem,
} from '../../redux/slice/itemHomeSlice/itemHomeSlice';
const AddItemHome = (props, {navigation}) => {
  const dispatch = useDispatch();
  const currenItem = useSelector(state => state.currentItem);
  const time = useSelector(state => state.currentItem.time);
  const colorItem = useSelector(state => state.currentItem.color);
  const iconItem = useSelector(state => state.currentItem.icon);
  // const typeItem = useSelector(state => state.currentItem.type);
  const valueItem = useSelector(state => state.currentItem.value);
  const [name, setName] = useState('');
  // const [value, setValue] = useState('0');
  // const [color, setColor] = useState('green');

  // const [icon, setIcon] = useState('shopping-basket');
  const [modeModalColor, setModeModalColor] = useState(false);
  // const [timeId, setTimeID] = useState(0);
  const openModalColor = () => {
    setModeModalColor(true);
    console.log('open modal color', modeModalColor);
  };

  const [modeModalIcon, setModeModalIcon] = useState(false);
  const openModalIcon = () => {
    setModeModalIcon(true);
    console.log('open modal icon', modeModalColor);
  };

  // const [idUpdate, setIdUpdate] = useState(0);
  // const getId = () => {
  //   firestore()
  //     .collection('Items')
  //     .where('id', '==', currenItem.id)
  //     .get()
  //     .then(querySnapshot => {
  //       // console.log('Total transfer: ', querySnapshot.size);

  //       querySnapshot.forEach(documentSnapshot => {
  //         // console.log('test here', documentSnapshot.data().type);
  //         setIdUpdate(documentSnapshot.id);
  //       });
  //     });
  // };

  const userName = useSelector(State => State.auth.userName);
  // console.log(userName);

  const handleAddItem = () => {
    const timeID = new Date().getTime();

    // console.log('getID', getId());
    // const idUpdate = getId();

    // edit item
    if (props.mode === 'edit') {
      console.log('edit');
      firestore()
        .collection('Items')
        .doc('' + currenItem.id)
        .update({
          name: name,
          // value: valueItem,
          color: colorItem,
          icon: iconItem,
        })
        .then(() => {
          console.log('User updated!');
          dispatch(
            updateNameColorIconItem({
              idItem: currenItem.id,
              name: name,
              color: colorItem,
              icon: iconItem,
            }),
          );
          // navigation.navigate('TrangChu');
        });
    }

    // add item
    else {
      firestore()
        .collection('Items')
        .doc('' + timeID)
        .set({
          // value: valueItem,
          value: 0,
          name: name,
          color: colorItem,
          icon: iconItem,
          // time: time,
          id: timeID,
          type: type,
          user: userName,
        })
        .then(() => {
          console.log('item added!');
          dispatch(
            addItem({
              name: name,
              // value: valueItem,
              value: 0,
              color: colorItem,
              icon: iconItem,
              // time: time,
              id: timeID,
              type: type,
              user: userName,
            }),
          );
          props.refRBSheet.current.close();
        });
    }
  };
  const [value, setValue] = useState('Chi phí');
  const [isFocus, setIsFocus] = useState(false);
  const [type, setType] = useState('chi');
  const data = [
    {label: 'Thu nhập', value: 'thu'},
    {label: 'Chi phí', value: 'chi'},
  ];
  const changeType = item => {
    // console.log('type', item);
    setValue(item.value);
    setIsFocus(false);
    setType(item.value);
  };
  // console.log('type', type);
  return (
    <SafeAreaView className="flex-1">
      <View style={{backgroundColor: currenItem.color}} className="p-2">
        <View className="flex flex-row px-2 py-2 items-center mb-4">
          {/* <View className="mr-4">
            <Icon name="close" size={28} color="white" />
          </View> */}
          <Text className="text-xl font-bold text-white">
            {props.mode === 'edit' ? currenItem.name : 'Danh mục mới'}
          </Text>
          <TouchableOpacity onPress={handleAddItem} className="ml-auto">
            <Icon name="check" size={28} color="white" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="mx-2 mb-4"
          // value={name}
          value={props.mode === 'edit' ? currenItem.name : name}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: 16,
            position: 'absolute',
            top: -10,
            backgroundColor: currenItem.color,
            paddingHorizontal: 4,
            marginLeft: -4,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Tên"
          placeholder="Nhập tên"
          placeholderTextColor="gray"
          focusColor="white"
          onChangeText={text => {
            setName(text);
          }}
        />
      </View>
      <View className="mb-2 p-6 flex justify-between flex-row border-b-[1px] border-gray-600">
        <Text
          style={{color: currenItem.color}}
          className="text-lg font-bold text-orange-500">
          Màu sắc
        </Text>
        <TouchableOpacity
          style={{backgroundColor: currenItem.color}}
          onPress={openModalColor}
          className="bg-green-600 w-8 h-8 rounded-full"
        />
      </View>
      <View className="border-b-[1px] border-gray-600 mb-4 p-6 flex justify-between flex-row">
        <Text
          style={{color: currenItem.color}}
          className="text-lg font-bold text-orange-500">
          Biểu tượng
        </Text>
        <TouchableOpacity
          className="rounded-full p-1 border-2"
          style={{borderColor: currenItem.color}}
          onPress={openModalIcon}>
          <Icon name={currenItem.icon} size={28} color={currenItem.color} />
        </TouchableOpacity>
      </View>
      <View className="mb-4 p-6 flex justify-between flex-row items-center">
        <Text
          style={{color: currenItem.color}}
          className="text-lg font-bold text-orange-500">
          Loại thu chi
        </Text>
        {props.mode === 'edit' ? (
          <Text style={{color: currenItem.color}} className="text-lg font-bold">
            {currenItem.type === 'thu' ? 'Thu nhập' : 'Chi phí'}
          </Text>
        ) : (
          <Dropdown
            style={[
              styles.dropdown,
              {borderColor: currenItem.color},
              isFocus && {borderColor: currenItem.color},
            ]}
            placeholderStyle={{fontSize: 16, color: currenItem.color}}
            selectedTextStyle={{fontSize: 16, color: currenItem.color}}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Chi phí' : '...'}
            // searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              // setValue(item.value);
              // setIsFocus(false);
              changeType(item);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        )}
      </View>
      {modeModalColor === true ? (
        <ModalColor
          navigation={navigation}
          mode={modeModalColor}
          setMode={setModeModalColor}
        />
      ) : (
        <></>
      )}
      {modeModalIcon === true ? (
        <ModalIcon mode={modeModalIcon} setMode={setModeModalIcon} />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default AddItemHome;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 55,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: 'white',

    // borderBottomWidth: 1,
  },
  inputStyle: {fontSize: 18, color: 'white'},
  labelStyle: {
    fontSize: 16,
    position: 'absolute',
    top: -10,
    // backgroundColor: '#f97316',
    paddingHorizontal: 4,
    marginLeft: -4,
    color: 'white',
  },
  placeholderStyle: {fontSize: 18, color: 'white'},
  textErrorStyle: {fontSize: 18},

  dropdown: {
    height: 40,
    width: 130,
    // borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle2: {
    fontSize: 16,
    color: 'red',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'red',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
