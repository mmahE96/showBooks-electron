import React from 'react'
import { useState } from 'react'
import LogItem from './LogItem'

const App = () => {

	const [toggle, setToggle] = useState(false)

	const [defaultState, setdefaultState]  = useState([{
		_id: 0,
		imeAutora: '0',
		naslov: '0',
		prezimeAutora: '0',
		iznajmljeno: "0",
	  }])

	const [books, setBooks] = useState([
		{
		  _id: 1,
		  imeAutora: 'This is log one',
		  naslov: 'low',
		  prezimeAutora: 'Brad',
		  iznajmljeno: "da",
		},
		{
		  _id: 2,
		  imeAutora: 'This is log two',
		  naslov: 'moderate',
		  prezimeAutora: 'Kate',
		  iznajmljeno: "ne",
		},
		{
		  _id: 3,
		  imeAutora: 'This is log three',
		  naslov: 'high',
		  prezimeAutora: 'John',
		  iznajmljeno: "da",
		},
	  ])
	  console.log(books)
	return (
		<div className='main'>
		<div className='title'>
			<h1>Dzamijska biblioteka</h1>
		</div>
		<div className='setting-field'>		

			<button className='btn' onClick={() => setToggle(!toggle)}>Pregled knjiga</button>
			<br />
			

			<button className='btn' >Pretrazuj knjige</button>
			<input placeholder='Unesi ime knjige/autora' size={80}></input>
			
			
			<hr />


		</div>
		
	<div className='results-field'>
	<table className='results-table'>
        <thead>
          <tr>
		 	<th>Id</th>
            <th>Naslov knjige</th>
            <th>Ime autora</th>
            <th>Prezime autora</th>
            <th>Iznajmljena</th>
           
          </tr>
        </thead>
        <tbody>
		
		{
			toggle ?
			books.map((book) => (
            <LogItem key={book._id} book={book} />
          ))
		  :
		  defaultState.map((book) => (
            <LogItem key={book._id} book={book} />
          ))

		  }
        </tbody>
		</table>
		</div>
		</div>
		
     
	)
}

export default App
