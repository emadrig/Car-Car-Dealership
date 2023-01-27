import { useEffect, useState } from "react";

function ServiceHistoryList() {
	const [services, setServices] = useState([]);
	const [filterValue, setFilterValue] = useState(" ");

	const fetchData = async () => {
		const response = await fetch("http://localhost:8080/api/services/");

		if (response.ok) {
			const data = await response.json();
			setServices(data.services);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredServices = () => {
		if (filterValue === " ") {
			return services;
		} else {
			return services.filter((service) =>
				service.vin.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
	};

	const handleChange = (e) => {
		setFilterValue(e.target.value);
	};

	const isVip = (serviceVIP) => {
		if (serviceVIP === true) {
			return (
				<td>
					<b>Car Royalty</b>
				</td>
			);
		} else {
			return <td>Car Noob</td>;
		}
	};

	const isFinished = (service) => {
		if (service.is_finished === true) {
			return (
				<td>
					<button className="btn btn-success" value={service.id}>
						Completed
					</button>
				</td>
			);
		} else {
			return (
				<td>
					<button className="btn btn-secondary" value={service.id}>
						Upcoming
					</button>
				</td>
			);
		}
	};

	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<td>
							<input onChange={handleChange} placeholder="Filter by VIN" />
						</td>
					</tr>
					<tr>
						<th>Vin</th>
						<th>Customer Name</th>
						<th>Date and Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th>VIP Status</th>
						<th>Cancel or Mark Finished</th>
					</tr>
				</thead>
				<tbody>
					{filteredServices().map((service) => {
						return (
							<tr key={service.id} value={service.id}>
								<td>{service.vin}</td>
								<td>{service.customer_name}</td>
								<td>{new Date(service.date_time).toLocaleString()}</td>
								<td>{service.technician.name}</td>
								<td>{service.reason}</td>
								{isVip(service.is_vip)}
								{isFinished(service)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ServiceHistoryList;
