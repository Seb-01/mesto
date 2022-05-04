/** Функция, которая делает fetch-запрос к серверу
 *
 * @param {string} url
 * @param {object} options { method, headers, body }
 * @param {call back} setResult
 */
 export function getFetchResult(url, options, setResult, setError) {
  fetch(url, options)
  //  читает ответ от сервера в формате json и возвращаем промис
  .then((res) => {
    console.log(res);
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
