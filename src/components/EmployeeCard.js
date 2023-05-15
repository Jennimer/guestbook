import Axios from "axios"
import React, { useState } from "react"

function EmployeeCard(props) {

  const [isEditing, setIsEditing] = useState(false)
  const [draftFirstname, setDraftFirstname] = useState("")
  const [draftLastname, setDraftLastname] = useState("")
  const [draftDepartment, setDraftDepartment] = useState("")
  const [draftStartdate, setDraftStartdate] = useState("")
  const [draftSalary, setDraftSalary] = useState("")

  async function submitHandler(e) {
    e.preventDefault()
    setIsEditing(false)
    props.setEmployees(prev =>
      prev.map(function (employee) {
        if (employee._id === props.id) {
          return { ...employee, firstname: draftFirstname, Lastname: draftLastname, Department: draftDepartment, Startdate: draftStartdate, Salary: draftSalary }
        }
        console.log("It dones")
        return employee
      })
    )
    const data = new FormData()
 
    data.append("_id", props.id)
    data.append("firstname", draftFirstname)
    data.append("lastspecies", draftLastname)
    data.append("department", draftDepartment)
    data.append("startdate", draftStartdate)
    data.append("salary", draftSalary)
    
    
      props.setEmployees(prev => {
        return prev.map(function (employee) {
          if (employee._id === props.id) {
            return { ...employee}
          }
          return employee
        })
      })
    }
  

  return (
    <div className="card">
   
      <div className="card-body">
        {!isEditing && (
          <>
            <h4>{props.firstname}{props.lastname}</h4>
            <p>{props.Department}{props.startdate}{props.Salary}</p>
            {!props.readOnly && (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setDraftFirstname(props.firstname)
                    setDraftLastname(props.lastname)
                    setDraftDepartment(props.department)
                    setDraftStartdate(props.startdate)
                    setDraftSalary(props.salary)
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </button>{" "}
                <button
                  onClick={async () => {
                    const test = Axios.delete(`/employee/${props.id}`)
                    props.setEmployees(prev => {
                      return prev.filter(employee => {
                        return employee._id !== props.id
                      })
                    })
                  }}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}
        {isEditing && (
          <form onSubmit={submitHandler}>
            <div className="mb-1">
              <input autoFocus onChange={e => setDraftFirstname(e.target.value)} type="text" className="form-control form-control-sm" value={draftFirstname} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftLastname(e.target.value)} type="text" className="form-control form-control-sm" value={draftLastname} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftDepartment(e.target.value)} type="text" className="form-control form-control-sm" value={draftDepartment} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftStartdate(e.target.value)} type="text" className="form-control form-control-sm" value={draftStartdate} />
            </div>
            <div className="mb-2">
              <input onChange={e => setDraftSalary(e.target.value)} type="text" className="form-control form-control-sm" value={draftSalary} />
            </div>
            <button className="btn btn-sm btn-success">Save</button>{" "}
            <button onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary">
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EmployeeCard