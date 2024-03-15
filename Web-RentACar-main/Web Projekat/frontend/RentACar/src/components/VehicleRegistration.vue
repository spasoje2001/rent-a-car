<template>
    <div class="registrationContainer">
      <div class="registrationForm">
        <form v-on:submit.prevent="submitForm">
          <div class="group">
            <label for="brand">Brand:</label>
            <input id="brand" v-model="vehicle.brand" required/>
          </div>
          <div class="group">
            <label for="model">Model:</label>
            <input type="model" id="model" v-model="vehicle.model" required/>
          </div>
          <div class="group">
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="vehicle.price" required/>
          </div>
          <div class="group">
            <label for="vehicleType">Vehicle type:</label>
            <select id="vehicleType" v-model="vehicle.vehicleType" required>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="MobileHome">Mobile home</option>
                </select>          
          </div>
          <div class="group">
            <label for="transmissionType">TransmissionType:</label>
            <select id="transmissionType" price="transmissionType" v-model="vehicle.transmissionType" required>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div class="group">
            <label for="fuelType">Fuel type:</label>
            <select id="fuelType" v-model="vehicle.fuelType" required>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Eletric">Electric</option>
                </select>          
          </div>
          <div class="group">
            <label for="consumption">Consumption:</label>
            <input type="text" id="consumption" v-model="vehicle.consumption" required/>
          </div>
          <div class="group">
            <label for="doors">Doors:</label>
            <input type="number" id="doors" v-model="vehicle.doors" required/>
          </div>          
          <div class="group">
            <label for="maxPersons">Max persons:</label>
            <input type="number" id="maxPersons" v-model="vehicle.maxPersons" required/>
          </div>          
          <div class="group">
            <label for="image">Image:</label>
            <input type="file" accept="image/*" v-on:change="fileUpload" required class="custom-file-input" name="logoFile"/>
          </div>          
          <div class="group">
            <label for="description">Description:</label>
            <textarea type="text" id="description" v-model="vehicle.description"/>
          </div>
          <div class="group">
            <button class="submitButton" type="submit">Register</button>
          </div>
        </form>
      </div>
      </div>
    </template>
    
    <script>
    import axios from "axios";
    
    export default {
      name: "VehicleRegistration",
      data() {
        return {
          rentacarId: null,
          vehicle: {
            brand: "",
            model: "",
            price: 0,
            vehicleType: "",
            transmissionType: "",
            fuelType: "",
            consumption: 0,
            doors: 4,
            maxPersons: 0,
            description: '',
            image: '',
            status: 'Available',
            rentacarId: null,
          }
        };
      },
      mounted(){
        this.rentacarId = this.$route.params.id;
        console.log(this.rentacarId);
      },
      methods: {
        submitForm(){
          if (
            !(this.vehicle.brand &&
            this.vehicle.model &&
            this.vehicle.price &&
            this.vehicle.vehicleType &&
            this.vehicle.transmissionType &&
            this.vehicle.fuelType &&
            this.vehicle.consumption &&
            this.vehicle.doors &&
            this.vehicle.maxPersons &&
            this.vehicle.image &&
            this.vehicle.status  
          )) {
            alert("Please fill in all the required fields.");
            return;
          }
          console.log(this.vehicle);
          this.vehicle.rentacarId = this.rentacarId;
          axios
           .put(`http://localhost:3000/rentacar/vehicleAdded/${this.rentacarId}`, this.vehicle)
           .then((response) => {
             alert("Vehicle added successfully.");
             this.$router.push("/home");  ////////
           })
           .catch((error) => {
           alert(error.response.data.error);
           });
          
        },
        fileUpload(e) {
            const file = e.target.files[0];
            this.vehicle.image = file.name;
        },
      },
    };
    </script>
    
    <style scoped>

    </style>