import { useEffect, useState } from 'react'
import './index.css'

const UsersTable=()=>{
const [data,setData]=useState([])
console.log('table')
const getUsers=async()=>{
    const url="http://localhost:8081/users"
    const response=await fetch(url)
    const data= await response.json()
    setData(data)
    console.log(data)
  }

  useEffect(()=>{
getUsers()
  },[])

return(
    <div>
        <h1>Users Data</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Age/Sex</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Gove ID</th>
                <th>Guardian Details</th>
                <th>Nationality</th>
            </tr>
            {
                data.map(item=><tr>
                    <td>{item.name}</td>
                    <td>{item.ageOrSex}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.govtId}</td>
                    <td>{item.guardianDetails}</td>
                    <td>{item.nationality}</td>
                </tr>)
            }
        </table>
    </div>
)

}
export default UsersTable