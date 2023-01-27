import { useEffect, useState } from "react";

function ManufacturerList() {
	const [manufacturers, setManufacturers] = useState([]);

	const getData = async () => {
		const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
		const response = await fetch(manufacturerUrl);

		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Manufacturer</th>
				</tr>
			</thead>
			<tbody>
				{manufacturers.map((manufacturer) => {
					return (
						<tr key={manufacturer.name}>
							<td>{manufacturer.name}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default ManufacturerList;
