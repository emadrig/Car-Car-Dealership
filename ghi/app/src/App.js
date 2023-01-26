import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SalesPersonForm from "./SalesPersonForm";
import TechnicianForm from "./TechnicianForm";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import ServiceList from "./ServiceList";
import VehicleModelsList from "./VehicleModelsList";
import VehicleModelForm from "./VehicleModelForm";
import CustomerForm from "./CustomerForm";
import SalesList from "./SalesList";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="technicians">
						<Route path="new" element={<TechnicianForm />} />
					</Route>
					<Route path="vehicles">
						<Route index element={<VehicleModelsList />} />
						<Route path="new" element={<VehicleModelForm />} />
					</Route>
					<Route path="services">
						<Route index element={<ServiceList />} />
						<Route path="new" element={<ServiceAppointmentForm />} />
					</Route>
					<Route path="salesperson">
						<Route path="new" element={<SalesPersonForm />} />
					</Route>
					<Route path="customer">
						<Route path="new" element={<CustomerForm />} />
					</Route>
					<Route path="sales">
						<Route path="list" element={<SalesList />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
