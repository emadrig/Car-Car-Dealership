import { useEffect, useState } from "react";

function SalesList() {
    const [sales, setSales] = useState([]);
    const [selectedSalesPerson, setSelectedSalesPerson] = useState('');
    const [salesPersons, setSalesPersons] = useState([]);

    const getData = async () => {
        const response = await fetch("http://localhost:8090/api/sales/");

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setSales(data.sales)
            console.log(data.sales)
        }
    }

    const fetchSalesPersons = async () => {
        const response = await fetch('http://localhost:8090/api/salesperson/');
        if (response.ok) {
            const data = await response.json();
            console.log("This is fetchSalesPersons data:", data)
            setSalesPersons(data.salesperson)
            console.log("This is salesPersons after set:", salesPersons)
        }
    }

    const filteredSales = sales.filter(sale => sale.salesperson.name === selectedSalesPerson)

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        fetchSalesPersons();
    }, [])

    const handleSalesPersonChange = (e) => {
        const value = e.target.value;
        const selectedSalesPersonName = salesPersons.find(person => person.employee_id === value).name;
        setSelectedSalesPerson(selectedSalesPersonName);
    }

	return (
        <div>
            <>
            <button onClick={() => setSelectedSalesPerson('')}>Reset</button>
            <select onChange={handleSalesPersonChange} value={selectedSalesPerson}>
                <option>Select Sales Person</option>
                {salesPersons.map((salesPerson) => {
                    return (
                        <option key={salesPerson.employee_id} value={salesPerson.employee_id}>
                            {salesPerson.name}
                        </option>
                    )
                })}
            </select>
            </>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sales price</th>
                    </tr>
                </thead>
                <tbody>
                {selectedSalesPerson !== ''? 
                    filteredSales.map(sale => {
                        return (
                            <tr key={sale.automobile.vin}>
                                <td>{sale.salesperson.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.sales_price}</td>
                            </tr>
                        );
                    }) : 
                    sales.map(sale => {
                        return (
                            <tr key={sale.automobile.vin}>
                                <td>{sale.salesperson.name}</td>
                                <td>{sale.customer.name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.sales_price}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
	);
}

export default SalesList;
