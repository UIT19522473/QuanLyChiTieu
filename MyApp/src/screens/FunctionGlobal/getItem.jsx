export const getNameItem = (idItem, allData) => {
  // allData.arrItem.map(item => {
  //     if(idItem === item)
  // })

  return allData.arrItem.find(item => item.id === idItem).name;
  //   return;
};
