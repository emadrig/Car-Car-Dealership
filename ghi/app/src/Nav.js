import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-success">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					CarCar
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/technicians/new"
							>
								New Technician
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/services/new"
							>
								New Service Appointment
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/services/">
								Service Appointments
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/services/history/"
							>
								Service History
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/manufacturers/"
							>
								See Manufacturers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/manufacturers/new"
							>
								Add Manufacturer
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/automobiles/"
							>
								List Automobiles
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/automobiles/new"
							>
								Add Automobile
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/vehicles/">
								See Vehicles
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/vehicles/new"
							>
								Add Vehicle
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/salesperson/new"
							>
								New Sales Person
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/customer/new"
							>
								New Customer
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								aria-current="page"
								to="/sales/list"
							>
								Sales List
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;

{
	/* <Dropdown>
	<DropdownToggle caret color="primary">
		Services
	</DropdownToggle>
	<DropdownMenu>
		<NavLink
			className="nav-link dropdown-item"
			aria-current="page"
			to="/services/new"
		>
			<DropdownItem>New Service Appointment</DropdownItem>
		</NavLink>
		<NavLink
			className="nav-link dropdown-item"
			aria-current="page"
			to="/services/"
		>
			<DropdownItem>Service Appointments</DropdownItem>
		</NavLink>
		<NavLink
			className="nav-link dropdown-item"
			aria-current="page"
			to="/services/history/"
		>
			<DropdownItem>Service History</DropdownItem>
		</NavLink>
	</DropdownMenu>
</Dropdown>; */
}
