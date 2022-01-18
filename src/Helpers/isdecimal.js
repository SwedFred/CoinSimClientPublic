export const isDecimal = (text) => {
  var hasDot = false;
  var charCode;
  for(var i = 0; i < text.length; i++)
  {
    charCode = text.charCodeAt(i);
    if (i === 0 && (charCode < 48 || charCode > 57))
      return false;
    if (charCode === 46 || charCode === 44)
    {
      if (hasDot)
        return false;
      else
        hasDot = true;
    }
    else if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}