<template>
    <div class="page">
        <h1>Create an account</h1>
        
        <div class="register-container">
            <form class="register-form" v-on:submit.prevent="register">
                <span class="input-span">Username</span>
                <div class="form-input">
                    <input type="text" id="username" v-model="credentials.username" required>
                </div>
                <span class="input-span">Password</span>
                <div class="form-input">
                    <input type="password" id="password" v-model="credentials.password" required>
                </div>
                <span class="input-span">Confirm Password</span>
                <div class="form-input">
                    <input type="password" id="repeated-password" v-model="repeatedPassword" required>
                </div>
                <span class="input-span">Name</span>
                <div class="form-input">
                    <input type="text" id="name" v-model="credentials.name" required>
                </div>
                <span class="input-span">Surname</span>
                <div class="form-input">
                    <input type="text" id="surname" v-model="credentials.surname" required>
                </div>
                <span class="input-span">Gender</span>
                <div class="form-input">
                    <label>
                        <input type="radio" name="gender" value="Male" v-model="credentials.gender" required> Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="Female" v-model="credentials.gender" required> Female
                    </label>
                </div>
                <span class="input-span">Date of Birth</span>
                <div class="form-input">
                    <input type="date" id="birth-date" v-model="credentials.birthDate" required>
                </div>
                <button type="submit" class="register-button">Register</button>
            </form>
            <div class="login-link">
                Already have an account? <span class="login" v-on:click="login">Login</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data(){
            return{
                credentials: {
                    username: "",
                    password: "",
                    name: "",
                    surname: "",
                    gender: "",
                    birthDate: "",
                    userRole: "Customer",
                    myRentals: null,
                    basket: null,
                    managedRental: null,
                    customerPoints: 5,
                    customerTier: {},
                    
                    numberOfCancelledRentals: 0,
                    isBlocked: false,
                },
                repeatedPassword: "",
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
                } = this.credentials;

                if (!(username && password && name && surname && gender && birthDate && this.repeatedPassword && userRole)) {
                    alert("Please fill in all the required fields.");
                    return;
                }

                if (password != this.repeatedPassword) {
                    alert("Passwords do not match.");
                    return;
                }

                axios
                    .post("http://localhost:3000/auth/register", this.credentials)
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
            },

            login() {
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>
.page {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url('../assets/cars/carback.png');
    background-size: contain;
    background-repeat: no-repeat;
    color: #df4c73;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    min-height: calc(100vh - 320px);
}

.input-span {
    flex: 1;
    border: none;
    font-size: 23px;
    color: #959497;
}

.register-container {
    background-color: #e2f0f9;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 550px;
    margin-top: 30px;
    margin-right: 120px;
    margin-bottom: 30px;
}

.register-form {
    display: flex;
    flex-direction: column;
}

.form-input {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 4px;
    height: 40px;
}

.form-input input[type="radio"] {
    width: 20px; /* Adjust the width as needed */
    height: 20px; /* Adjust the height as needed */
    margin-right: 10px; /* Add space between radio button and text */
}

.form-input input[type="radio"] + label {
    display: flex;
    align-items: center;
}

.form-input input[type="radio"]:checked + label:before {
    background-color: #007bff; /* Radio button color when selected */
    border: none;
}

.form-input input[type="radio"] + label:before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #007bff; /* Radio button color when not selected */
    margin-right: 10px;
    display: inline-block;
}

.form-input label {
    font-size: 25px; /* Adjust the font size as needed */
    display: flex;
    align-items: center;
}

.form-input img {
    margin-right: 10px;
}

.form-input input {
    flex: 1;
    border: none;
    font-size: 30px;
}

.register-button {
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
    font-size: 70px;
    font-family: 'Lucida Sans';
    margin-right: 100px;
}

h2 {
    text-align: center;
    font-size: 45px;
    font-family: 'Lucida Sans';
}

.login-link {
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
}

.login {
    cursor: pointer;
    text-decoration: underline;
}

</style>