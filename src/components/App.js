import React from 'react'
import { useState } from 'react'
import LogItem from './LogItem'
import client from '../../config/postgres'

const App = () => {

	const [books, setBooks] = useState([
		{
		  _id: 1,
		  imeAutora: 'This is log one',
		  naslov: 'low',
		  prezimeAutora: 'Brad',
		  iznajmljeno: "da",
		  iznajmljivac:"Kemo",
		  datumIzdavanja:"21.02.2021"
		},
		{
		  _id: 2,
		  imeAutora: 'This is log two',
		  naslov: 'moderate',
		  prezimeAutora: 'Kate',
		  iznajmljeno: "ne",
		  iznajmljivac:"Nema",
		  datumIzdavanja:"Nema"
		},
		{
		  _id: 3,
		  imeAutora: 'This is log three',
		  naslov: 'high',
		  prezimeAutora: 'John',
		  iznajmljeno: "da",
		  iznajmljivac:"Ratko",
		  datumIzdavanja:"21.02.2021"
		},
	  ])

	const [toggle, setToggle] = useState(false)

	const [defaultState, setdefaultState]  = useState([{
		_id: 0,
		imeAutora: '0',
		naslov: '0',
		prezimeAutora: '0',
		iznajmljeno: "0",
	  }])

	 function getData() {
		console.log("Default books state", books)
		client.connect().then(() => console.log('connected'))
		.catch(err => console.error('connection error', err.stack))

		const data = client.query('Select * from books', (err, res) => {
			if(!err){
				console.log("log", res.rows);
				setBooks(res.rows)
			}else {
				console.log(err.message);
			}
			client.end;
		})
		console.log(books)

	}

	
	  console.log("last log", books)
	return (
		<div className='main'>
		<div className='title'>
			<h1>Dzamijska biblioteka</h1>
			<p>Omogućiti da se doda kome je knjiga izdata i datum izdavanja</p>

			<button onClick={() => getData()}>Get data</button>
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
			<th>Promjeni</th>
			<th>*</th>
           
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
