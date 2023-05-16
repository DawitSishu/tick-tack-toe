import React from 'react'

function Box({text,id,onClick,isdisabled}) {
  return (
    <div onClick={() =>onClick(id ) } className={`${ text == 'O' ? "opos" : text == 'X' ? "xpos" : "nopos"}`} >{text}</div>
    // <button onClick={() =>onClick(id)}>{text}</button>
  )
}

export default Box