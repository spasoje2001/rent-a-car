import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import UpdateProfile from './components/UpdateProfile.vue'
import CustomerVehicleSelect from './components/customerVehicleSelect.vue'
import CustomerBasket from './components/CustomerBasket.vue'
import MainPage from './components/MainPage.vue'
import CustomerOrders from './components/CustomerOrders'
import ManagerOrders from './components/ManagerOrders'
import RentalRegistration from './components/Administrator/RentalRegistration.vue'
import RentacarObject from './components/RentacarObject.vue'
import Vehicle from './components/Vehicle.vue'
import VehicleRegistration from './components/VehicleRegistration.vue'
import UpdateVehicle from "./components/UpdateVehicle.vue"
import ManagerRegistration from "./components/Administrator/ManagerRegistration.vue"
import ViewUsers from './components/ViewUsers.vue'
import SuspiciousUsers from './components/SuspiciousUsers.vue'
import CreateManager from './components/CreateManager.vue'

export default [
    {path: '/', component: Login},
    {path: '/login', component: Login},
    {path: '/registration', component: Register},
    {path: '/rentVehicle', component: CustomerVehicleSelect},
    {path: '/basket', component: CustomerBasket },
    {path: '/profile', component: Profile},
    {path: '/updateProfile', component: UpdateProfile},
    {path: '/home', component: MainPage},
    {path: '/customerOrders', component: CustomerOrders},
    {path: '/rentalOrders/:id', component: ManagerOrders},
    {path: '/rentalRegistration', component: RentalRegistration},
    { path: "/singleObject/:id", component: RentacarObject },
    { path: "/vehicle", component: Vehicle },
    { path: "/vehicleRegistration/:id", component: VehicleRegistration },
    { path: "/updateVehicle/:idV/:idC", component: UpdateVehicle },
    { path: "/managerRegistration", component: ManagerRegistration },
    { path: "/users", component: ViewUsers},
    {path: "/suspicious", component: SuspiciousUsers},
    {path: "/createManager", component: CreateManager}
]