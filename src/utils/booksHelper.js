/**
 * Functions to help handle database operations for books
 */

function validateBook(title, author, year, publisher) {
  if (!(title && author && year)) {
    return { "Bad Request": "Title, Author and Year are required" };
  }
  if (!Number.isInteger(year)) {
    return { "Bad Request": "Year needs to be an Integer" };
  }
  //we want to allow publisher to be optional but it cannot be empty
  if (!(publisher || (!publisher && publisher !== ""))) {
    return { "Bad Request": "Publisher is optional but cannot be empty" };
  }
  return null;
}

function validateBookParams(queryObject) {
  let validQueryParams = [];

  if (queryObject.author) {
    validQueryParams.push(` author = '${queryObject.author}'`);
  }
  //Number will convert queryObject.year to a number which is validated by isInteger
  //parseInt cannot be used because we dont want to allow values like "123abc"
  if (queryObject.year && Number.isInteger(Number(queryObject.year))) {
    validQueryParams.push(` year = '${queryObject.year}'`);
  }
  if (queryObject.publisher) {
    validQueryParams.push(` publisher = '${queryObject.publisher}'`);
  }

  return validQueryParams;
}

function createBookParamsSql(paramsArray) {
  if (paramsArray.length < 1) {
    return "";
  }

  let queryString = " WHERE";
  while (paramsArray.length > 0) {
    queryString += paramsArray.shift();
    if (paramsArray.length > 0) {
      queryString += " AND";
    }
  }
  return queryString;
}

module.exports = { validateBook, validateBookParams, createBookParamsSql };
