export const chunk = (arr: any) => {
  console.log("arr in chiunk", arr);

  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  console.log("newArr", newArr);

  return newArr;
};

export const formatAMPM = (date: any) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
