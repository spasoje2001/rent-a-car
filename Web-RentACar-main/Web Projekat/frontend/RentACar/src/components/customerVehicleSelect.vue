<template>
    <div class="page">
        <header>
            <div class="buttons">
                <div class="date-picker-container">
                    <label>Start Date:</label>
                    <input type="date" id="dateFrom" v-model="dates.dateFrom" required>
                </div>
                <div class="date-picker-container">
                    <label>End Date:</label>
                    <input type="date" id="dateTo"  v-model="dates.dateTo" required>
                </div>
                <button id="findVehiclesButton"  v-on:click="selectDates" >Find Available Vehicles</button>
                <button id="checkoutButton" v-if="shoppingStarted" v-on:click="finnishOrder">Finnish your order</button>
            </div>
        </header>
        <div v-if="areDatesLocked" class="hole-container">
            <div class="vehicle-scroll-container">
                <vehicle
                    v-for="vehicle in vehicles"
                    :key="vehicle.id"
                    :vehicle="vehicle"
                    :putInBasket="putInBasket"
                >
                </vehicle>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import VehicleForRent from "./vehicleForRent.vue";
    export default{
        data(){
            return{
                dates: {
                    dateFrom: "",
                    dateTo: "",
                },
                areDatesLocked: false,
                rentacars: [],
                vehicles: [],
                selectedVehicles: [],
                shoppingStarted: false,
                basket: {},
                basketPrice: 0
            }
        },
        components: {
            "vehicle": VehicleForRent,
        },

        methods: {
            async selectDates() {
                if (this.dates.dateFrom && this.dates.dateTo) {
                    this.areDatesLocked = true;
                    this.getData();
                } else {
                    alert("Select dates first!");
                    return;
                }
            },
            async getData() {
                try {
                    console.log(this.dates.dateFrom);
                    const response = await axios.get(
                        "http://localhost:3000/rentacar/available",
                        { params: this.dates }
                    );
                    this.rentacars = response.data;
                    this.vehicles = this.rentacars.flatMap((rentacar) => rentacar.vehicles);
                    console.log(this.rentacars[0].vehicles[0].fuelType);
                } catch (error) {
                    console.log("Oops");
                }
            },
            async putInBasket(vehicleId) {
                try {
                    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId)
                    if (selectedVehicle){
                        this.selectedVehicles.push(selectedVehicle);
                        alert('Vehicle' + selectedVehicle.brand + ' ' + selectedVehicle.model + ' has been added to the basket');
                        this.shoppingStarted = true;
                        this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleId && vehicle.rentacarId === selectedVehicle.rentacarId);
                    }
                } catch (error) {
                    console.log("Failed");
                }
            },
            async finnishOrder() {
                this.basket.vehicles = this.selectedVehicles;
                console.log(this.basket.vehicles);
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data;
                this.basket.user = user;
                this.selectedVehicles.forEach((vehicle) => {
                    this.basketPrice += parseInt(vehicle.price);
                });
                this.basket.price = this.basketPrice;
                this.basket.dateTime = this.dates.dateFrom;

                const date1 = new Date(this.dates.dateFrom);
                const date2 = new Date(this.dates.dateTo);

                const timeDifference = date2.getTime() - date1.getTime();
                this.basket.leaseDuration = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
                axios
                    .post("http://localhost:3000/basket", this.basket)
                    .then((response) => {
                        const { message } = response.data;
                        alert(message);
                        this.$router.push("/basket");
                    })
                    .catch((error) => {
                        alert(error.response.data.error);
                    });
            },
            
        }
    }
</script>

<style scoped>
.page {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-size: contain;
  background-repeat: no-repeat;
  color: #df4c73;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: calc(100vh - 320px);
}

header {
  background-color: #df4c73;
  color: white;
  width: 98.6%; /* Stretch the whole width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.buttons {
    display: flex;
    gap: 10px;
}

button {
    padding: 10px 15px;
    background-color: white;
    color: #df4c73;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
}

.date-picker-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.vehicle-scroll-container {
    display: flex;
    flex-direction: start;
    justify-content: start;
    align-items: start;
    gap: 50px;
    margin-top: 20px;
}

</style>