import React from 'react'

export default function LogItem({book:{_id, prezimeAutora, imeAutora, iznajmljeno, naslov}}) {
  return (
    <tr>
        <td>{_id}</td>
        <td>{naslov}</td>
        <td>{imeAutora}</td>
        <td>{prezimeAutora}</td>
        <td><button className='btn-izn' >{iznajmljeno}</button></td>
        

    </tr>
  )
}
