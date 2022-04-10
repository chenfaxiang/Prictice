/*
 * 有序数组的平方
 *
 * 给一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序(返回一个升序即可) 排序。
 * 
 * 示例1：
 * 输入：nums = [-4, -1, 0, 3, 10]
 * 输出：[0, 1, 9, 16, 100]
 * 解释：平方后，数组变为 [16, 1, 0, 9, 100]，排序后，数组变为 [0, 1, 9, 16, 100]
 * 
 * 示例2：
 * 输入：nums = [-7, -3, 2, 3, 11]
 * 输出：[4, 9, 9, 49, 121]
 */

/**
 * 暴力法
 * 先将数组平方，然后 sort 排序
 * 
 * 时间复杂度：sort在google chrome上用的快速排序，则 O(nlogn)，及在该浏览器为 O(n + nlogn)；则该时间复杂度为 O(nlogn)
 * 空间复杂度：O(1)
 */
function sortedSquares(arr) {
  if (!arr || arr.length === 0) {
    return []
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] *= arr[i];
  }

  return arr.sort((a, b) => a - b);
}

/**
 * 双指针法
 * 由于数组平方后，最大的数只会在左边和右边，不可能在中间，于是可以从数组的左边和右边两个数的平方后进行比较
 * 利用双指针(数组下标)在比较后，将大数的结果值存放在新数组的最后面即可
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function sortedSquares2(arr) {
  if(!arr || arr.length === 0) {
    return [];
  }

  const arrLen = arr.length;
  const result = new Array(arrLen).fill(0);
  // 第一次，用于保存数组的最大值 [0, length - 1]
  let k = arrLen - 1;
  for (let left = 0, right = arrLen - 1; left <= right;) {
    let leftSquare = arr[left] * arr[left];
    let rightSquare = arr[right] * arr[right];
    if (leftSquare <= rightSquare) {
      // 最右边的值大于等于最左边，视最右边的值为最大，将最右边的值利用第三个参数 k 在新数组的第 k 位保存最右边的最大值
      result[k] = rightSquare;
      right--;
    } else {
      // 最右边的值小于等于最左边，视最左边的值为最大，将最左边的值利用第三个参数 k 在新数组的第 k 位保存最左边的最大值
      result[k] = leftSquare;
      left++;
    }
    
    // k 默认是数组的最后一位，在最后一位保存完值时像左移动一位，下一次的数据保存在 k - 1 的位置上
    k--;
  }

  return result;
}

const nums = [-4, -1, 0, 3, 10];
console.log(sortedSquares2(nums));