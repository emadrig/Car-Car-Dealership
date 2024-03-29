import { useEffect, useState } from "react";

function ServiceList() {
	const [services, setServices] = useState([]);
	const [filterValue, setFilterValue] = useState(" ");

	const fetchData = async () => {
		const response = await fetch("http://localhost:8080/api/services/");

		if (response.ok) {
			const data = await response.json();
			setServices(
				data.services.filter((service) => service.is_finished == false)
			);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = async (service_id) => {
		const deleteUrl = `http://localhost:8080/api/services/${service_id}/`;
		const fetchConfig = {
			method: "delete",
		};

		const deleteResponse = await fetch(deleteUrl, fetchConfig);
		if (deleteResponse.ok) {
			fetchData();
		}
	};

	const handleFinished = async (service_id) => {
		const serviceResponse = await fetch(
			`http://localhost:8080/api/services/${service_id}/`
		);

		if (serviceResponse.ok) {
			const data = await serviceResponse.json();
			const putData = {};

			putData["customer_name"] = data.customer_name;
			putData["date_time"] = data.date_time;
			putData["reason"] = data.reason;
			putData["technician"] = data.technician.employee_number;
			putData["vin"] = data.vin;

			const updateUrl = `http://localhost:8080/api/services/${service_id}/`;

			const updateConfig = {
				method: "put",
				body: JSON.stringify(putData),
			};

			const updateResponse = await fetch(updateUrl, updateConfig);
			if (updateResponse.ok) {
				fetchData();
			}
		}
	};

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
								<td>
									<button
										onClick={() => handleDelete(service.id)}
										className="btn btn-danger"
										value={service.id}
									>
										Cancel
									</button>
									<button
										onClick={() => handleFinished(service.id)}
										className="btn btn-success"
										value={service.id}
									>
										Finished
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default ServiceList;
