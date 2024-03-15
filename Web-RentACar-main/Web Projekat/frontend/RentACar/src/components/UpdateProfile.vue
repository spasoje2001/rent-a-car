<template>
    <div class="page">
      <div class="profileContainer">
        <form class="profileForm">
            <div class="group">
                <label for="username">Username: </label>
                <input id="username" type="text" class="inputGroup" v-model="user.username" required="true"/>
            </div>
            <div class="group">
                <label for="password">Password: </label>
                <input id="password" type="text" class="inputGroup" v-model="user.password" required="true"/>
            </div>
            <div class="group">
                <label for="name">Name: </label>
                <input id="name" type="text" class="inputGroup" v-model="user.name" required="true"/>
            </div>
            <div class="group">
                <label for="surname">Last name:</label>
                <input id="surname" type="text" class="inputGroup" v-model="user.surname" required="true"/>
            </div>
            <div class="group">
                <label for="gender">Gender:</label>
                <select id="gender" class="inputGroup" v-model="user.gender" required="true">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div>
              <button class="updateButton" type="submit" v-on:click="submitForm">Update</button>
            </div>
        </form>
      </div>
    </div>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {
            username : "",
            password : "",
            name : "",
            surname : "",
            birthDate : "",
            gender : "",
            id : ""
        }
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

          const userData = response.data;

          this.user.username = userData.username;
          this.user.password = userData.password;
          this.user.name = userData.name;
          this.user.surname = userData.surname;          
          this.user.birthDate = userData.birthDate;          
          this.user.gender = userData.gender;
          this.user.id = userData.id;
        } catch (error) {
          if (error.response.status === 401) {
            this.$router.push("/login");
          }
          console.error(error);
        }
      },
      submitForm() {
        if (
          !this.user.username ||
          !this.user.password ||
          !this.user.name ||
          !this.user.surname ||
          !this.user.gender
        ) {
          alert("Please fill in all the required fields.");
        }

        const token = localStorage.getItem("token");
        axios
            .put("http://localhost:3000/users", this.user, {
              headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then(() => {
              alert("User updated successfully.");
              console.log("dosao");
              this.$router.push("/profile");
              window.location.reload();
            })
            .catch((error) => {
              alert(error.response.data.error);
            });
      },
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
    width: 100%;
    }

    h1 {
    text-align: center;
    font-size: 70px;
    font-family: 'Lucida Sans';
    margin-right: 100px;
    }

    .inputGroup {
    flex: 1; /* Take up remaining space */
    font-size: 23px;
    }

    .group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 8px;
    border-radius: 4px;
    height:40px;
    }

    .updateButton:hover {
        background-color: grey;
    }
</style>