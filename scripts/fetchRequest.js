import errorResponseMessage from './errorPage.js';

const fetchRequest = async (count, url, postfix, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (!postfix) {
      postfix = '';
    }
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${url}${postfix}`, options);

    if (response.ok) {
      const data = await response.json();
      const newDataArr = data.articles.splice(0, count);
      if (callback) return callback(null, newDataArr);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    errorResponseMessage();
  }
};

export default fetchRequest;
