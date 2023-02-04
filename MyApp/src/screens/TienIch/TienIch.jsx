import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../../components/context';
import {useContext} from 'react';

import {writeFile, readFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';

import Currency from './Currency';

const TienIch = ({navigation}) => {
  const {signOutMain} = useContext(AuthContext);

  const exportDataToExcel = () => {
    console.log('xuat excel');
    var data = [
      {name: 'John', city: 'Seattle'},
      {name: 'Mike', city: 'Los Angeles'},
      {name: 'Zach', city: 'New York'},
    ];

    var ws = XLSX.utils.json_to_sheet(data);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');

    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    // var RNFS = require('react-native-fs');
    // var file = RNFS.ExternalStorageDirectoryPath + '/test.xlsx';
    // writeFile(file, wbout, 'ascii')
    //   .then(r => {
    //     alert('export thanh cong');
    //   })
    //   .catch(e => {
    //     alert('export that bai', e);
    //   });

    writeFile(DownloadDirectoryPath + '/sample.csv', wbout, 'ascii')
      .then(r => {
        alert(DownloadDirectoryPath + '/ajootec.csv');
      })
      .catch(e => {
        alert(e);
      });

    // XLSX.utils.book_append_sheet(wb, ws, 'demoExcel', true);

    // const base64 = XLSX.write(wb, {type: 'base64'});
    // const filename = FileSystem.documentDirectory + 'demoExcel.xlsx';
    // FileSystem.writeAsStringAsunc(filename, base64, {
    //   encoding: FileSystem.EncodingType.Base64,
    // }).then(() => {
    //   Sharing.shareAsync(filename);
    // });
  };
  return (
    <View className="flex-1">
      <View className="w-full justify-center items-center my-2 border-b-[0.7px] p-4 mb-8">
        <Text className="text-primary text-2xl font-bold">Tiện ích</Text>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate('HanMuc')}>
        <Text>Next</Text>
      </TouchableOpacity> */}

      <View className="flex-row justify-evenly">
        <TouchableOpacity
          onPress={() => navigation.navigate('HanMucChi')}
          className="w-[150px] h-[150px] border-[1px] rounded-3xl border-orange-500 justify-center items-center">
          <Icon size={46} name="payments" color="orange" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Hạn mức chi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => exportDataToExcel()}
          onPress={() => navigation.navigate('XuatFile')}
          className="w-[150px] h-[150px] border-[1px] rounded-3xl border-green-500 justify-center items-center">
          <Icon size={46} name="file-present" color="green" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Xuất file excel
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-evenly mt-6">
        <TouchableOpacity
          onPress={() => navigation.navigate('Todo')}
          className="w-[150px] h-[150px] border-[1px] rounded-3xl border-blue-500 justify-center items-center">
          <Icon size={46} name="done-all" color="blue" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Việc hôm nay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[150px] h-[150px] border-[1px] rounded-3xl border-red-500 justify-center items-center"
          onPress={() => navigation.navigate('Currency')}>
          <Icon size={46} name="search" color="red" />
          <Text className="mt-4 text-base font-semibold text-gray-500">
            Tra cứu tỷ giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Text>Xuat file</Text>
      <Text>To do</Text>
      <Text>Tra cuu ti gia</Text> */}

      <TouchableOpacity
        onPress={() => signOutMain()}
        className="mt-auto border-[1px] p-3 mx-4 mb-4 rounded-xl flex-row items-center border-stone-400">
        <Icon name="logout" size={28} color="red" />
        <Text className="ml-4 text-xl text-red-500 font-bold">Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TienIch;
