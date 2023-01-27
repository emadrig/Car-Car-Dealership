import React, { useEffect, useState } from "react";

function ManufacturerForm() {
	const [manufacturers, setManufacturers] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
	});

	const fetchData = async () => {
		const url = "http://localhost:8100/api/manufacturers/";
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		for (let manufacturer in manufacturers) {
			if (formData.name === manufacturer.name) {
				return alert("Manufacturer Already Exists");
			}
		}

		const manfufacturerUrl = "http://localhost:8100/api/manufacturers/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(manfufacturerUrl, fetchConfig);
		if (response.ok) {
			setFormData({
				name: "",
			});
		}
	};

	const handleFormChange = (e) => {
		const value = e.target.value;
		const inputName = e.target.name;

		setFormData({
			...formData,
			[inputName]: value,
		});
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a new Manufacturer</h1>
					<form onSubmit={handleSubmit} id="create-location-form">
						<div className="form-floating mb-3">
							<input
								value={formData.name}
								placeholder="Name"
								onChange={handleFormChange}
								required
								type="text"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="name">Name</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ManufacturerForm;
