import { useEffect, useState } from "react";

function VehicleModelsList() {
	const [vehicles, setVehicles] = useState([]);

	const getData = async () => {
		const vehicleUrl = "http://localhost:8100/api/models/";
		const response = await fetch(vehicleUrl);

		if (response.ok) {
			const data = await response.json();
			setVehicles(data.models);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>Manufacturer</th>
					<th>Picture</th>
				</tr>
			</thead>
			<tbody>
				{vehicles.map((vehicle) => {
					return (
						<tr key={vehicle.name}>
							<td>{vehicle.name}</td>
							<td>{vehicle.manufacturer.name}</td>
							<td>
								<img className="rounded float-right" width="20%" src={vehicle.picture_url} alt="new" />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default VehicleModelsList;
