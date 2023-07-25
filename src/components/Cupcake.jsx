import React, {useState} from 'react'

function Cupcake({color, children}) {//children ya a ser igual a children
    const [amigo, setAmigo] = useState
    ("Enojado")
    
  return (
    <div className={color}>Cupcake - {children}</div>
  )
}

export default Cupcake