import {useSelector, useDispatch} from 'react-redux';
import {addItem} from '../../redux/slice/itemHomeSlice/itemHomeSlice';
import firestore from '@react-native-firebase/firestore';

export const GetItemFB = userName => {
  const dispatch = useDispatch();
  dispatch(clearItem());
  firestore()
    .collection('Items')
    // Filter results
    // .where('time', '==', time)
    .where('user', '==', userName)
    .get()
    .then(querySnapshot => {
      // console.log('data items: ', querySnapshot._docs.data());

      querySnapshot.forEach(documentSnapshot => {
        console.log('function', documentSnapshot.data().id);
        dispatch(
          addItem({
            id: documentSnapshot.data().id,
            color: documentSnapshot.data().color,
            name: documentSnapshot.data().name,
            icon: documentSnapshot.data().icon,
            //time: documentSnapshot.data().time,
            value: documentSnapshot.data().value,
            type: documentSnapshot.data().type,
            user: documentSnapshot.data().user,
          }),
        );
      });
    });
  return <></>;
  //console.log(userName);
};
