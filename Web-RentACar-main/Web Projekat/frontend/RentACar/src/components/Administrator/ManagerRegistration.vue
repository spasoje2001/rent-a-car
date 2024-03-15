<template>
    <div class="registrationContainer">
      <div class="registrationForm">
        <h2>Create manager:</h2>
        <form v-on:submit.prevent="submitForm">
          <div class="group">
            <label for="username">Username:</label>
            <input  type="text" id="username" v-model="manager.username" required/>
          </div>
          <div class="group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="manager.password" required/>
          </div>
          <div class="group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="manager.name" required/>
          </div>
          <div class="group">
            <label for="surname">Last name:</label>
            <input type="text" id="surname" v-model="manager.surname" required/>
          </div>
          <div class="group">
            <label for="gender">Gender:</label>
            <select id="gender" name="gender" v-model="manager.gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="group">
            <label for="birthDate">Date of birth:</label>
            <input type="date" id="birthDate" v-model="manager.birthDate" required/>
          </div>
          <div class="group">
            <button class="submitButton" type="submit">Register</button>
          </div>
        </form>
      </div>
      </div>
    </template>
    
    <script>
    
    export default {
      name: "ManagerRegistration",
      data() {
        return {
          manager: {
            username: "",
            password: "",
            name: "",
            surname: "",
            gender: "",
            birthDate: "",
            userRole: "Manager",
            myRentals: null,
            basket: null,
            myRentACars: null,
            pointsNumber: 5,
            customerType: null,
          }
        };
      },
      methods: {
        submitForm(){
          if (
            !(this.manager.username &&
            this.manager.password &&
            this.manager.name &&
            this.manager.surname &&
            this.manager.gender &&
            this.manager.birthDate
          )) {
            alert("Please fill in all the required fields.");
            return;
          }
    
          this.$emit("manager-created", this.manager);
          
        },
      },
    };
    </script>
    
    <style scoped>

    .group {
      width: 300px;
      margin-bottom: 20px;
    }

    .submitButton{
      width: 170px;
      margin: auto;
    }
    </style>