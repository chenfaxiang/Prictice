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
 * 时间复杂度分析
 * 
 * 总共有 n 个元素，每次查找的区间大小就是n, n/2, n/4, ..., n/2^k（接下来操作元素的剩余个数），
 * 其中 k 就是循环的次数，由于 n/2^k 取整后 >= 1，即令 n/2^k = 1；
 * n/2^k = 1 => n = 2^k => k = log2n(log 以2为底，n 的对数)，因此时间复杂度为 logn
 */

/**
 * 1. [x, y] 左闭右闭区间
 * 
 * 时间复杂度：O(logn)
 * 空间复杂度：O(1)
 */
function binarySearch(nums, target) {
  if (!nums || nums.length === 0 || (target !== 0 && !target)) {
    return -1;
  }
  const numsLen = nums.length;

  let left = 0;
  let right = numsLen;
  
  // [x, y] 的闭合区间，即 left === right 有意义，则需要考虑结束条件相等的情况
  while(left <= right) {
    let midIndex = left + Math.floor((right - left) / 2);
    if (nums[midIndex] < target) {
      // 当前居中的值比 target 小，需要在 右区间 继续查找，即更改 left 的查询起始位置即可
      // 当前居中的值肯定不等于 target，则 left 从 midIndex 右一位开始
      left = midIndex + 1;
    } else if (nums[midIndex] > target) {
      // 当前居中的值比 target 大，需要在 左区间 继续查找，即更改 right 的查询结束位置即可
      // 当前居中的值肯定不等于 target，则 right 从 midIndex 左一位开始
      right = midIndex - 1;
    } else {
      return midIndex;
    }
  }

  return -1;
}

const nums = [-1, 0, 3, 5, 9, 12];
const target = 5
console.log(binarySearch(nums, target));

/**
 * 2. [x, y) 左闭右开区间
 *
 * 时间复杂度：O(logn)
 * 空间复杂度：O(1)
 */
function binarySearch2(nums, target) {
  if (!nums || nums.length === 0 || (target !== 0 && !target)) {
    return -1;
  }
  const numsLen = nums.length;

  let left = 0;
  let right = numsLen;

  // [x, y) 左闭右开区间在比较 left === right 时由于 right 不包含在内，即此比较没有意义
  // 因此结束条件不需要进行相等判断
  while(left < right) {
    let midIndex = left + Math.floor((right - left) / 2);
    if (nums[midIndex] < target) {
      // 当前居中的值比 target 小，则需要在 右区间 去继续查找，因此 left 的起始位置从 midIndex + 1 开始
      left = midIndex + 1;
    } else if (nums[midIndex] > target) {
      // 当前居中的值比 target 大，则需要在 左区间去继续查找，因此 right 的结束位置从 midIndex 结束即可
      // 因为右边是开区间，不会进行结束条件的判断操作
      right = midIndex;
    } else {
      return midIndex;
    }
  }

  return -1;
}

const nums2 = [-1, 0, 3, 5, 9, 12];
const target2 = 12
console.log(binarySearch2(nums2, target2));