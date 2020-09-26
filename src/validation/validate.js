let isTrue = (value) =>{
    return value.length > 0 ? true : false
}

export let isRequiredCostStyle =  (params) => {
    let isRequiredString = params.data.UNIT_COST !== undefined && params.data.UNIT_COST.toString();
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}

export let isRequiredUnitPrice =  (params) => {
    let isRequiredString = params.data.UNIT_PRICE !== undefined && params.data.UNIT_PRICE.toString()
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}

export let isRequiredItem =  (params) => {
    console.log('arams.data.OUR_PART_NUMBER ',params.data.OUR_PART_NUMBER != null )
    let isRequiredString = params.data.OUR_PART_NUMBER !== undefined && params.data.OUR_PART_NUMBER !== null && params.data.OUR_PART_NUMBER.toString();
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}
export let isRequiredDescription =  (params) => {
    let isRequiredString = params.data.PRODUCT_DESCRIPTION !== undefined && params.data.PRODUCT_DESCRIPTION.toString()
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}
export let isRequiredQty =  (params) => {

    let isRequiredString = params.data.QUANTITY !== undefined && params.data.QUANTITY.toString()
    console.log('params.data.QUANTITY',isRequiredString)
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}
export let zipValidate = (params) => {
    let isLength = params.value.length > 10
    if (isLength) {
        //mark police cells as red
        return {borderColor: 'red'};
    } else {
    return {borderColor: 'transparent'};
    }
}

export let upperCase = (params) => {
  if(params.value !== null && params.value !== undefined){
    return params.value.toUpperCase();
  }
}

// button enable feature 
export let enabledLogic = (params) =>{
    let itemNumber = params.OUR_PART_NUMBER !== undefined && params.OUR_PART_NUMBER !== null && params.OUR_PART_NUMBER.toString(); 
    let description = params.PRODUCT_DESCRIPTION !== undefined && params.PRODUCT_DESCRIPTION.toString()
    let qty = params.QUANTITY !== undefined && params.QUANTITY.toString()
    let cost = params.UNIT_COST !== undefined && params.UNIT_COST.toString() 
    let price = params.UNIT_PRICE !== undefined && params.UNIT_PRICE.toString()
    return isTrue(itemNumber) && isTrue(description) && isTrue(qty) && isTrue(cost) && isTrue(price)
}