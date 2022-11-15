import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateEmail} from '../../redux/actions/updateActions';

export default function Home({navigation}) {
  const info = useSelector(state => state.personalInfo);
  const [text, onChangeText] = useState('');

  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(info);
  // }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={{width: 200, height: 50, borderWidth: 1}}
      />
      <TouchableOpacity
        onPress={() => dispatch(updateEmail(text))}
        style={{
          width: 100,
          height: 50,
          margin: 20,
          alignItems: 'center',
          backgroundColor: 'green',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>Cập Nhật</Text>
      </TouchableOpacity>
      <Text>{info.email}</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('DetailScreen')}
      />
    </View>
  );
}
