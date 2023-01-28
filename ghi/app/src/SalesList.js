import { useEffect, useState } from "react";

function SalesList() {
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response_sales = await fetch("http://localhost:8090/api/sales/");

        if (response_sales.ok) {
            const data_sales = await response_sales.json();

            setSales(data_sales.sales)
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

    useEffect(() => {
        getData();
    }, []);


	return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person</th>
                        <th>employee ID</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Sales price</th>
                    </tr>
                </thead>
                <tbody>
            {sales.map(sale => {
                    return (
                        <tr key={sale.automobile.vin}>
                            <td>{sale.salesperson.name}</td>
                            <td>{sale.salesperson.employee_id}</td>
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

export default SalesList;
