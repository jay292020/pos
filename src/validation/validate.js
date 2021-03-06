let isTrue = (value) =>{
    return value.length > 0 ? true : false
}

export let isRequiredCostStyle =  (params) => {
    let isRequiredString = params.data.UNIT_COST !== undefined && params.data.UNIT_COST !== null &&  params.data.UNIT_COST.toString();
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}

export let isRequiredUnitPrice =  (params) => {
    let isRequiredString = params.data.UNIT_PRICE !== undefined && params.data.UNIT_PRICE !== null &&  params.data.UNIT_PRICE.toString()
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

export let isRequiredMfg =  (params) => {
  let isRequiredString = params.data.DISTRIBUTOR_PART_NUMBER !== undefined && params.data.DISTRIBUTOR_PART_NUMBER !== null && params.data.DISTRIBUTOR_PART_NUMBER.toString();
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
    let isRequiredString = params.data.QUANTITY !== undefined && params.data.QUANTITY !== null &&  params.data.QUANTITY.toString()
    let isRequiredValue = isRequiredString.length > 0
      if (isRequiredValue) {
          //mark police cells as red
          return {borderColor: 'transparent'};
      } else {
        return {borderColor: 'red'};
      }
}
export let isRequiredName =  (params) => {
  let isRequiredString = params.data.CUSTOMER_NAME !== undefined && params.data.CUSTOMER_NAME !== null && params.data.CUSTOMER_NAME.toString()
  let isRequiredValue = isRequiredString.length > 0
    if (isRequiredValue) {
        //mark police cells as red
        return {borderColor: 'transparent'};
    } else {
      return {borderColor: 'red'};
    }
}

export let isRequiredShipCity =  (params) => {
  let isRequiredString = params.data.SHIP_TO_CITY !== undefined && params.data.SHIP_TO_CITY !== null && params.data.SHIP_TO_CITY.toString()
  let isRequiredValue = isRequiredString.length > 0
    if (isRequiredValue) {
        //mark police cells as red
        return {borderColor: 'transparent'};
    } else {
      return {borderColor: 'red'};
    }
}
export let isRequiredSoldCity =  (params) => {
  console.log(params.data.SOLD_TO_CITY)
  let isRequiredString = params.data.SOLD_TO_CITY !== undefined && params.data.SOLD_TO_CITY !== null && params.data.SOLD_TO_CITY.toString();
  let isRequiredValue = isRequiredString.length > 0
    if (isRequiredValue) {
        //mark police cells as red
        return {borderColor: 'transparent'};
    } else {
      return {borderColor: 'red'};
    }
}
export let zipValidate = (params) => {
    let isLength = params.value !== null && params.value.length > 10
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
    let itemMfg = params.DISTRIBUTOR_PART_NUMBER !== undefined && params.DISTRIBUTOR_PART_NUMBER !== null ? params.DISTRIBUTOR_PART_NUMBER.toString() : 0
    let description = params.PRODUCT_DESCRIPTION !== undefined ? params.PRODUCT_DESCRIPTION.toString() : 0
    let qty = params.QUANTITY !== undefined && params.QUANTITY !== null ? params.QUANTITY.toString() : 0
    let cost = params.UNIT_COST !== undefined && params.UNIT_COST !== null ? params.UNIT_COST.toString() : 0
    let price = params.UNIT_PRICE !== undefined && params.UNIT_PRICE !== null ? params.UNIT_PRICE.toString() : 0
    let name = params.CUSTOMER_NAME !== undefined && params.CUSTOMER_NAME !== null ? params.CUSTOMER_NAME.toString() : 0
    let shipCity = params.SHIP_TO_CITY !== undefined && params.SHIP_TO_CITY !== null ? params.SHIP_TO_CITY.toString() : 0
    let soldCity = params.SOLD_TO_CITY !== undefined && params.SOLD_TO_CITY !== null ? params.SOLD_TO_CITY.toString() : 0
    return isTrue(itemNumber) && isTrue(description) && isTrue(qty) && isTrue(cost) && isTrue(price) && isTrue(itemMfg) && isTrue(name) && isTrue(shipCity) && isTrue(soldCity)
}

export let buttonHide = (row) =>{
  let params = row.data
  let itemNumber = params.OUR_PART_NUMBER !== undefined && params.OUR_PART_NUMBER !== null ? params.OUR_PART_NUMBER.toString() : 0
  return itemNumber.length > 0 ? 'button-disable' : ''
}