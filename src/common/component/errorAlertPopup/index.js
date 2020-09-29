import React from 'react'
import { Modal } from 'antd';
import './alertpop.scss'
const ErrorAlertPopup = (errHeader,errFooter,errDate,errMsg,closeName) => {
    const info = () =>{
        Modal.info({
            content: (
              <div className="err">
                  <p className="err-date">{errHeader} : {errDate}</p>
                  <p>{errFooter} :</p>
                  <p className="err-msg">{errMsg}</p>
              </div>
            ),
            icon: '',
            okText: `${closeName ? closeName : 'Close'}`,
            onOk :false,
            width:700
          })
    }
    return (
        <div>
            {info()}
        </div>
    )
}
export default ErrorAlertPopup