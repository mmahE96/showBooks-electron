import React from 'react'
import { useState } from 'react'
import LogItem from './LogItem'
import client from '../../config/postgres'

const App = () => {

	const [books, setBooks] = useState([
		{
		  _id: 1,
		  ime_autora: 'This is log one',
		  naslov: 'low',
		  prezime_autora: 'Brad',
		  iznajmljeno: "da",
		  iznajmljivac:"Kemo",
		  datum_izdavanja:"21.02.2021"
		},
		{
		  _id: 2,
		  ime_autora: 'This is log two',
		  naslov: 'moderate',
		  prezime_autora: 'Kate',
		  iznajmljeno: "ne",
		  iznajmljivac:"Nema",
		  datum_izdavanja:"Nema"
		},
		{
		  _id: 3,
		  ime_autora: 'This is log three',
		  naslov: 'high',
		  prezime_autora: 'John',
		  iznajmljeno: "da",
		  iznajmljivac:"Ratko",
		  datum_izdavanja:"21.02.2021"
		},
	  ])

	const [toggle, setToggle] = useState(false)
	const [searchWord, setSearchWord] = useState("")

	const [defaultState, setdefaultState]  = useState([{
		_id: 0,
		ime_autora: '0',
		naslov: '0',
		prezime_autora: '0',
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

	function searchPattern(){

		client.connect().then(() => console.log('connected'))
		.catch(err => console.error('connection error', err.stack))
		//ILIKE commands postgress to be case insensitive, LIKE will be case sensitive when searching through DB
		//naslov || ime_autora || prezime_autora || iznajmljivac this part is showing all table columns that being searched with pattern
		const data = client.query("Select * from books where naslov || ime_autora || prezime_autora || iznajmljivac ILIKE $1", [`%${searchWord}%`], (err, res) => {
			if(!err){
				console.log("log pattern", res.rows);
				setBooks(res.rows)
				
			}else {
				console.log(err.message);
			}
			client.end;
		})
		console.log("just logging data", data)
		
		

	}

	function getInput(val){
		setSearchWord(val.target.value)
	}

	
	  console.log("last log", books)
	return (
		<div className='main'>
		<div className='title'>
			<h1>Dzamijska biblioteka</h1>
			<p>Omogućiti da se doda kome je knjiga izdata i datum izdavanja</p>

			
		</div>
		<div className='setting-field'>		

			<button className='btn' onClick={() => {
				getData()
				setToggle(!toggle)
				
				
				}}>Pregled knjiga</button>
			<br />
			

			<button className='btn' onClick={() => {searchPattern()
			setToggle(!toggle)}
			
			}>Pretrazuj knjige</button>
			<input placeholder='Unesi ime knjige/autora' size={80} onChange={getInput}></input>
			
			
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
			<th>Datum izdavanja</th>
			<th>Promjeni</th>
			
           
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
