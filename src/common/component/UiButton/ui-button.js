import React, { Children } from 'react'
const UiButton = (props) => {
    const {color,font,bg,children,style, onClickHandler,disabled,hide} = props
    let defaultStyle = {
        color: color ? color : '#ffffff',
        fontSize:font ? font : '12px',
        backgroundColor: bg ? bg: '#36682f',
        lineHeight: '21px',
        outline: 'none',
        border: 'none',
        borderRadius: '3px',
        cursor:'pointer',
        opacity: disabled && '0.4' 
    }
    return (
        <div>
            <button className="ui-button" disabled={disabled} hidden={hide} onClick={onClickHandler} style={defaultStyle} >
                {children}
            </button>
        </div>
        
    )
}
export default UiButton