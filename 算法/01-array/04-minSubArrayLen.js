/**
 * 题目：
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度；
 * 如果不存在符合条件的子数组，返回 0。
 * 
 * 示例1：
 * 输入：s = 7, nums = [2, 3, 1, 2, 4, 3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组，则返回长度 2
 */

/**
 * 暴力法
 * 两个循环，逐个对数据进行相加然后比较，最终返回 j - i + 1 这个长度的最小值
 * 
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
function minSubArrayLen(nums, target) {
  if (!nums || nums.length === 0 || typeof target !== 'number') {
    return 0;
  }

  const numsLen = nums.length;
  let sums = 0;
  let minArrLen = numsLen;

  for (let i = 0; i < numsLen; i++) {
    sums = 0;
    // 外层循环每次开始前清空累加值
    // 内层循环从当前位置进行累加，然后判断累加的值 >= target 时的 i, j 位置并比较出最小值
    for(let j = i; j < numsLen; j++) {
      sums += nums[j];
      if (sums >= target) {
        minArrLen = minArrLen < (j - i + 1) ? minArrLen : (j - i + 1);
        break;
      }
    }
  }
  return minArrLen;
}

/**
 * 滑动窗口(双指针)
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function minSubArrayLen2(nums, target) {
  if (!nums || nums.length === 0 || typeof target !== 'number') {
    return 0;
  }

  const numsLen = nums.length;
  let leftIndex = 0;
  let sum = 0;
  let minArrLen = numsLen;
  for(rightIndex = 0; rightIndex < numsLen; rightIndex++) {
    sum += nums[rightIndex];
    
    // 当前 rightIndex 的值相加后和 target 的对比；
    // 没超过，rightIndex 在 for 循环上继续自增；
    // 已超过，优先判断一下相加的个数值中的最小数，然后相加的总数减去左侧 leftIndex 对应的值，
    // 然后 leftIndex 向右移动一位；然后 for 循环的 rightIndex 自增并继续和 sum 相加并判断 target 的值；
    while(sum >= target) {
      minArrLen = minArrLen < (rightIndex - leftIndex + 1) ? minArrLen : (rightIndex - leftIndex + 1);
      // 左边的位置 leftIndex 向右移动一位，且总数 sum 减去移动前的数值
      sum -= nums[leftIndex];
      leftIndex++;
    }
  }
  return minArrLen;
}

const target = 7;
const nums = [2, 3, 1, 2, 4, 3];
console.log(minSubArrayLen2(nums, target));