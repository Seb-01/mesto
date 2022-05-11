/** Функция для проверки наличия в массиве объекта с заданным свойством _id
 *
 * @param {string} arr - массив
 * @param {object} targerId - искомый id
 */
export function checkId(arr, targerId) {
  // идем по массиву
  for (let index = 0; index < arr.length; ++index) {
    if (arr[index]._id === targerId)
      // как только нашли совпадение - выходим с возвратом true
      return true;
  };

 return false;
}
