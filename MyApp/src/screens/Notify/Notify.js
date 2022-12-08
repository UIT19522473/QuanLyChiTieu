import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
const NotifyItem = ({title, des}) => {
  return (
    <View
      style={{
        backgroundColor: getBgNotify(title),
        borderColor: getBorderNotify(title),
      }}
      className="my-2 w-full h-20 flex flex-row items-center bg-green-100 border-l-8 border-green-700 p-2">
      {/* <View className="w-2 bg-red-400 h-full" /> */}
      <View className="mx-2">{<NotifyIcon title={title} />}</View>
      <View className="flex-1 ml-2">
        <Text className="text-xl font-bold">{title}</Text>
        <Text className="text-base break-words pr-4">
          Bạn đã vượt quá hạn mức tháng này rồi, hãy kiểm tra hạn mức
        </Text>
      </View>
    </View>
  );
};
const getBgNotify = title => {
  if (title === 'success') {
    return '#dcfce7';
  } else if (title === 'error') {
    return '#fce3dc';
  }
  if (title === 'warning') {
    return '#fcf8dc';
  }
  if (title === 'info') {
    return '#dce9fc';
  }
};
const getBorderNotify = title => {
  if (title === 'success') {
    return 'green';
  } else if (title === 'error') {
    return 'red';
  }
  if (title === 'warning') {
    return 'yellow';
  }
  if (title === 'info') {
    return 'blue';
  }
};

const NotifyIcon = ({title}) => {
  if (title === 'success') {
    return (
      <View className="p-2 rounded-full bg-green-600">
        <Icon name="done" size={28} color="white" />
      </View>
    );
  } else if (title === 'error') {
    return (
      <View className="p-2 rounded-full bg-red-600">
        <Icon name="close" size={28} color="white" />
      </View>
    );
  }
  if (title === 'warning') {
    return (
      <View className="p-2 rounded-full bg-yellow-600">
        <Icon name="warning" size={28} color="white" />
      </View>
    );
  }
  if (title === 'info') {
    return (
      <View className="p-2 rounded-full bg-blue-600">
        <Icon name="info" size={28} color="white" />
      </View>
    );
  }
};

const Notify = () => {
  return (
    <View>
      <NotifyItem title={'success'} />
      <NotifyItem title={'error'} />
      <NotifyItem title={'warning'} />
      <NotifyItem title={'info'} />
    </View>
  );
};

export default Notify;
