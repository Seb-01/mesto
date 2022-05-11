/** Функция, которая делает fetch-запрос к серверу
 *
 * @param {string} url
 * @param {object} options { method, headers, body }
 * @param {call back} setResult
 */

  // запишем в таком виде, чтобы удобнее было использовать в Promise.all
  // a function expression
  export const getFetchResult = function (url, options, setResult, setError) {
  fetch(url, options)
  //  читает ответ от сервера в формате json и возвращаем промис
  .then((res) => {
    //console.log(res);
    return res.json();
  })
  // затем анализируем результат:
  .then((result) => {
    console.log(result);
    // возвращаем результат через callback
    setResult(result);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}. Запрос не выполнен!`);
    // возвращаем результат через callbac
    setError(err);
  });
}

// проверка наличия в массиве объекта с заданным свойством _id
export function checkId(arr, targerId) {
  // идем по массиву
  for (let index = 0; index < arr.length; ++index) {
    if (arr[index]._id === targerId)
      // как только нашли совпадение - выходим с возвратом true
      return true;
  };

 return false;
}
