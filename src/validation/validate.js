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
    let itemNumber = params.OUR_PART_NUMBER !== undefined && params.OUR_PART_NUMBER !== null ? params.OUR_PART_NUMBER.toString() : 0
    let description = params.PRODUCT_DESCRIPTION !== undefined ? params.PRODUCT_DESCRIPTION.toString() : 0
    let qty = params.QUANTITY !== undefined ? params.QUANTITY.toString() : 0
    let cost = params.UNIT_COST !== undefined ? params.UNIT_COST.toString() : 0
    let price = params.UNIT_PRICE !== undefined ? params.UNIT_PRICE.toString() : 0
    return isTrue(itemNumber) && isTrue(description) && isTrue(qty) && isTrue(cost) && isTrue(price)
}

export let buttonHide = (row) =>{
  let params = row.data
  let itemNumber = params.OUR_PART_NUMBER !== undefined && params.OUR_PART_NUMBER !== null ? params.OUR_PART_NUMBER.toString() : 0
  return itemNumber.length > 0 ? 'button-disable' : ''
}