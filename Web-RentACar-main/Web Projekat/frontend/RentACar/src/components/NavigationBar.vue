<template>
    <div class = "navigation-bar">
        <ul class="nav-list">
            <li @click="goHome" class="nav-item">Home</li>
            <li v-if="isAdmin" @click="addRental" class="nav-item">Add rental</li>
            <li v-if="isAdmin" @click="addManager" class="nav-item">Add manager</li>
            <li v-if="isAdmin" @click="viewAllUsers" class="nav-item">View all users</li>
            <li v-if="isAdmin" @click="viewSuspicious" class="nav-item">View suspicious customers</li>
      
            <li v-if="isManager" @click="myRental" class="nav-item">My rental</li>
            <li v-if="isManager" @click="pastOrders" class="nav-item">Past orders</li>
            <li v-if="isManager" @click="pastCustomers" class="nav-item">Past customers</li>
      
            <li v-if="isCustomer" @click="rentVehicle" class="nav-item">Find a vehicle</li>
            <li v-if="isCustomer" @click="myOrders" class="nav-item">My orders</li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
const UserRole = {
  ADMINISTRATOR: "Administrator",
  CUSTOMER: "Customer",
  MANAGER: "Manager"
};
export default {
    mounted() {
        this.getData();
    },
    data() {
        return {
            user:{
                type : Object,
            },
            isAdmin: "",
            isCustomer: "",
            isManager: "",
        };
    },
    methods: {
        goHome() {
            this.$router.push("/home");
        },
        addRental() {
            this.$router.push("/rentalRegistration");
        },
        addManager() {
            this.$router.push("/createManager");
        },
        viewAllUsers() {
            this.$router.push("/users");
        },
        viewSuspicious() {
            this.$router.push("/suspicious");
        },
        myRental() {
            this.$router.push("/myRental/"+ this.user.myRentACars.id );
        },
        pastOrders() {
            this.$router.push("/rentalOrders/" + this.user.myRentACars.id);
        },
        pastCustomers() {
            this.$router.push("/rentalCustomers/" + this.user.id);
        },
        rentVehicle() {
            this.$router.push("/rentVehicle");
        },
        myOrders() {
            this.$router.push("/customerOrders");
        },
        async getData() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.user = response.data;

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
    }
};
</script>

<style >
.navigation-bar {
  background-color: #8ABCD7;
  color: white;
  padding: 10px 20px;
}

.nav-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.nav-item {
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 25px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>