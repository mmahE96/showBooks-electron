import React from 'react'
import { useState } from 'react'
import client from '../../config/postgres'

export default function LogItem({book:{_id, prezime_autora, ime_autora, iznajmljeno, naslov, iznajmljivac, datum_izdavanja}}) {

    const [editing, setEditing] = useState(false)
    const [lander, setLander] = useState("")
    const [landId, setLandId] = useState()
   

    function openInput(id) {
        setEditing(true)
        
        //console.log(id)
        setLandId(id)

    }

    function saveInput(){
        setEditing(false)
        console.log(lander)
        console.log(landId)
        editLander()

    }

    function editLander() {
        const date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const dateString = date.toString()
		

		const data = client.query(
            'UPDATE books SET iznajmljeno = $4 , iznajmljivac = $1, datum_izdavanja = $2 WHERE _id = $3 ',[`${lander}`,`${dateString}`, `${landId}`, `${"da"}` ],
             (err, res) => {
			if(!err){
				console.log(res);
				
			}else {
				console.log(err.message);
			}
			client.end;
		})
		console.log(data)

	}

    function landBook(val){
        setLander(val.target.value)
        
    }

  return (
    <tr>
        <td>{_id}</td>
        <td>{naslov}</td>
        <td>{ime_autora}</td>
        <td>{prezime_autora}</td>
        <td>{iznajmljeno == "da" ? <div>{iznajmljivac}</div> : <div>{iznajmljeno}</div>}</td>
        <td>{iznajmljeno == "da" ? <div>{datum_izdavanja}</div> : <div>nema</div>}</td>
        {editing ? <td><input placeholder='Unesite ime osobe' onChange={landBook}></input></td> : null}
        <td>{editing ? <button className='btn-izn' onClick={() => saveInput()}>Spasi</button> :<button className='btn-izn' onClick={() => openInput(_id)}>Uredi</button>}</td>
        
        

    </tr>
  )
}
