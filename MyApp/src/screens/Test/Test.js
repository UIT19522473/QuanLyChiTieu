import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Item = props => {
  const {name, age} = props;

  return (
    <View className="bg-blue-900 mx-12 rounded-sm">
      <Text className="text-amber-400 ml-3 mt-10 rounded-sm">{name}</Text>
      <Text style={{color: 'red'}}>{age}</Text>
    </View>
  );
};

const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let listData = [];
      // await firestore()
      //   .collection('Users')
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total users: ', querySnapshot.size);

      //     querySnapshot.forEach(documentSnapshot => {
      //       const temp = {
      //         age: documentSnapshot.data().age,
      //         name: documentSnapshot.data().name,
      //       };
      //       listData.push(temp);
      //       console.log(
      //         'User ID: ',
      //         documentSnapshot.id,
      //         documentSnapshot.data(),
      //       );
      //     });
      //   });

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
      {data.map((item, key) => (
        <Item age={item.age} name={item.name} />
      ))}
    </View>
  );
};

export default Test;
