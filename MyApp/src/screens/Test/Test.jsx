import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Test = () => {
  const handleSigin = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let listData = [];
      await firestore()
        .collection('Users')
        // Filter results
        .where('age', '>=', '23/12/2020')
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.size);

          querySnapshot.forEach(documentSnapshot => {
            const temp = {
              age: documentSnapshot.data().age,
              name: documentSnapshot.data().name,
            };
            listData.push(temp);
            console.log(
              'User ID: ',
              documentSnapshot.id,
              documentSnapshot.data(),
            );
          });
        });
      setData(listData);
    };
    getData();
  }, []);
  return (
    <View>
      <Text>Tessss</Text>
      <TouchableOpacity onPress={handleSigin}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
