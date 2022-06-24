/*
 * @lc app=leetcode.cn id=611 lang=javascript
 *
 * [611] 有效三角形的个数
 *
 * https://leetcode-cn.com/problems/valid-triangle-number/description/
 *
 * algorithms
 * Medium (53.27%)
 * Likes:    402
 * Dislikes: 0
 * Total Accepted:    69.4K
 * Total Submissions: 129.4K
 * Testcase Example:  '[2,2,3,4]'
 *
 * 给定一个包含非负整数的数组 nums ，返回其中可以组成三角形三条边的三元组个数。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入: nums = [2,2,3,4]
 * 输出: 3
 * 解释:有效的组合是: 
 * 2,3,4 (使用第一个 2)
 * 2,3,4 (使用第二个 2)
 * 2,2,3
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: nums = [4,2,3,4]
 * 输出: 4
 * 
 * 
 * 
 * 提示:
 * 
 * 
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] <= 1000
 * 
 * 
 */

// @lc code=start
/**
 * 有效的三角形组合是：两短边之和大于第三边
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
  // 思路：
  // 1. 将数组从小到大排序
  // 2. 判断两短边相加是否大于第三边
  let count = 0;
  let len = nums.length;

  if(!nums || len < 3) return 0;
  
  // 1. 数组升序
  nums.sort((a, b) => a - b);

  // 循环判断数据是否能够组成三角形
  for(let i = len - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;

    while(left < right) {
      if(nums[left] + nums[right] > nums[i]) {
        // 左边 left 的值和 右边 right 的值已经能组合成三角形了
        // 则 right - left 之间的所有数据都能在当前条件下组成数组
        // right - left 之间的数据直接相加即可，右边指针移动一位
        count += (right - left);
        right--;
      } else {
        // 两数相加小于第三边，则小边（left指针） 向较大的数移动，即右移一位
        left++;
      }
    }
  }

  return count;
};
// @lc code=end

