// Capitalization String - first letter capitalized
export function capString(strArr) {
  if(strArr.length > 0) {
    return strArr.map(str => {
      // if str is existed, then return uppercase str
      return str && str.replace(str[0], str[0].toUpperCase());
    })
  }
  return null;
}
