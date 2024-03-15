<template>
    <div class="page">
        <form class="rentalForm">
            <h2>Create new rental:</h2>
            <div class="group">
                <label for="name">Name:</label>
                <input type="text" v-model="rentACar.name" required/>
            </div>
            <div class="group">
                <label for="location">Location:</label>
                <select v-model="selectedLocation" required>
                    <option v-for="loc in locations" :key="loc.id"  :value="loc">{{ loc.address.street }} {{ loc.address.city }} {{ loc.address.postCode }}</option>
                </select>
            </div>
            <div class="group">
                <label for="startTime">Start time:</label>
                <input type="time" v-model="startTime" id="startTime" name="startTime" required/>
            </div>            
            <div class="group">
                <label for="endTime">End time:</label>
                <input type="time" v-model="endTime" id="endTime" name="endTime" required/>
            </div>
            <div class="group">
                <label>Logo:</label>
                <input type="file" accept="image/*" v-on:change="fileUpload" required class="custom-file-input"  name="logoFile" />
            </div>
            <div class="group">
                <div v-if="this.managerCount === 0 && !isChosen">
                    <h2>Create manager:</h2>
                    <div class="toWhite">
                        {{ JSON.stringify(managers) }}
                    </div>
                 <ManagerRegistration :newManager="newManager" @manager-created="createManager"/>
                </div>
                <div v-else-if="!isChosen">
                    <h3>Choose manager:</h3>
                    <select v-model="selectedManager" required>
                        <option v-for="manager in managers" :key="manager.id"  :value="manager">{{ manager.name }} {{ manager.lastName }}</option>
                    </select>
                    <button id="chooseButton" v-on:click="chooseManager">
                        Choose 
                    </button>
                </div>
            </div>
            <div class="formButton">
                <button v-on:click="submitForm" type="submit">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios  from 'axios';
    import ManagerRegistration from './ManagerRegistration.vue';
    export default {
        components: {
            ManagerRegistration
        },
        data() {
            return {                
                rentACar: {
                    name: '',
                    location: '',
                    businessHours: '',
                    logo: '',
                },
                startTime: '',
                endTime: '',
                managerCount: 0,
                selectedManager: null,
                selectedLocation: null,
                newManager: null,
                users: [],
                locations: [],
                isRegistrated: false,
                isChosen: false,
            };
        },
        mounted(){
            this.getData();
        },
        computed: {
            managers: function () {
                const allManagers = this.users.filter((user) => {
                    return (
                        user.userRole.match("Manager") &&
                        user.myRentACars === null
                    );
                });
                this.managerCount = allManagers.length;
                return allManagers;
            },
        },
        methods: {
            async getData(){
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get("http://localhost:3000/users/allUsers", {
                        headers : {
                            Authorization : `Bearer ${token}`,
                        },        
                    });
                    this.users = response.data;
                    console.log(this.users);
                } catch (error) {
                    console.error(error);
                }
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get("http://localhost:3000/locations", {
                        headers : {
                            Authorization : `Bearer ${token}`,
                        },        
                    });
                    this.locations = response.data;
                    console.log("LOKACIJE", this.locations);
                } catch (error) {
                    console.error(error);
                }
            },           
            createManager(manager) {
                console.log("MENADZER NOVI: "+manager.name);
                this.rentACar.businessHours = this.startTime + "h-" + this.endTime + "h";
                this.newManager = manager;
                this.newManager.myRentACars = this.rentACar;
                this.newManager.myRentACars.location = this.selectedLocation;

                axios
                    .post("http://localhost:3000/auth/register", this.newManager)
                    .then(() => {
                    alert("Manager successfully added!");
                    })
                    .catch((error) => {
                    alert(error.response.data.error);
                    });
                //this.isRegistrated = true;
                //this.$router.push("/rentacar");
            },
            chooseManager(){
                this.selectedManager.myRentACars = this.rentACar;
                this.selectedManager.myRentACars.location = this.selectedLocation;
                const token = localStorage.getItem("token");

                axios
                    .put("http://localhost:3000/users/updateManager", this.selectedManager, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(() => {
                        alert("RentACar object is added successfully.");
                    })
                    .catch((error) => {
                        alert(error.response.data.error);        
                    });

                axios
                    .post("http://localhost:3000/rentacar", this.rentACar)
                    .then((response)=>{
                        this.object = response.data;
                    }
                    )
                    .catch((error) => {
                    alert(error.response.data.error);
                    });
                
                this.isChosen = true;
            },
            submitForm() {
                if (!(this.rentACar.name &&
                    this.rentACar.logo &&
                    this.rentACar.startTime &&
                    this.rentACar.endTime)
                ) {
                    alert("Please fill in all the required fields.");
                    return;
                }
                  
//                this.isRegistrated = true;
                axios
                    .post("http://localhost:3000/rentacar", this.rentACar)
                    .then((response) => {
                        this.rentACar = response.data;
                    })
                    .catch((error) => {
                        alert(error.response.data.error);
                    });

                this.$router.push('./home');
            },
            fileUpload(e) {
                const file = e.target.files[0];
                this.rentACar.logo = file.name;
            },
        }
    };   

</script>

<style>
  .page {
    display: flex;
    flex-direction: center;
    justify-content: center;
    min-height: calc(100vh - 320px);
  }

  .rentalForm {
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-height: calc(100vh - 320px);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
  }

  label {
    font-weight: bold;
    color: #007bff;
  }

  input[type="text"],
  select,
  input[type="password"],
  input[type="date"] {
    padding: 8px;
    border: 1px solid #df4c73;
    border-radius: 4px;
  }

  select {
    color: #007bff;
  }

  .formButton {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  button[type="submit"] {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }

  .sorting-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sorting-icons {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .sorting-icons img {
    width: 20px;
    height: 20px;
  }

  .filter {
    width: 20px;
    height: 20px;
  }

  .toWhite {
    color: white;
  }

  h2 {
    color: #16467a;
  }

  .formButton {
    margin: auto;
  }
</style>