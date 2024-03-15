<template>
    <div class="page">
      <div class="profileContainer">
        <div class="userRole">
          <h1 v-if="isManager">Profile of manager {{ loggedInUser.name }}</h1>
          <h1 v-if="isCustomer">Profile of customer {{ loggedInUser.name }}</h1>
          <h1 v-if="isAdmin">Profile of administrator {{ loggedInUser.name }}</h1>
        </div>

        <form class="profileForm">
            <div class="group">
                <label for="username">Username: </label>
                <label class="dataDecoration">{{ loggedInUser.username }}</label>
            </div>
            <div class="group">
                <label for="name">Name: </label>
                <label class="dataDecoration"> {{ loggedInUser.name }}</label>
            </div>
            <div class="group">
                <label for="lastName">Last name:</label>
                <label class="dataDecoration"> {{ loggedInUser.surname }}</label>
            </div>
            <div class="group">
                <label for="dateOfBirth">Date of birth:</label>
                <label class="dataDecoration">{{ loggedInUser.birthDate }}</label>
            </div>            
            <div class="group">
                <label for="gender">Gender:</label>
                <label class="dataDecoration">{{ loggedInUser.gender }}</label>
            </div>
            <div v-if="isCustomer" class="group">
                <label for="pointsNumber">Points number:</label>
                <label class="dataDecoration">{{ loggedInUser.numberOfPoints }}</label>
            </div>
            <div v-if="isCustomer" class="group">
                <label for="customerType">Customer type:</label>
                <label class="dataDecoration">{{ loggedInUser.customerTier.tierName }}</label>
            </div>
            <button class="updateButton" v-on:click="updateProfile">Update profile</button>
        </form>
      </div>
    </div>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        loggedInUser: {
          type: Object,
        },
        isAdmin: "",
        isManager:"",
        isCustomer: ""
      };
     
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.loggedInUser = response.data;
          const userRole = localStorage.getItem("userRole");
          if (userRole === "Administrator") {
          this.isAdmin = true;
          }
          if (userRole === "Customer") {
          this.isCustomer = true;
          }
          if(userRole === "Manager"){
          this.isManager = true;
          }
        } catch (error) {
          if (error.response.status === 401) {
            this.$router.push("/login");
          }
          console.error(error);
        }
      },
      updateProfile() {
        this.$router.push("/updateProfile");
      }
    },
  };
</script>

<style scoped>
    .page {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-image: url('../assets/cars/carback.png');
      background-size: contain;
      background-repeat: no-repeat;
      color: grey;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      min-height: calc(100vh - 320px);
    }

    .navBar{
      width: 100%;
    }
    .profileForm {
      display: flex;
      flex-direction: column;
      font-size: 23px;
    }
    
    .profileContainer{
      background-color: #e2f0f9;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      width: 550px;
      margin-top: 80px;
      margin-right: 190px;
    }

    .updateButton {
      background-color: #007bff;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 20px;
    }

    h1 {
      text-align: center;
      font-size: 46px;
      font-family: 'Lucida Sans';   
    }

    .dataDecoration {
      font-style: oblique;
      flex: 1; /* Take up remaining space */
      font-size: 23px;
      text-align: right; /* Add this property */
    }

    .group {
      text-align: left; /* Add this property */
      align-items: center;
      margin-bottom: 15px;
      padding: 8px;
      border-radius: 4px;
      height:40px;
    }

    .updateButton:hover {
      background-color: grey;
    }

    .userRole{
      color: #df4c73;
    }
</style>
