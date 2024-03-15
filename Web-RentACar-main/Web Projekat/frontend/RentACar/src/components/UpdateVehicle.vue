<template>
    <div class="backround-container">
        <div class="hole-container">            
            <form v-on:submit.prevent="changeVehicle">
              <h2 id="title">Change vehicle</h2>
              <div>
                <label for="brand">Brand: </label>
                <input type="text" id="brand" v-model="form.brand" required>
            </div>
            <div>

                <label for="model">Model: </label>
                <input type="text" id="model" v-model="form.model" required>
            </div>
                <div>

                <label for="price">Price: </label>
                <input type="number" id="price" v-model="form.price" required>
            </div><div>
                <label for="type">Transmission type: </label>
                <select id="type" v-model="form.transmissionType" required>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                </select>
            </div><div>
                <label for="type">Type: </label>
                <select id="type" v-model="form.vehicleType" required>
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="MobileHome">Mobile home</option>
                </select>
            </div><div>
                <label for="fuel">Fuel type: </label>
                <select id="fuel" v-model="form.fuelType" required>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Eletric">Electric</option>
                </select>
            </div><div>
                <label for="consumption">Consumption: </label>
                <input type="number" id="consumption" v-model="form.consumption" required>
            </div><div>
                <label for="doors">Number of doors: </label>
                <input type="number" id="doors" v-model="form.doors" required>
            </div><div>
                <label for="maxPersons">Max persons: </label>
                <input type="number" id="maxPersons" v-model="form.maxPersons" required>
            </div><div>
                <label for="image">Change image: </label>
                  <input type="file" name="logoFile" id="logoFile" accept="image/*"
                    @change="fileUpload"
                    class="custom-file-input">
            </div><div>
                <label for="description">Description: </label>
                <textarea id="description" v-model="form.description"></textarea>
            </div><div>
                <button type="submit">Change vehicle</button>
            </div>
            </form>
  
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    data() {
        return {
            vehicleId: this.$route.params.idV,
            rentacarId: this.$route.params.idC,
            form: {
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
        }
    },
    methods:{
        async getData() {
        try {
            const response = await axios.get("http://localhost:3000/vehicleRegistration/"+ this.vehicleId);
            const vehicleData = response.data;
            this.form.brand = vehicleData.brand;
            this.form.model = vehicleData.model;
            this.form.price = vehicleData.price;
            this.form.vehicleType = vehicleData.vehicleType;
            this.form.rentacarId = vehicleData.rentacarId;
            this.form.transmissionType = vehicleData.transmissionType;
            this.form.fuelType = vehicleData.fuelType;
            this.form.consumption = vehicleData.consumption;
            this.form.doors = vehicleData.doors;
            this.form.maxPersons = vehicleData.maxPersons;
            this.form.description = vehicleData.description;
            this.form.image = vehicleData.image;
            this.form.status = vehicleData.status;
        } catch (error) {
            if (error.response.status === 401) {
            this.$router.push("/home");
            }
            console.error(error);
        }
    },
    changeVehicle() {
       if (
          !this.form.brand ||
          !this.form.model ||
          !this.form.price ||
          !this.form.vehicleType ||
          !this.form.transmissionType ||
          !this.form.fuelType ||
          !this.form.consumption ||
          !this.form.doors ||
          !this.form.maxPersons ||
          !this.form.description ||
          !this.form.image ||
          !this.form.status
        ) {
          alert("Please fill in all the required fields.");
          return;
        }
      axios
        .put(`http://localhost:3000/rentacar/vehicleUpdated/${this.vehicleId}/${this.rentacarId}`, this.form)
        
        .then(() => {
          alert("Vehicle updated successfully.");
          this.$router.push("/singleObject/" + this.rentacarId);
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    },
    fileUpload(e) {
      const file = e.target.files[0];
      this.form.image = file.name;
    },
    },
    mounted(){
        this.getData();
    }
};
</script>

<style scoped>

</style>