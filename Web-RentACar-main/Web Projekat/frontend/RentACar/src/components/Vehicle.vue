<template>
    <div class="content">
        <div class="vehicleContainer"></div>
        <div class="model">
            <h2>{{ localVehicle.brand + ", " +  localVehicle.model }}</h2>
        </div>
        <div class="vehicleImage">
            <img :src="vehicleImage.image">
        </div>
        <div  class="price">
            <h4>Price:</h4>
            <p>{{ localVehicle.price }}</p>
        </div>
        <div class="type">
            <h4>Type:</h4>
            <p>{{ localVehicle.type }}</p>
        </div>
        <div class="transmission">
            <h4>Transmission:</h4>
            <p>{{ localVehicle.transmissionType }}</p>
        </div>
        <div class="fuel">
            <h4>Fuel:</h4>
            <p>{{ localVehicle.fuelType }}</p>
        </div>
        <div class="buttons">
            <img src="../assets/bin.png" v-on:click.prevent="deleteVehicle(localVehicle.id,localVehicle.rentacarId)">
            <img src="../assets/pen.png" v-on:click.prevent="changeVehicle(localVehicle.id,localVehicle.rentacarId)">
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Vehicle",
    props: {
        vehicle: Object,
        rentacarId: Number,
        showFirstButtons: {
            type: Boolean,
            default: true,
        },
        showSecondButtons: {
            type: Boolean,
            default: false 
        },
        deleteVehicle: Function,
        changeVehicle: Function,
        putInBasketVehicle: Function,
    },
    data(){
        return {
            localVehicle: this.vehicle, 
        }
    },
    computed: {
        vehicleImage(){
            return {
                ...this.localVehicle,
                image:
                this.localVehicle.image && require(`../assets/cars/${this.localVehicle.image}`),
            };
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
      async getData() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/rentacar/${this.id}", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.vehicle = response.data;
          console.log(this.vehicle);
          console.log(this.vehicle);
          this.vehicles = this.vehicle.vehicles;
          
        } catch (error) {
            console.error(error);
            window.alert("Error occurred while fetching rentacar data.");
        }
      },
    },
};
</script>

<style>

</style>