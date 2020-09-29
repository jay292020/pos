import React,{useContext} from 'react'
import { Modal } from 'antd';
import CONSTANTS from './../../assets/constant'
const ErrorMessage = (errorLocation, errorMsg, sourceName,title) =>{
    let errorTitle = title ? title : CONSTANTS.ALERTTITLE
    const info = (errorLocation, errorMsg, sourceName) =>{
        Modal.info({
            content: (
              <div>
                  <p>{errorTitle}</p>
                    <p>{sourceName}: {errorLocation}</p>
                  <p>{errorMsg}</p>
              </div>
            ),
            icon: '',
            okText: 'Close',
            onOk :false,
            width:600
          })
    }
    return (
        <div>
            {info(errorLocation,errorMsg, sourceName)}
            {/* {info(errorMessage.errorLocation,errorMessage.errorMsg, errorMessage.sourceName)} */}
        </div>
    )
}
export default ErrorMessage
