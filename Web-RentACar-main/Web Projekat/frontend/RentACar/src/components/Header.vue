<template>
    <header>
        <div class="logo">
            <img src="../assets/logo.png" alt="S&M Wheels">
        </div>
        <div class="buttons">
            <button  v-on:click="userAccount">
                <img class="account-icon" src="../assets/account.png" alt="Account Icon">
                <span class="profile">My Profile</span>
            </button>
            <button v-if="!loggedIn" v-on:click="logIn">
                <img class="logInIcon" src="../assets/logIn.png">
                Log In
            </button>
            <button v-else v-on:click="signOut">
                <img class="logInIcon" src="../assets/signOut.png">
                Sign Out
            </button>
        </div>
    </header>
</template>

<script>
    export default{
        data(){
            return{
                loggedIn : localStorage.getItem("token") !== null
            }
        },
        methods:{
            signOut() {
                localStorage.removeItem("token");
                localStorage.removeItem("userRole");
                this.$router.push("/");
                window.location.reload();
            },
            logIn() {
                this.$router.push('/');
            }, 
            userAccount() {
                this.$router.push('/profile');
            }
        },
    }
</script>

<style scoped>

header {
    background-color: #8ABCD7;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.logo img {
    max-height: 130px; /* Adjust this value as needed */
}
.buttons {
    display: flex;
    /*align-items: center;*/
    gap:10px;
}
button {
    padding: 10px 15px;
    background-color: white;
    color: #8ABCD7;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size:15px;
}

.logInIcon {
    height: 60px;
}

.profile{
    cursor: pointer;
}

</style>