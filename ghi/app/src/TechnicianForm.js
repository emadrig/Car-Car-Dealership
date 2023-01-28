import React, { useEffect, useState } from "react";

function TechnicianForm() {
	const [formData, setFormData] = useState({
		name: "",
		employee_number: "",
	});

	const handleSubmit = async (event) => {
		event.preventDefault();

		const technicianUrl = "http://localhost:8080/api/technicians/";

		const fetchConfig = {
			method: "post",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(technicianUrl, fetchConfig);

		if (response.ok) {
			setFormData({
				name: "",
				employee_number: "",
			});
		}
	};

	const handleFormChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		setFormData({
			...formData,
			[inputName]: value,
		});
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a new Technician</h1>
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
						<div className="form-floating mb-3">
							<input
								value={formData.employee_number}
								placeholder="Room count"
								onChange={handleFormChange}
								required
								type="number"
								name="employee_number"
								id="employee_number"
								className="form-control"
							/>
							<label htmlFor="employee_number">Employee Number</label>
						</div>
						<button className="btn btn-primary">Add</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default TechnicianForm;
