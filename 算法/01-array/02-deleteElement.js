/*
 * 移出元素
 * 题目：给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 $O(1)$ 额外空间并原地修改输入数组。
 * 元素的顺序可以改变。注意：不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例1：
 * 给定 nums = [3,2,2,3], val = 3
 * 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。 
 * 
 * 示例2：
 * 给定 nums = [0,1,2,2,3,0,4,2], val = 2
 * 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
 */

/**
 * 要求：
 * 1. 不适用额外数组
 * 2. $O(1)$ 额外空间
 */

/**
 * 暴力解法
 * 删除即去掉即可，将查找的数组元素移动到最后面并减小数组的长度即可
 *
 * 两层循环：
 * 时间复杂度：O(n²)
 * 空间复杂度：O(1)
 */
function deleteElement(nums, val) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  
  let numsLen = nums.length;
  for (let i = 0; i < numsLen; i++) {
    if (nums[i] === val) {
      // 找到相等的值，将当前值后面的元素往前移动
      for (let j = i + 1; j < numsLen; j++) {
        // 这样当前查找到的元素即被覆盖
        nums[j - 1] = nums[j];
      }
      
      // 移动完成，当前的 i 还得从当前位置开始判断，因此需要 i--
      i--;
      // 当前元素被覆盖，直接将数组长度减 1
      numsLen--;
    }
  }
  console.log('nums.....', nums);
  return numsLen;
}

/**
 * 双指针法
 * 在数组、链表、字符串等操作中经常使用双指针法
 * 解法：通过快慢指针，当待匹配的数据和当前快指针的数据值不相等时，将快指针的值赋给慢指针，然后慢指针自增；如果待匹配的数据
 * 和当前快指针的值相等，则跳过慢指针赋值和自增，以此达到将快指针对应的值和待匹配值相等的数据给去掉。
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function deleteElement2(nums, val) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const numsLen = nums.length;
  let slowIndex = 0;
  for (let fastIndex = 0; fastIndex < numsLen; fastIndex++) {
    // 快指针的值和待匹配数据 val 不相等，将快指针值赋值给慢指针数组数据
    // 相等时，则跳过赋值，以此达到删除的目的
    if (nums[fastIndex] !== val) {
      nums[slowIndex] = nums[fastIndex];
      slowIndex++;
    }
  }
  console.log('双指针法:', nums);
  return slowIndex;
}

/**
 * 借助数组的方法 splice
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function deleteElement3(nums, val) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      // 当前值被删除，下一次需要从当前位置开始，由于 for 有 i++，即需要减 1 后继续
      i--;
    }
  }
  console.log('nums:', nums);
  return nums.length;
}

/**
 * 借助数组的方法 splice 和 filter
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function deleteElement4(nums, val) {
  if (!nums || nums.length === 0) {
    return 0;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1, '');
    }
  }
  console.log('nums:', nums.filter(item => item !== ''));
  return nums.filter(item => item !== '').length;
}

// const nums = [3, 2, 2, 3];
// const val = 3;
const nums = [0, 1, 2, 2, 3, 0, 4, 2];
const val = 2;
console.log(deleteElement2(nums, val));
