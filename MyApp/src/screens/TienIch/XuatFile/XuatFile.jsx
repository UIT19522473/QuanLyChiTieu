import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';

import {useState} from 'react';
import DateTimePicker1 from '@react-native-community/datetimepicker';
import DateTimePicker2 from '@react-native-community/datetimepicker';

import {
  writeFile,
  readFile,
  DownloadDirectoryPath,
  ExternalStorageDirectoryPath,
} from 'react-native-fs';
import XLSX from 'xlsx';

import * as getNameItem from '../../FunctionGlobal/getItem';

const XuatFile = ({navigation}) => {
  const dataAll = useSelector(State => State.dataAll);
  const auth = useSelector(State => State.auth);

  const [text, setText] = useState(
    // '',
    'Empty',
  );

  const [text2, setText2] = useState(
    // '',
    'Empty',
  );

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);

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

  const exportDataToExcel = () => {
    console.log('xuat excel');

    let data = [];
    let stt = 1;
    dataAll.arrTrans.map(trans => {
      const timeTrans = trans.time.split('/');
      const timeStart = text.split('/');
      const timeEnd = text2.split('/');

      const timeTr = new Date(
        parseInt(timeTrans[2]),
        parseInt(timeTrans[1]) - 1,
        parseInt(timeTrans[0]),
      );
      const timeSt = new Date(
        parseInt(timeStart[2]),
        parseInt(timeStart[1]) - 1,
        parseInt(timeStart[0]),
      );
      const timeEd = new Date(
        parseInt(timeEnd[2]),
        parseInt(timeEnd[1]) - 1,
        parseInt(timeEnd[0]),
      );
      if (timeTr >= timeSt && timeTr <= timeEd) {
        data.push({
          STT: stt,
          Ngày: trans.time,
          Tiền_Thu: trans.type === 'thu' ? trans.value : 0,
          Tiền_Chi: trans.type === 'chi' ? trans.value : 0,
          Danh_Mục: getNameItem.getNameItem(trans.idItem, dataAll),
          Loại_Thu_Chi: trans.type,
          Ghi_Chú: trans.note,
        });
        stt++;
      }
    });

    // var data = [
    //   {
    //     STT: '1',
    //     Ngày: '12/2/2023',
    //     Tiền_Thu: 2000,
    //     Tiền_Chi: 5000,
    //     Danh_Mục: 'demo',
    //     Loại_Thu_Chi: 'đi chợ',
    //     Ghi_Chú: 'demo thoi nhe',
    //   },
    //   {
    //     STT: '1',
    //     Ngày: '12/2/2023',
    //     Tiền_Thu: 2000,
    //     Tiền_Chi: 5000,
    //     Danh_Mục: 'demo',
    //     Loại_Thu_Chi: 'đi chợ',
    //     Ghi_Chú: 'demo thoi nhe',
    //   },

    //   // {name: 'Ngày', city: 'Los Angeles'},
    //   // {name: 'Tiền thu', city: 'New York'},
    //   // {name: 'Tiền chi', city: 'New York'},
    //   // {name: 'Danh mục', city: 'New York'},
    //   // {name: 'Loại thu chi', city: 'New York'},
    //   // {name: 'Ghi chú', city: 'New York'},
    // ];

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

    // var file = RNFS.ExternalStorageDirectoryPath + '/test.xlsx';

    // writeFile(DownloadDirectoryPath + '/sample.csv', wbout, 'ascii')
    //   .then(r => {
    //     alert(DownloadDirectoryPath + '/ajootec.csv');
    //   })
    //   .catch(e => {
    //     alert(e);
    //   });

    writeFile(
      ExternalStorageDirectoryPath + '/BaoCaoThuChi.csv',
      wbout,
      'ascii',
    )
      .then(r => {
        alert(ExternalStorageDirectoryPath + '/aoCaoThuChi.csv');
      })
      .catch(e => {
        alert(e);
      });
  };

  return (
    <View className="flex-1">
      <View className="flex-row items-center bg-primary p-2 py-4">
        <TouchableOpacity onPress={() => navigation.navigate('TienIchHome')}>
          <Icon name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-[85%] items-center">
          <Text className="text-gray-50 font-bold text-2xl">Xuất file</Text>
        </View>
      </View>

      {/* <Text className="border-b-2">{auth.userName}</Text>
      <View className="border-b-2">
        {dataAll.arrItem.map(item => (
          <Text>{item.name}</Text>
        ))}
      </View>

      <View className="">
        {dataAll.arrTrans.map(trans => (
          <Text>{trans.id}</Text>
        ))}
      </View> */}

      <TouchableOpacity
        onPress={showMode}
        className="flex-row items-center mx-6 mt-12">
        <Icon name="insert-invitation" size={42} color="green" />
        <View className="ml-4">
          <Text className="text-lg">Ngày bắt đầu</Text>
          <Text className="text-2xl font-bold text-green-600">
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
        className="flex-row items-center mx-6 my-4 mt-4">
        <Icon name="insert-invitation" size={42} color="red" />
        <View className="ml-4">
          <Text className="text-lg">Ngày Kết thúc</Text>
          <Text className="text-2xl font-bold text-red-500">
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

      <TouchableOpacity
        className="w-full p-4 bg-primary justify-center items-center mt-4"
        onPress={() => exportDataToExcel()}>
        <View className="flex-row justify-center items-center">
          <Icon name="file-download" size={26} color="white" />
          <Text className="text-xl font-bold text-slate-200 ml-4">
            Xuất file Excel
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default XuatFile;
