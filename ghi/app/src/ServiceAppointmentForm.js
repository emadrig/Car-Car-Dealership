import React, { useEffect, useState } from "react";

function ServiceAppointmentForm() {
	const [technicians, setTechnicians] = useState([]);

	const [formData, setFormData] = useState({
		vin: "",
		customer_name: "",
		date_time: "",
		reason: "",
		techician: "",
	});

	const fetchData = async () => {
		const technicianUrl = "http://localhost:8080/api/technicians/";
		const response = await fetch(technicianUrl);

		if (response.ok) {
			const data = await response.json();
			setTechnicians(data.technicians);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		// const {technician} = formData;
		const url = "";
		const fetchConfig = {
			method: "post",
			//Because we are using one formData state object,
			//we can now pass it directly into our request!
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(url, fetchConfig);
		if (response.ok) {
			setFormData({
				vin: "",
				customer_name: "",
				date_time: "",
				reason: "",
				technicican: "",
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
					<h1>Create a new service appointment</h1>
					<form onSubmit={handleSubmit} id="create-conference-form">
						<div className="form-floating mb-3">
							<input
								onChange={handleFormChange}
								value={formData.vin}
								placeholder="Vin Number"
								required
								type="text"
								name="vin_number"
								id="vin_number"
								className="form-control"
							/>
							<label htmlFor="name">Vin Number</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormChange}
								value={formData.name}
								placeholder="Starts"
								required
								type="name"
								name="name"
								id="name"
								className="form-control"
							/>
							<label htmlFor="starts">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={handleFormChange}
								value={formData.date_time}
								placeholder="Date and Time"
								required
								type="datetime-local"
								name="date_time"
								id="date_time"
								className="form-control"
							/>
							<label htmlFor="ends">Date and Time</label>
						</div>
						<div className="mb-3">
							<label htmlFor="reason">Reason</label>
							<textarea
								onChange={handleFormChange}
								value={formData.reason}
								className="form-control"
								id="reason"
								rows="3"
								name="reason"
							></textarea>
						</div>
						<div className="mb-3">
							<select
								onChange={handleFormChange}
								value={formData.technician}
								required
								name="technician"
								id="technician"
								className="form-select"
							>
								<option value="">Choose a Technician</option>
								{technicians.map((technician) => {
									return (
										<option
											key={formData.technician}
											value={formData.technician}
										>
											{technician.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ServiceAppointmentForm;
