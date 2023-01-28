import React, {useState, useEffect} from 'react';

export default function SalesForm(){
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson:'',
        customer: '',
        sales_price: ''
    })

    const [automobiles, setAutomobiles] = useState([]);
    const [salespersons, setSalesPersons] = useState([]);
    const [customers, setCustomers] = useState([]);

    const getAutomobiles = async () => {
        const response_automobiles = await fetch("http://localhost:8100/api/automobiles/");

        if (response_automobiles.ok) {
            const data_automobiles = await response_automobiles.json();
            setAutomobiles(data_automobiles.autos)
        } else {
            console.log("ERROR GETTING AUTOMOBILE RESPONSE")
        }
    }
    const getSalespersons = async () => {
        const response_salespersons = await fetch('http://localhost:8090/api/salesperson/');

        if (response_salespersons.ok) {
            const data_salespersons = await response_salespersons.json();;
            setSalesPersons(data_salespersons.salesperson)
        } else {
            console.log("ERROR GETTING SALESPERSONS RESPONSE")
        }
    }
    const getCustomers = async () => {
        const response_customers = await fetch('http://localhost:8090/api/customers/')

        if (response_customers.ok) {
            const data_customers = await response_customers.json();
            setCustomers(data_customers.customers)
        } else {
            console.log("ERROR GETTING CUSTOMER RESPONSE")
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const salesUrl = 'http://localhost:8090/api/sales/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json()
            setFormData({
                automobile: '',
                salesperson:'',
                customer: '',
                sales_price: ''
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

    useEffect(() => {
        getCustomers();
        getAutomobiles();
        getSalespersons();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Sale</h1>
            <form onSubmit={handleSubmit} id="create-location-form">
            <select className="form-select form-select-sm mb-3" onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson">
                <option>Select Sales Person</option>
                {salespersons.map((salesPerson) => {
                    return (
                        <option key={salesPerson.employee_id} value={salesPerson.employee_id}>
                            {salesPerson.name}
                        </option>
                    )
                })}
            </select>
            <select className="form-select form-select-sm mb-3" onChange={handleFormChange} value={formData.customer.id} required name="customer" id="customer">
                <option>Select Customer</option>
                {customers.map((customer) => {
                    return (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    )
                })}
            </select>
            <select className="form-select form-select-sm mb-3" onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile">
                <option>Select Automobile</option>
                {automobiles.map((automobile) => {
                    return (
                        <option key={automobile.vin} value={automobile.vin}>
                            {automobile.vin}
                        </option>
                    )
                })}
            </select>
              <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.sales_price} placeholder="Price" type="text" name="sales_price" id="sales_price" className="form-control"  />
                    <label htmlFor="zip_code">Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}
