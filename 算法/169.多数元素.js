/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 *
 * https://leetcode.cn/problems/majority-element/description/
 *
 * algorithms
 * Easy (66.80%)
 * Likes:    1465
 * Dislikes: 0
 * Total Accepted:    538.1K
 * Total Submissions: 805K
 * Testcase Example:  '[3,2,3]'
 *
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：nums = [3,2,3]
 * 输出：3
 * 
 * 示例 2：
 * 
 * 
 * 输入：nums = [2,2,1,1,1,2,2]
 * 输出：2
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == nums.length
 * 1 <= n <= 5 * 10^4
 * -10^9 <= nums[i] <= 10^9
 * 
 * 
 * 
 * 
 * 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  // 注意：数组中出现次数最多的元素多余数组的一半，其余的元素肯定少于一半
  // 方法一： 时间复杂度 O(n)，空间复杂度 O(n)
  // 通过 map 进行每个数据的个数存储，当 map 某个数据的个数多余数组的长度一半时，则该数字为最多的
  // let obj = {};
  // for(let i = 0; i < nums.length; i++) {
  //   const curNum = nums[i];
  //   if(!obj[curNum]) {
  //     obj[curNum] = 1;
  //   } else {
  //     obj[curNum] += 1;
  //   }

  //   if (obj[curNum] > nums.length / 2) return curNum;
  // }
  // // 用 for of 简写
  // // for (let num of nums) {
  // //   obj[num] = (obj[num] || 0) + 1;
  // //   if (obj[num] > nums.length / 2) return num;
  // // }
  // return null;

  // 方法二：抵消操作
  // 时间复杂度 O(n)，空间负责度 O(1)
  let count = 0;
  let majority = null;
  for(let i = 0; i < nums.length; i++) {
    // 当计数为 0 时，将当前数据赋值给多数元素变量
    if (count === 0) {
      majority = nums[i];
    }

    // 当多数元素等于当前数组值，则总数 +1，否则总数 -1
    // 这个 +1 和 -1 的操作相当于把多数元素和其他元素进行抵消操作，
    // 当其他元素和多数元素抵消后 count 总会有等于 0 的时候，直到其他元素全部被抵消完
    // 最后剩下的所有操作都是多数元素的
    if (majority === nums[i]) {
      count++;
    } else {
      count--;
    }
  }
  return majority;
};
// @lc code=end

