function validateString(text){
	//console.log('sprawdzam dlugi string');
    var retVal = /^(.{1,50})$/.test(text);
    return retVal;
}

function validateLongString(text){
	//console.log('sprawdzam dlugi string');
    var retVal = /^(.{1,400})$/.test(text);
    return retVal;
}

function validateId(number){
	console.log('sprawdzam id');

    var retVal = /^([0-9]{1,7})$/.test(number);
    return retVal;
}

function validatePageNumber(number){

    //console.log('sprawdzam numer strony');
 
    var retVal = /^([0-9]{1,7})$/.test(number);
    return retVal;
}

function validatePercent(number){

    //console.log('sprawdzam procent');
 
    if(number >= 0 && number <=100)
      return true;
}
function validateHoursAmount(number){

    //console.log('sprawdzama hours amount');
 
    var retVal = /^([0-9]{1,7})$/.test(number);
    return retVal;
}

module.exports = {
  validateId: validateId,
  validateString: validateString,
  validateLongString: validateLongString,
  validatePageNumber: validatePageNumber,
  validatePercent: validatePercent,
  validateHoursAmount: validateHoursAmount
};