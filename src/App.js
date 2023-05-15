import React, { useState, useEffect } from "react"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import EmployeeCard from "./components/EmployeeCard.js"

function App() {
  const [employee, setEmployees] = useState([])

  useEffect(() => {
    async function go() {
      const response = await Axios.get("/employees/getall")
      setEmployees(response.data)
    }
    go()
  }, [])


  return (
    <div className="App">
     <h1>ICE CREAM FACTORY</h1>
     <h3>Employees register</h3>
     <div>
     <CreateNewForm setEmployees={setEmployees} />
      </div> 
        <div className="employee-grid">
        {employee.map(function (employee) {
          return <EmployeeCard key={employee._id} firstname={employee.firstname} lastname={employee.lastname}  department={employee.department} startdate={employee.startdate} salary={employee.salary} employee={setEmployees} />
        })}
        </div>     
    </div>
    
  )
}

export default App;

