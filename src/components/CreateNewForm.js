import Axios from "axios"
import React, { useState} from "react"

function CreateNewForm(props) {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [department, setDepartment] = useState("")
  const [startdate, setStartdate] = useState("")
  const [salary, setSalary] = useState("")

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("firtsname", firstname)
    data.append("lastname", lastname)
    data.append("department", department)
    data.append("startdate", startdate)
    data.append("salary", salary)
    setFirstname("")
    setLastname("")
    setDepartment("")
    setStartdate("")
    setSalary("")

    const newEmployee = await Axios.post("/employees/:id", data,  { headers: { "Content-Type": "json" } })
    props.setEmployess(prev => prev.concat([newEmployee.data]))
  }

  return (
    <form className="p-3 bg-success bg-opacity-25 mb-5" onSubmit={submitHandler}>
      <div className="mb-2">
        <input onChange={e => setFirstname(e.target.value)} value={firstname} type="text" className="form-control" placeholder="Firstname" />
      </div>
      <div className="mb-2">
        <input onChange={e => setLastname(e.target.value)} value={lastname} type="text" className="form-control" placeholder="Lastname" />
      </div>
      <div className="mb-2">
        <input onChange={e => setDepartment(e.target.value)} value={department} type="text" className="form-control" placeholder="Department" />
      </div>
      <div className="mb-2">
        <input onChange={e => setStartdate(e.target.value)} value={startdate} type="text" className="form-control" placeholder="Start Date" />
      </div>
      <div className="mb-2">
        <input onChange={e => setSalary(e.target.value)} value={salary} type="text" className="form-control" placeholder="Salary" />
      </div>
      <button className="btn btn-success">Search</button><button className="btn btn-success add">Add</button>
    </form>
  )
}

export default CreateNewForm