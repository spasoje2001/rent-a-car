<template>
    <div class="one-rent-car">
      <img :src="rentalLogo.logo" class="img-car" />
      <div class="image">
        <div class="row-div">
          <h3 class="car-name">{{ car.name }}</h3>
        </div>
        <div>
          <h3>
            <img src="../assets/pin.png" alt="Pin Icon"  class="img-pin" />
            {{ car.location.address.street + ", " + car.location.address.city }}
          </h3>
        </div>
      </div>
      <div class="bottom">
        <router-link v-bind:to="'/singleObject/' + car.id">
          <h3 class="details">View details</h3>
        </router-link>
        <h3>Grade: {{ car.rating }}</h3> 
        <router-link v-bind:to="'/vehicleRegistration/' + car.id">
          <h3 class="details">Add vehicle</h3>
        </router-link>  
      </div> 
    </div>
  </template>
  
  <script>
  //import axios from "axios";
  export default {
    name: "OneVehicle",
    props: ["car"],
    computed: {
      rentalLogo() {
        return {
          ...this.car,
          logo:
            this.car.logo && require(`../assets/${this.car.logo}`),
        };
      }
    },
  };
  </script>
  
  <style scoped>
  .one-rent-car {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    box-sizing: border-box;
    width: 500px;
    height: 200px;
  }
  
  .img-car {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  
  .image {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .row-div {
    display: flex;
    align-items: center;
  }
  
  .car-name {
    color: #007bff;
    margin: 0;
  }
  
  .location {
    display: flex;
    align-items: center;
  }
  
  .location-info {
    color: #df4c73;
    margin: 0;
  }
  
  .img-pin {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }  
  
  .details {
    color: #007bff;
    margin: 0;
    text-decoration: none;
  }
  
  .grade {
    color: #df4c73;
    margin: 0;
  }
  </style>