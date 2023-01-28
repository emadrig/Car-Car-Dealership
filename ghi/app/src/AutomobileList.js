import { useEffect, useState } from "react";

function AutomobileList() {
	const [automobiles, setAutomobiles] = useState([]);

	const getData = async () => {
		const automobileUrl = "http://localhost:8100/api/automobiles/";
		const response = await fetch(automobileUrl);

		if (response.ok) {
			const data = await response.json();
			setAutomobiles(data.autos);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Vin</th>
					<th>Color</th>
					<th>Year</th>
					<th>Model</th>
					<th>Manufacturer</th>
				</tr>
			</thead>
			<tbody>
				{automobiles.map((auto) => {
					return (
						<tr key={auto.id}>
							<td>{auto.vin}</td>
							<td>{auto.color}</td>
							<td>{auto.year}</td>
							<td>{auto.model.name}</td>
							<td>{auto.model.manufacturer.name}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default AutomobileList;
