import {CAP_NHAT_EMAIL} from '../reducers/infoReducer';
export const updateEmail = email => async dispatch => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    await console.log('da cap nhat thong tin tu sv');
    dispatch({
      type: CAP_NHAT_EMAIL,
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};
