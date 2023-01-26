import React, {useState, useEffect, useDebugValue} from 'react';

export default function SalesPersonForm(){
    const [formData, setFormData] = useState({
        name: '',
        address:'',
        email: '',
        phone_number: '',
    })
    const[addressData, setAddressData] = useState({
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const customerUrl = 'http://localhost:8090/api/customers/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json()
            console.log(newCustomer)
            setFormData({
                name: '',
                address:'',
                email: '',
                phone_number: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                country: '',
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

    const handleAddressChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        
        setAddressData({
            ...addressData,
            [inputName]: value
        })

        const address = `${addressData.street_address}, ${addressData.city}, ${addressData.state} ${addressData.zip_code}, ${addressData.country}`;
        
        setFormData({
            ...formData,
            address:address
        })
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Customer</h1>
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
                <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone Number" required type="text" name="phone_number" id="phone_number" className="form-control"/>
                <label htmlFor="email">Phone Number</label>
              </div>
                <div className="address-section">
                <h2>Address</h2>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={addressData.street_address} placeholder="Street Address" type="text" name="street_address" id="street_address" className="form-control"  />
                    <label htmlFor="street_address">Street Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={addressData.city} placeholder="City" type="text" name="city" id="city" className="form-control"  />
                    <label htmlFor="city">City</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={addressData.state} placeholder="State" type="text" name="state" id="state" className="form-control"  />
                    <label htmlFor="state">State</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={addressData.zip_code} placeholder="Zip Code" type="text" name="zip_code" id="zip_code" className="form-control"  />
                    <label htmlFor="zip_code">Zip Code</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange} value={addressData.country} placeholder="Country" type="text" name="country" id="country" className="form-control"  />
                    <label htmlFor="zip_code">Country</label>
                </div>               
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}