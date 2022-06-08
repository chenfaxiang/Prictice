/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 *
 * https://leetcode.cn/problems/fibonacci-number/description/
 *
 * algorithms
 * Easy (66.63%)
 * Likes:    470
 * Dislikes: 0
 * Total Accepted:    398.2K
 * Total Submissions: 597.6K
 * Testcase Example:  '2'
 *
 * 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * 
 * 
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 
 * 
 * 给定 n ，请计算 F(n) 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：n = 4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 <= n <= 30
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  // 方法一，递归
  // F(0) = 0，F(1) = 1
  // if (n === 0 || n === 1) {
  //   return n;
  // }
  // F(n)
  // return fib(n - 1) + fib(n - 2)

  // 方法二，递推，利用缓存的概念进行操作
  const cache = [];
  for (let i = 0; i <= n; i++) {
    // F(0) = 0，F(1) = 1
    if(i === 0 || i === 1) {
      cache[i] = i;
    } else {
      // F(n)
      cache[i] = cache[i - 1] + cache[i - 2];
    }
  }
  return cache[n];
};
// @lc code=end

