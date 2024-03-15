<template>
    <div class="search-form">
      <div class="search-form-row">
        <form v-on:submit.prevent="searchForm">
          <input type="text" v-model="searchName" placeholder="Name" />
          <input
            type="text"
            v-model="searchVehichleType"
            placeholder="Vehicle type"
          />
          <input type="text" v-model="searchLocationName" placeholder="City" />
          <input type="text" v-model="searchGrade" placeholder="Grade" />
        </form>
        <form class="search-form-row" v-on:submit.prevent="filterForm">
            <select v-model="filter.transmissionType">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
            </select>
            <select v-model="filter.fuelType">
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
            </select>
        <button class="filter" type="submit" >
            <img src="../assets/filter.png" alt="Sort Icon" />
        </button>
      </form>
      <div class="search-form-row">
        <div class="sorting-section">
          <select v-model="sortingParam" required>
            <option value="grade">Grade</option>
            <option value="location">Location</option>
            <option value="object name">Object name</option>
          </select>
          <div class="sorting-icons">
            <button v-on:click="sortAsc">
              <img src="../assets/upArrow.png" alt="Sort Icon" />
            </button>
            <button v-on:click="sortDesc">
              <img src="../assets/downArrow.png" alt="Sort Icon" />
            </button>
          </div>
        </div>
      </div>
      
      </div>
      <div class="car-list">
        <RentCar v-for="car in filteredCars" :key="car.id" :car="car" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import RentCar from "./OneVehicle.vue"
  
  export default{
   components: {
      RentCar 
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
        cars: [],
  
        searchName: "",
        searchVehichleType: "",
        searchLocationName: "",
        searchGrade: "",
        filter: {
          transmissionType: "",
          fuelType: "",
        },
        sortingParam: "",
        userData: null,
      };
    },
    computed: {
      filteredCars: function () {
        return this.cars.filter((car) => {
          return (
            car.name.toLowerCase().match(this.searchName.toLowerCase()) &&
            car.location.address.city
              .toLowerCase()
              .match(this.searchLocationName.toLowerCase()) &&
            car.rating.toString().match(this.searchGrade) &&
            ((car.vehicles && this.searchVehichleType === "") ||
              car.vehicles.some((vehicle) =>
                vehicle.type
                  .toLowerCase()
                  .match(this.searchVehichleType.toLowerCase())
              ))
          );
        });
      },
    },
    methods: {
      async getData() {
        /*const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        this.userData = response.data;
        const userRole = localStorage.getItem("userRole");
        if (userRole === UserRole.ADMINISTRATOR) {
          this.isAdmin = true;
        }
        if (userRole === UserRole.CUSTOMER) {
          this.isCustomer = true;
        }
        if(userRole === UserRole.MANAGER){
          this.isManager = true;
        }*/
        try {
          const response = await axios.get(
            "http://localhost:3000/rentacar/sortedCars"
          );
          this.cars = response.data;
        } catch (error) {
          console.error(error);
        }
      },
        async sortAsc() {
        try {
          const response = await axios.get(
            "http://localhost:3000/rentacar/sortedAscending",
            {
              params: {
                sortingParameter: this.sortingParam,
              },
            }
          );
          this.cars = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async sortDesc() {
        try {
          const response = await axios.get(
            "http://localhost:3000/rentacar/sortedDescending",
            {
              params: {
                sortingParameter: this.sortingParam,
              },
            }
          );
          this.cars = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async filterForm() {
        try {
          const response = await axios.get(
            "http://localhost:3000/rentacar/filter",
            { params: this.filter }
          );
          this.cars = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    }
  };
  </script>
  <style scoped>
  .search-form {
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 8px;
    display: flex;
    
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-height: calc(100vh - 320px);
  }

  .car-list{
    display: flex;
    flex-wrap: wrap;
    flex-direction: left;
    justify-content: left;
    gap: 20px;
    margin-top: 25px;

  }

  .search-form-row {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  
  form {
    margin: 0;
    display: flex;
    gap: 10px;
  }
  
  select,
  input[type="text"] {
    padding: 8px;
    border: 1px solid #df4c73;
    border-radius: 4px;
  }
  
  select {
    color: #007bff;
  }
  
  button {
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 20px;
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
 
  </style>