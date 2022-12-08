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

const AddItemHome = () => {
  const [value, setValue] = useState('');
  const [modeModalColor, setModeModalColor] = useState(false);
  const openModalColor = () => {
    setModeModalColor(true);
    console.log('open modal color', modeModalColor);
  };

  const [modeModalIcon, setModeModalIcon] = useState(false);
  const openModalIcon = () => {
    setModeModalIcon(true);
    console.log('open modal icon', modeModalColor);
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-orange-500  p-2">
        <View className="flex flex-row px-2 py-2 items-center mb-4">
          {/* <View className="mr-4">
            <Icon name="close" size={28} color="white" />
          </View> */}
          <Text className="text-xl font-bold text-white">Danh mục mới</Text>
          <View className="ml-auto">
            <Icon name="check" size={28} color="white" />
          </View>
        </View>
        <TextInput
          className="mx-2 mb-4"
          value={value}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Tên"
          placeholder="Nhập tên"
          placeholderTextColor="gray"
          focusColor="white"
          onChangeText={text => {
            setValue(text);
          }}
        />
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
        className="mb-2 p-6 flex justify-between flex-row">
        <Text className="text-lg font-bold text-orange-500">Màu sắc</Text>
        <TouchableOpacity
          onPress={openModalColor}
          className="bg-green-600 w-8 h-8 rounded-full"
        />
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
        className="mb-4 p-6 flex justify-between flex-row">
        <Text className="text-lg font-bold text-orange-500">Biểu tượng</Text>
        <TouchableOpacity onPress={openModalIcon}>
          <Icon name="edit" size={28} color="#f97316" />
        </TouchableOpacity>
      </View>
      {modeModalColor === true ? (
        <ModalColor mode={modeModalColor} setMode={setModeModalColor} />
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
    // borderBottomWidth: 1,
  },
  inputStyle: {fontSize: 18, color: 'white'},
  labelStyle: {
    fontSize: 16,
    position: 'absolute',
    top: -10,
    backgroundColor: '#f97316',
    paddingHorizontal: 4,
    marginLeft: -4,
  },
  placeholderStyle: {fontSize: 18},
  textErrorStyle: {fontSize: 18},
});
