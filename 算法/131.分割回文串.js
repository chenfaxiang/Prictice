/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 *
 * https://leetcode.cn/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (72.97%)
 * Likes:    1167
 * Dislikes: 0
 * Total Accepted:    204K
 * Total Submissions: 279.5K
 * Testcase Example:  '"aab"'
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
 * 
 * 回文串 是正着读和反着读都一样的字符串。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：s = "a"
 * 输出：[["a"]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * s 仅由小写英文字母组成
 * 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const res = [];
  const path = [];
  backTracking(s, 0);
  return res;

  /**
   * 回文字符串判断，用两个指针
   * 左边的数据和右边的数据进行比较即可
   * @param {*} str 待判断的字符串
   * @param {*} l 左边的起始位置
   * @param {*} r 右边的结束位置
   * @returns
   */
  function isPalindrome(str, l, r) {
    for(let i = l, j = r; i < j; i++, j--) {
      if (str[i] !== str[j]) return false;
    }
    return true;
  }

  // 回溯
  function backTracking(s, startIndex) { // 1. 确定参数
    if (startIndex === s.length) { // 2. 确定终止条件
      // res.push(Array.from(path));
      res.push(path.slice());
      return;
    }
    // 3. 处理回溯逻辑
    for(let i = startIndex; i < s.length; i++) {
      if (isPalindrome(s, startIndex, i)) {
        // substr(待截取的起始位置, 截取的长度)
        const str = s.substr(startIndex, i - startIndex + 1);
        path.push(str);
      } else {
        continue;
      }
      // 递归
      backTracking(s, i + 1);
      // 回溯
      path.pop();
    }
  }
};
// @lc code=end

