 /**
 * 对json排序，根据哪个字段排序
 * @param array
 * @param key
 * @returns {Array.<T>|*}
 */
 export function  sortByKey(array, key, rule) {
  var sortN = function (x, y) {
    //默认是正序
    var ru = rule || (x < y) ? -1 : ((x > y) ? 1 : 0)
    if (rule) {
      //倒序
      ru = (x > y) ? -1 : ((x < y) ? 1 : 0)
    }
    return ru
  };
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return (sortN(x, y));
  });
}
export function remove(arr, val) {
  var index = this.indexOf(arr, val);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr
}
 export function  indexOf(arr, val) {
   for (var i = 0; i < arr.length; i++) {
     if (arr[i] == val) return i;
   }
   return -1;
 }
