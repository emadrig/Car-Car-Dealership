import React, {useState, useEffect} from 'react';

export default function SalesPersonForm(){
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        employee_id: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const salespersonUrl = 'http://localhost:8090/api/salesperson/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json()
            console.log(newSalesperson)
            setFormData({
                name:'',
                email:'',
                employee_id:'',
            })
        } else {
            console.log("ERROR LOADING URL RESPONSE")
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Sales Person</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"  />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.email} placeholder="Email" required type="text" name="email" id="email" className="form-control"/>
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleFormChange} value={formData.employee_id} placeholder="employee_id" required type="text" name="employee_id" id="employee_id" className="form-control"/>
                <label htmlFor="employee_id">Employee ID #</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}