/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 *
 * https://leetcode.cn/problems/maximum-product-subarray/description/
 *
 * algorithms
 * Medium (42.64%)
 * Likes:    1694
 * Dislikes: 0
 * Total Accepted:    275.4K
 * Total Submissions: 644.7K
 * Testcase Example:  '[2,3,-2,4]'
 *
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 
 * 测试用例的答案是一个 32-位 整数。
 * 
 * 子数组 是数组的连续子序列。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= nums.length <= 2 * 10^4
 * -10 <= nums[i] <= 10
 * nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let maxNum = -Infinity;
  let curMax = 1;
  let curMin = 1;
  for(let i = 0; i < nums.length; i++) {
    if (nums[i] < 0) {
      // 当前数字小于 0 时，在进行乘积后会导致越大的数字越小、越小的数字越大，因此需要交换最大最小值
      const temp = curMax;
      curMax = curMin;
      curMin = temp;
    }
    curMax = Math.max(curMax * nums[i], nums[i]);
    curMin = Math.min(curMin * nums[i], nums[i]);

    maxNum = Math.max(curMax, maxNum);
  }
  return maxNum;
};
// @lc code=end

