/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 15:31:46
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 17:47:46
 */
// export class Utils {
function del(str, target) {
  const reg = new RegExp(`^([^]*)(${target})([^]*)$`);
  return str.replace(reg, '');
}
// }

/**
 * 延迟执行
 * @param ms
 * @returns
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
