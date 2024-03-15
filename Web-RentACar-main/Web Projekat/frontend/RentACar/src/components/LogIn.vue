<template>
    <div class="page">
        <h1>Good to see you again</h1>   
        <div class="login-container">
            <form v-on:submit.prevent="submitForm" class="login-form">
                <h2>Login</h2>
                <span class="input-span">Your username</span>
                <div class="form-input">
                    <img src="../assets/account.png" alt="Username Icon" width="20">
                    <input type="text" id="username" required v-model="loggedInUser.username">
                </div>
                <span class="input-span">Your password</span>
                <div class="form-input">
                    <img src="../assets/password.png" alt="Password Icon" width="20">
                    <input type="password" id="password" required v-model="loggedInUser.password">
                </div>
                <button type="submit" class="login-button">Login</button>
            </form>
            <div class="register-link">
                Don't have an account? <span class="register" v-on:click="createAccount">Register</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default{
        data(){
            return{
                loggedInUser: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            submitForm() {
                axios
                    .post("http://localhost:3000/auth/login", this.loggedInUser)
                    .then((response) => {
                        const { message, token, userRole } = response.data;
                        alert(message);
          
                        localStorage.setItem("token", token);
                        localStorage.setItem("userRole", userRole);

                        this.$router.push("/home");
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert(error.response.data.error);
                    });
            },
            createAccount() {
                this.$router.push("/registration");
            }
        }
    }
</script>

<style scoped>
.page {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-image: url('../assets/cars/carback.png'); /* Set your image path */
    background-size:contain; /* Adjust background size as needed */
    background-repeat: no-repeat;
    color: #df4c73; /* Set text color to #DF4C73 */
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: flex-end;
    justify-content: center;
    min-height: calc(100vh - 320px);
}

.input-span{
    flex: 1; /* Take up remaining space */
    border: none; /* Remove the input border to avoid double borders */
    font-size: 23px;
    color:#959497;
}
.login-container {
    background-color: #e2f0f9; /* Set form background color to #E2FOF9 */
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width:550px;
    margin-top: 80px; /* Add margin to separate from the text above */
    margin-right: 190px;
}
.login-form {
    display: flex;
    flex-direction: column;
}
.form-input {
    display: flex;
    align-items: center; /* Center the content vertically */
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 4px;
    height:40px;
}

.form-input img {
    margin-right: 10px; /* Add space between icon and input */
}

.form-input input {
    flex: 1; /* Take up remaining space */
    border: none; /* Remove the input border to avoid double borders */
    font-size: 30px;
}
.login-button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size:20px;
}

h1 {
    text-align: center;
    font-size: 70px; /* Increase font size */
    font-family:'Lucida Sans';
    margin-right: 100px;
}

h2{
    text-align: center;
    font-size: 45px; /* Increase font size */
    font-family:'Lucida Sans';
}
.register-link {
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
    
}
.register{
    cursor: pointer;
    text-decoration: underline;
}

</style>