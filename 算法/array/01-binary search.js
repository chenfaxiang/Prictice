/**
 * 二分查找
 * 题目：给定一个有 n 个元素(升序)的整型数组 nums 和一个目标值 target，
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
 * 
 * 示例 1：
 * 输入： nums = [-1, 0, 3, 5, 9, 12], target = 9
 * 输出： 4
 * 解释： 9 出现在数组 nums 中并且下标是 4
 * 
 * 实例 2：
 * 输入： nums = [-1, 0, 3, 5, 9, 12], target = 2
 * 输出： -1
 * 解释： 2 没有出现在数组 nums 中，则返回 -1
 * 
 * 考虑查询区间的开闭性，分为两种方法
 * 
 * 1. [x, y] 左闭右闭区间
 * 2. [x, y) 左闭右开区间
 */

/**
 * 1. [x, y]
 */
function binarySearch(nums, target) {
  const numsLen = nums.length;
  if (numsLen === 0) {
    return -1;
  }

  let left = 0;
  // 当前 target 的查找区间是 左闭右闭，即 [x, y] 的形式
  let right = numsLen - 1;
  
  // 由于左右闭([x, y])区间，当 left == right，区间 [left, right] 依然有效，所以用 <=
  while (left <= right) {
    let middleIndex = Math.floor(left + (right - left) / 2);
    if (nums[middleIndex] < target) {
      // target 在居中位右侧，即查询区间从当前 middle 右一位开始到结束
      left = middleIndex + 1;
    } else if (nums[middleIndex] > target) {
      // target 在居中位左侧，即查询区间从开始到当前 middle 做一位结束
      right = middleIndex - 1;
    } else {
      return middleIndex;
    }
  }

  return -1;
}

const arr = [-1, 0, 3, 5, 9, 12];
const target = 0;
console.log(binarySearch(arr, target));

/**
 * 2. [x, y)
 */
function binarySearch2(nums, target) {
  const numsLen = nums.length;
  if (numsLen === 0) {
    return -1;
  }

  let left = 0;
  let right = numsLen;
  
  // 由于区间是左闭右开([x, y)，x === y 没有任何意义，所以不用相等判断
  while (left < right) {
    let middleIndex = Math.floor(left + (right - left) / 2);
    if (nums[middleIndex] < target) {
      // target 比居中的值大，在右区间找，即 left 的值需要从当前 middle 的右一位开始，[middleIndex + 1, right)
      left  = middleIndex + 1;
    } else if (nums[middleIndex] > target) {
      // target 比居中的值小，在左区间找，即 right 的值可以直接等于 middle 的值，而 right 不用赋值 middleIndex - 1
      // 1. 循环没有相等判断
      // 2. 左闭右开区间的基础上，right 此时的值不会被真正计算
      right = middleIndex;
    } else {
      return middleIndex;
    }
  }
  
  return -1;
}