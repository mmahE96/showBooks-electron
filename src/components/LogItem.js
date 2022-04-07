import React from 'react'
import { useState } from 'react'

export default function LogItem({book:{_id, prezimeAutora, imeAutora, iznajmljeno, naslov, iznajmljivac, datumIzdavanja}}) {

    const [editing, setEditing] = useState(false)

    function openInput() {
        setEditing(true)

    }

    function saveInput(){
        setEditing(false)

    }

  return (
    <tr>
        <td>{_id}</td>
        <td>{naslov}</td>
        <td>{imeAutora}</td>
        <td>{prezimeAutora}</td>
        <td>{iznajmljeno == "da" ? <div>{iznajmljivac}, {datumIzdavanja}</div> : <div>{iznajmljeno}</div>}</td>
        <td>{editing ? <button className='btn-izn' onClick={() => saveInput()}>Spasi</button> :<button className='btn-izn' onClick={() => openInput()}>Uredi</button>}</td>
        {editing ? <td><input placeholder='Unesite ime osobe'></input></td> : null}
        
        

    </tr>
  )
}
