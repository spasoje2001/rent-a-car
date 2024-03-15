<template>
    <div class="hole-container">
      
        <h2 class="label">All registered users</h2>
    
            <div class="sorting">
              <div class="searching">
              <form class="search-inputs">
                <img src="../assets/pin.png" alt="Search Icon" class="img-loop"/>
                <input type="text" v-model="searchName" placeholder="Name" class="search-part" />
                <input
                  type="text"
                  v-model="searchLastName"
                  placeholder="Last name"
                  class="search-part"
                />
                <input type="text" v-model="searchUserName" placeholder="User name" class="search-part" />
              </form>
            </div>
    
            <div class="searching2">
                  <form v-on:submit.prevent="filterForm" >
                    <select id="sortParamter1" v-model="filter.userRole" class="search-part1" >
                        <option value="Customer">Customer</option>
                        <option value="Manager">Manager</option>
                        <option value="Administrator">Administrator</option>
                    </select>
    
                    <select id="sortParamter2" v-model="filter.tierName" class="search-part1" >
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                    <button type="submit" class="user-icon">
                        <img
                          src="../assets/filter.png"
                          alt="Filter Icon"
                          class="user-img"
                        />
                    </button>
                  </form>
    
                <form v-on:submit.prevent="getData" class="sort-button">
                <button type="submit" class="user-icon">
                  <img src="../assets/reload.png" alt="Restart Icon" class="user-img" />
                </button>
              </form>
    
                <select id="sortParamter" v-model="sortingParam" class="search-part">
                <option value="name">Name</option>
                <option value="surname">Last name</option>
                <option value="userName">User name</option>
                <option value="pointsNumber">Points number</option>
              </select>
              <button v-on:click="sortAsc" class="user-icon">
                <img src="../assets/upArrow.png" alt="Sort Icon" class="user-img" />
              </button>
              <button v-on:click="sortDesc" class="user-icon">
                <img src="../assets/downArrow.png" alt="Sort Icon" class="user-img" />
              </button>
            
            </div>
        </div>
    
    
        <div class="view-users">
        <div v-for="user in filteredUsers" :key="user.id" class="user-item">
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
      computed: {
        filteredUsers: function () {
          return this.users.filter((user) => {
            return (
              user.name.toLowerCase().match(this.searchName.toLowerCase()) &&
              user.surname.toLowerCase().match(this.searchLastName.toLowerCase()) &&
              user.username.toLowerCase().match(this.searchUserName.toLowerCase())
            );
          });
        },
      },
      methods: {
        async getData() {
            try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/users/allUsers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
                this.users = response.data; 
            } catch (error) {
                console.error(error);
            }
        },
        async filterForm() {
        try {
            const token = localStorage.getItem("token");
            console.log(this.filter);
        
            const response = await axios.get("http://localhost:3000/users/filter", {
                params: this.filter ,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.users = response.data;
        } catch (error) {
            console.error(error);
        }
        },
        async sortAsc() {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/users/sortedAsc", {
                    params: {
                    sortingParam: this.sortingParam,
                    },
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
                this.users = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async sortDesc() {
            try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/users/sortedDesc", {
                params: {
                sortingParam: this.sortingParam,
                },
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
    
    <style scoped>
    .hole-container {
      background-color: black;
      padding: 20px;
      color: #f2c977;
      text-decoration: underline;
      text-align: center;
    }
    
    .view-users {
      color: black;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      border: 2px;
      border-radius: 4px;
      gap: 40px;
      
    }
    
    .border-container{
        border: 4px solid #cd853f;
        background-color: #f2c977;
        padding: 10px;
        text-align: left;
    }
    
    .user-item {
      margin-bottom: 20px;
    }
    
    .img-loop{
      height: 30px;
      width: 40px;
    }
    
    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .form-group {
      margin-bottom: 10px;
    }
    
    .underline {
      text-decoration: underline;
    }
    
    .label {
      font-weight: bold;
    }
    
    span {
      margin-left: 5px;
    }
    
    .searching{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    
    .search-inputs{
      gap: 5px;
      height: 20px;
    }
    
    
    .button-block{
      color: transparent;
      background-color: transparent;
      border: none;
      margin-left: 65px;
      cursor: pointer;
    }
    
    .button-block:hover{
      background-color: peru;
    }
    
    .searching2{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-bottom: 10px;
    }
    
    .user-icon{
      width: 40px;
      height: 30px;
      gap: 5px;
      background-color: transparent;
      border: none;
      border-radius: 4px;
    }
    .user-icon:hover{
      background-color: lightgray;
    }
    
    .user-img{
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    
    .search-part{
      color: #cd853f;
      width: 120px;
      height: 35px;
      gap: 5px;
      border-radius: 4px;
      margin-left: 10px;
    }
    
    .search-part1 {
      color: #cd853f;
      width: 120px;
      height: 35px;
      gap: 5px;
      border-radius: 4px;
      margin-left: 10px;
    }
    
    .label1 {
      font-weight: bold;
      margin-left: 36px;
    }
    </style>