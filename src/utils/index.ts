export const chunk = (arr: any) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};
