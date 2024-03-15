<template>
    <div class="hole-container">
      
        <h2 class="label">Suspicious customers</h2>
        <div class="view-users">
        <div v-for="user in this.users" :key="user.id" class="user-item">
          <form>
                <div class="horizontal">
                  <div class="border-container">
                    <div class="form-group">
                      <span class="label1">{{ user.userRole }}</span>
                    </div>
                    <div class="form-group">
                      <label class="underline" for="username">Username:</label>
                      <span class="label">{{ user.username }}</span>
                    </div>
                    <div class="form-group">
                      <label class="underline" for="name">Name:</label>
                      <span class="label">{{ user.name }}</span>
                    </div>
                    <div class="form-group">
                      <label class="underline" for="surname">Last Name:</label>
                      <span class="label">{{ user.surname }}</span>
                    </div>
                    <div class="form-group">
                      <label class="underline" for="dateOfBirth">Date of Birth:</label>
                      <span class="label">{{ user.birthDate }}</span>
                    </div>
                    <div v-if="user.userRole === 'Customer'" class="form-group">
                      <label class="underline" for="pointsNumber">Points number:</label>
                      <label class="label">{{ user.numberOfPoints }}</label>
                    </div>
                    <div v-if="user.userRole === 'Customer'" class="form-group">
                      <label class="underline" for="customerType">Customer type:</label>
                      <label class="label">{{ user.customerTier.tierName }}</label>
                    </div>
                    <button type="button" v-if="user.userRole !== 'Administrator'" class="button-block" v-on:click="blockUser(user)">
                      <img src="../assets/filter.png" alt="Sort Icon" class="user-block" />
                    </button>
    
                  </div>
                   
                </div>
          </form>
        </div>
       
      </div>
    </div>
</template>
<script>
    import axios from "axios";
    
    export default {
      data() {
        return {
          users: [],
    
          searchName: "",
          searchLastName: "",
          searchUserName: "",
          filter: {
            userRole: "",
            tierName: "",
          },
          sortingParam:"",
          user:{
            blocked:"",
          },
          clicked:false,
        };
      },
      mounted() {
        this.getData();
      },
      methods: {
        async getData() {
            try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/users/suspisiousCustomers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async blockUser(user) {
            user.isBlocked = true;
            console.log(user.id);
            console.log(user.isBlocked);
            const token = localStorage.getItem("token");
            axios
                .put(`http://localhost:3000/users`, user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                })
                .then(() => {
                alert("User blocked successfully.");
                this.$router.push("/viewUsers");
                })
                .catch((error) => {
                    alert(error.response.data.error);
                });
        }
    }
};
</script>