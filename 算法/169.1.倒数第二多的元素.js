/**
 * 从一个整型数组中找出第二多的元素及其个数
 */

function findSecond(arr) {
  const temp = [];
  arr.sort((a, b) => a - b);
  temp[0] = {num: arr[0], count: 1};
  for(let i = 1; i < arr.length; i++) {
    const curNum = arr[i];
    if (curNum === arr[i - 1]) {
      temp[temp.length - 1].count += 1;
    } else {
      temp.push({num: curNum, count: 1})
    }
  }

  temp.sort((a, b) => b.count - a.count);
  const [maxObj, secondObj] = temp

  return {
    maxCount: maxObj,
    secondCount: secondObj
  }
}

const testArr = [5,5,3,2,5,3,3,1,4,3,2];
console.log(findSecond(testArr));