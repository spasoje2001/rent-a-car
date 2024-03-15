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
            <button class="submitButton" type="submit" v-on:click="register">Register</button>
          </div>
        </form>
      </div>
      </div>
    </template>

<script>
import axios from "axios";
export default{
    data(){
        return{
            manager: {
                username: "",
                password: "",
                name: "",
                surname: "",
                gender: "",
                birthDate: "",
                userRole: "Manager",
                myRentals: null,
                myRentACars: null,
                basket: null,
                managedRental: null,
                customerPoints: 5,
                customerTier: {},
                numberOfCancelledRentals: 0,
                isBlocked: false,
            },
        };
    },
    methods: {
        register() {
            const {
                username,
                password,
                name,
                surname,
                gender,
                birthDate,
                userRole
            } = this.manager;

            if (!(username && password && name && surname && gender && birthDate && userRole)) {
                alert("Please fill in all the required fields.");
                return;
            }

            axios
                .post("http://localhost:3000/auth/register", this.manager)
                .then((response) => {
                    const { message } = response.data;
                    alert(message);
                    this.$router.push("/");
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.error);
                    } else {
                        console.error("An error occurred:", error.message);
                    }
                });
        }
    }
}
</script>
