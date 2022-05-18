export const chunk = (arr: any) => {
  console.log("arr in chiunk", arr);

  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  console.log("newArr", newArr);

  return newArr;
};
