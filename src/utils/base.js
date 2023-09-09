/**
 * 获取指定范围内的随机整数
 * @param {Number} start 指定范围的最小值 
 * @param {Number} end 指定范围的最大值
 */
export function getRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}