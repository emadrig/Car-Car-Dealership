import { useEffect, useState } from "react";
import "./App.css";

export default function SalesHistory() {
    const [sales, setSales] = useState([]);
    const [selectedSalesPerson, setSelectedSalesPerson] = useState('');
    const [salesPersons, setSalesPersons] = useState([]);

    const getData = async () => {
        const response_sales = await fetch('http://localhost:8090/api/sales/');
        const response_salesperson = await fetch('http://localhost:8090/api/salesperson/');

        if (response_sales.ok && response_salesperson.ok) {
            const data_sales = await response_sales.json();
            const data_salesperson = await response_salesperson.json();

            setSales(data_sales.sales)
            setSalesPersons(data_salesperson.salesperson)
        }
    }

    const handleDelete = async (sale) => {

        const deleteSaleUrl = `http://localhost:8090/api/sales/${sale.pk}`
    
        const response = await fetch(deleteSaleUrl, {
          method: 'DELETE',
        });
        if (response.ok){
          setSales(sales.filter(s => s.pk !== sale.pk));
          console.log(`Shoe with id ${sale} has been deleted`);
        } else {
          console.log("Error deleting shoe")
        }
      }

    const filteredSales = sales.filter(sale => sale.salesperson.name === selectedSalesPerson)

    useEffect(() => {
        getData();
    }, []);



    const handleSalesPersonChange = (e) => {
        const value = e.target.value;
        const selectedSalesPersonName = salesPersons.find(person => person.employee_id === value).name;
        setSelectedSalesPerson(selectedSalesPersonName);
    }

	return (
        <div>
            <select className="form-select form-select-sm mb-3 f-s" onChange={handleSalesPersonChange} value={selectedSalesPerson}>
                <option>Select Sales Person</option>
                {salesPersons.map((salesPerson) => {
                    return (
                        <option key={salesPerson.employee_id} value={salesPerson.employee_id}>
                            {salesPerson.name}
                        </option>
                    )
                })}
            </select>
            <div className="reset-button">
                <button  onClick={() => setSelectedSalesPerson('')}>Reset</button>
            </div>
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
                                <td>
                                <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <button onClick={() => handleDelete(sale)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fas fa-trash"></i>Delete</button>
                                </li>
                                </ul>
                            </td>
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
                                <td>
                                <ul className="list-inline m-0">
                                <li className="list-inline-item">
                                    <button onClick={() => handleDelete(sale)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fas fa-trash"></i>Delete</button>
                                </li>
                                </ul>
                            </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
	);
}
