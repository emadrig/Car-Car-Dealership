import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import ServiceList from "./ServiceList";
import VehicleModelsList from "./VehicleModelsList";
import VehicleModelForm from "./VehicleModelForm";

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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
