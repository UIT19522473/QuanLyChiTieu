import {GET_DATA_FIREBASE} from '../reducers/testReducer';
import firestore from '@react-native-firebase/firestore';

// export const getDataFirebase = async () => {
//   try {
//     const data = {age: '', name: '', sex: '', old: 'sss'};
//     await new Promise((resolve, reject) => {
//       resolve(
//         firestore()
//           .collection('test')
//           .get()
//           .then(querySnapshot => {
//             querySnapshot.forEach(documentSnapshot => {
//               (data.age = documentSnapshot.data().age),
//                 (data.name = documentSnapshot.data().name),
//                 (data.sex = documentSnapshot.data().sex),
//                 (data.old = documentSnapshot.data().old);
//             });
//           }),
//       );
//     });
//     console.log('ssssss', data);
//     return {
//       type: GET_DATA_FIREBASE,
//       payload: {
//         name: 'hehe',
//         age: data.age,
//         sex: data.sex,
//         old: data.old,
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getDataFirebase = async () => {
//   const data = {age: '', name: '', sex: '', old: ''};
//   await firestore()
//     .collection('test')
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach(documentSnapshot => {
//         (data.age = documentSnapshot.data().age),
//           (data.name = documentSnapshot.data().name),
//           (data.sex = documentSnapshot.data().sex),
//           (data.old = documentSnapshot.data().old);
//         // console.log(
//         //   'User ID: ',
//         //   documentSnapshot.id,
//         //   documentSnapshot.data().age,

//         // );
//       });
//     });
//   console.log('ssssss', data);
//   return {
//     type: GET_DATA_FIREBASE,
//     payload: {
//       name: 'tuanNguyen',
//       age: data.age,
//       sex: data.sex,
//       old: data.old,
//     },
//   };
// };

export const getDataFirebase = data => {
  return {
    type: GET_DATA_FIREBASE,
    payload: {
      name: 'tuanNguyen',
      age: data.age,
      sex: data.sex,
      old: data.old,
    },
  };
};
