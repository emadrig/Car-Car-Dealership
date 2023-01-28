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
import ManufacturerForm from "./ManufacturersForm";
import ManufacturerList from "./ManufacturerList";
import ServiceHistoryList from "./ServiceHistoryList";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import SalesHistory from "./SalesHistory";
import SalesForm from "./SalesForm";
import SalesList from "./SalesList"
import "./App.css";

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
					<Route path="automobiles">
						<Route index element={<AutomobileList />} />
						<Route path="new" element={<AutomobileForm />} />
					</Route>
					<Route path="services">
						<Route index element={<ServiceList />} />
						<Route path="new" element={<ServiceAppointmentForm />} />
						<Route path="history" element={<ServiceHistoryList />} />
					</Route>
					<Route path="manufacturers">
						<Route index element={<ManufacturerList />} />
						<Route path="new" element={<ManufacturerForm />} />
					</Route>
					<Route path="salesperson">
						<Route path="new" element={<SalesPersonForm />} />
					</Route>
					<Route path="customer">
						<Route path="new" element={<CustomerForm />} />
					</Route>
					<Route path="sales">
						<Route path="list" element={<SalesList/>} />
						<Route path="history" element={<SalesHistory />} />
						<Route path="new" element={<SalesForm />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
