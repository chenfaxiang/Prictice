/*
 * 螺旋矩阵
 * 题目：
 * 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
 * 
 * 示例：
 * 输入: 3
 * 输出: [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
 * 
 * 解题思路：
 * 模拟顺时针画矩阵的过程:
 * - 填充上行从左到右
 * - 填充右列从上到下
 * - 填充下行从右到左
 * - 填充左列从下到上
 * 由外向内一圈一圈画下去。
 */

function generateMatrix(n) {
  // 画圈的 起始位置
  let startX = startY = 0;
  // 循环的圈数
  let loop = Math.floor(n / 2);
  // 最中心位置，只有 n 为奇数时才会处理该位置的值
  let middleIndex = Math.floor(n / 2);
  
  // 每次循环时的累加数据
  let count = 1;
  // 控制一圈的每个边循环的个数
  let offset = 1;
  
  // 用于处理数组的位置值
  let i, j;

  // 定义一个二维数组(twoDimensionalArray)
  let twoDArray = new Array(n).fill(0).map(() => new Array(n).fill(0));

  while(loop--) {
    // 数组位置起始值赋值
    i = startX;
    j = startY;

    // 矩阵上侧边，从左往右；即数组 i = 0, j 用来控制循环长度
    for (j = startY; j < startY + n - offset; j++) {
      // 循环的终止条件 startY + n - offset 非常巧妙
      // i = 0 不变，j 自增 1，到行的倒数第二个截止，行的倒数第一个作为矩阵右侧边往下的第一个值
      twoDArray[i][j] = count++;
    }

    // 矩阵右侧边，从上往下；即数据 j = 上侧边在 for 累加完后的值(n), i 用来控制循环长度
    for (i = startX; i < startX + n - offset; i++) {
      // 循环终止条件同理
      // j = n 不变，i 自增 1，到 j 列往下的倒数第二个截止，j 列的倒数第一个作为矩阵下侧边往左的第一个值
      twoDArray[i][j] = count++;
    }

    // 矩阵下侧边，从右往左；即数据 i = 右侧边在 for 累加完后的值(n), j 用来控制循环长度
    for (; j > startY; j--) {
      // i 在上一个循环累加成 n，即下侧边的 i 不变，从右往左依次处理时变换 j 的值就行，而 j 在前面的 for 循环已经累加成了 n，因此自减即可
      twoDArray[i][j] = count++;
    }

    // 矩阵左侧边，用下往上；即数据 j = 下侧边在 for 递减完后的值(0), i 用来控制循环长度
    for (; i > startX; i--) {
      // j 在上一个循环递减成 0，即左侧边的 j 不变，从下往上依次处理时变换 i 的值就行，而 i 在前面的 for 循环已经累加成了 n，因此自减即可
      twoDArray[i][j] = count++;
    }

    // 矩阵一圈处理完成，需要修改起始位置；如最开始从 [0, 0] 开始，下一圈即从 [1, 1] 开始，以此类推
    startX++;
    startY++;

    // 矩阵一圈处理完成，下一圈执行时结束终止位置变更，例如计算行时 startY + n - offset 的值即通过 offset 来进行控制
    // 初始值为 1，后续没循环依次自增 2 即可，终止条件不会出错
    offset += 2;
  }

  // 如果 n 为奇数，在矩阵外圈填完之后，正中间有一个待补充的数值
  if (n % 2 === 1) {
    twoDArray[middleIndex][middleIndex] = count++;
  }

  return twoDArray;
}

console.log(generateMatrix(5));
