<template>
    <div class="background">
      <div class="vertical">
        <div class="scroll-container">
          <div class="grid-item-2">
            <vehicle
              v-for="vehicle in vehicles"
              :key="vehicle.id"
              :vehicle="vehicle"
              :isBasket="isBasket"
              @car-added="added"
              @car-deleted="removed"
              :delete-from-basket="deleteFromBasket"
            >
            </vehicle>
          </div>
        </div>
      </div>
       <div v-if="totalPriceWithDiscount != 0" class="centerIt">
        <div>
        <label class="textSum2">old price: </label>
        <label class="valueSum">{{ totalPrice }}</label>
        </div>
        <div>
          <label class="textSum">with discount: </label>
          <label class="valueSum2">{{ totalPriceWithDiscount }}</label>
        </div>
        <div>
          <button type="submit" class="rentButton" v-on:click="rentCars">RENT</button>
         </div>
      </div>
    <div v-else>
      <label class="textSum">Total sum: </label>
      <label class="valueSum2">{{ totalPrice }}</label>
      <div>
          <button type="submit" class="rentButton" v-on:click="rentCars">RENT</button>
      </div>
    </div>
    </div>
</template>

  
<script>
  import axios from "axios";
  import VehicleForRent from "./vehicleForRent.vue";
  export default {
    data() {
      return {
        vehicles: [],
        basket: [],
        isBasket: true,
        totalPrice: 0,
        totalPriceWithDiscount: 0,
        order: {
          uniqueOrderId: "",
          rentedVehicles: [],
          rentACar: null,
          rentalTimeStamp: "",
          leaseDuration: 0,
          price: 0,
          customer: null,
          status: "",
        },
        user: null,
      };
    },
    components: {
      "vehicle": VehicleForRent,
    },
    mounted() {
      this.getData();
    },
    methods: {
        async getData() {
            try {
                const token = localStorage.getItem("token");
                const response1 = await axios.get("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.user = response1.data;
                const response = await axios.get(
                    "http://localhost:3000/basket/user/" + this.user.id
                );
                this.basket = response.data;
                this.vehicles = this.basket.vehicles.map((vehicle) => ({
                    ...vehicle,
                    quantity: 1, // Initialize the quantity to 0
                }));
                this.totalPrice = parseInt(this.basket.price);
                if(this.user.customerTier.tierName !== null){
                    this.totalPriceWithDiscount = (100-this.user.customerTier.discount)/100 * parseInt(this.basket.price);
                    console.log(this.totalPriceWithDiscount);
                }

            } catch (error) {
                console.log("Oops");
            }
        },
        async added(vehicle) {
            const addedVehicle = this.vehicles.find((obj) => obj.id === vehicle.id);
            addedVehicle.quantity++;
            this.totalPrice += parseInt(vehicle.price);
            if(this.user.customerTier.tierName !== null){
                this.totalPriceWithDiscount = (100-this.user.customerTier.discount)/100 * parseInt(this.totalPrice);
                console.log(this.totalPriceWithDiscount);
            }
        },
        async removed(vehicle) {
            const removedVehicle = this.vehicles.find((obj) => obj.id === vehicle.id);
            if (removedVehicle.quantity - 1 > 0) {
                removedVehicle.quantity--;
                this.totalPrice -= parseInt(vehicle.price);
                if(this.user.customerTier.tierName !== null){
                    this.totalPriceWithDiscount = (100-this.user.customerTier.discount)/100 * parseInt(this.totalPrice);
                    console.log(this.totalPriceWithDiscount);
                }
            } else {
                alert("You can't have less of 1 vehicle");
            }
        },
        async rentCars() {
            this.order.uniqueOrderId = this.generateRandomString();
            this.order.rentedVehicles = this.vehicles;
            console.log(this.vehicles);
            this.order.rentACar = parseInt(this.vehicles[0].rentacarId);
            console.log(this.order.rentACar);
            this.order.rentalTimeStamp = this.basket.dateTime;
            this.order.leaseDuration = this.basket.leaseDuration;
            if(this.totalPriceWithDiscount != 0){
                this.order.price = this.totalPriceWithDiscount;
            }
            else{
                this.order.price = this.totalPrice;
            }
            this.order.customer = this.basket.user;
            this.order.status = "Processing";
        
            axios
                .post("http://localhost:3000/orders", this.order)
                .then((response) => {
                    const { message } = response.data;
                    alert(message);
                    this.$router.push('./customerOrders');
                })
                .catch((error) => {
                    alert(error.response.data.error);
                });
  
            axios
                .delete("http://localhost:3000/basket/" + this.basket.id)
                .catch((error) => {
                    alert(error.response.data.error);
                })
            
            
        },
        generateRandomString() {
            const charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let result = "";
  
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                result += charset.charAt(randomIndex);
            }
            return result;
        },
        deleteFromBasket(vehicle) {
            const confirmation = confirm(
                "Are you sure you want to remove the vehicle from the basket?"
            );
  
            if (confirmation) {
                this.vehicles = this.vehicles.filter((veh) => veh.id !== vehicle.id);
                this.totalSum -= vehicle.price * vehicle.quantity;
            }
        },
    }
  };
  </script>