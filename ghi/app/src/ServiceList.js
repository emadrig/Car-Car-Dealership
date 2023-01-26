import { useEffect, useState } from "react";

function ServiceList() {
	const [services, setServices] = useState([]);

	const fetchData = async () => {
		const response = await fetch("http://localhost:8080/api/services/");
		// console.log(await response.json());

		if (response.ok) {
			const data = await response.json();
			console.log(data);
			console.log(data.services);
			setServices(data.services);
			console.log("this is after setService", services);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Vin</th>
						<th>Customer Name</th>
						<th>Date and Time</th>
						<th>Technician</th>
						<th>Reason</th>
					</tr>
				</thead>
				<tbody>
					{services.map((service) => {
						return (
							<tr key={service.id} value={service.id}>
								<td>Hello there</td>
								<td>{service.customer_name}</td>
								<td>{service.date_time}</td>
								<td>{service.technician.name}</td>
								<td>{service.reason}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ServiceList;
