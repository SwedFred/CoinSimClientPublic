//  Helper class to truncate text to a set amount of decimals, useful for currencies with very small values
export const GetTruncatedAmount = (text, take = 0) => {
  if (!text)
    return '0';
  var tmp = text.toString();
  var index = tmp.indexOf('.');
  if (index < 0)
    index = tmp.indexOf(',');
  if (index > 0)
    return tmp.slice(0, index+take);
  else 
    return tmp;
}