export const GET_DATA_FIREBASE = 'GET_DATA_FIREBASE';
export const PUSH_DATA_FIREBASE = 'PUSH_DATA_FIREBASE';
// const initialState = {
//   arr: [],
// };

const initialState = {
  name: '',
  age: '',
  sex: '',
  old: '',
};

export default function GetDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FIREBASE:
      return {
        ...state,
        // arr: [...state.arr, payload.newItem],
        name: action.payload.name,
        age: action.payload.age,
        sex: action.payload.sex,
        old: action.payload.old,
      };
    case PUSH_DATA_FIREBASE:
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
}
