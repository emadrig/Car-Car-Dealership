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
