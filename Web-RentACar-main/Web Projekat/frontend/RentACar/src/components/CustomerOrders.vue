<template>
    <div class="hole-container">
        <div
            v-for="order in orders"
            :key="order.id"
            class="rental-container"
        >
          <div class="vertical">
            <div class="order-info">
                <h2>Order {{order.uniqueOrderId}}</h2>
                <label class="order-labels">Start time: {{ order.rentalTimeStamp }}</label>
                <label class="order-labels">Duration: {{ order.leaseDuration }}</label>
                <label class="order-labels">Price: {{ order.price }}</label>
                <label class="order-labels1">Status: {{ order.status }}</label>
                <button
                    type="submit"
                    class="cancel-button"
                    v-on:click="cancelOrder(order.id)"
                    v-if="order.status === 'Processing'"
                >
                    <img src="../assets/cancel.png" alt="Icon" class="cancel-icon" />
                </button>
                <button v-if="order.status === 'Returned' && !order.isRated" class="cancel-button" type="submit" v-on:click="openPopup">
                    <img src="../assets/comment.png" alt="Icon" class="cancel-icon" />
                </button>
      
                <div v-if="showPopup" class="popup-overlay">
                    <div class="popup">
                        <h3>Leave a Comment</h3>
                        <textarea v-model="txtComment" rows="5" placeholder="Enter your comment" class="textarea"></textarea>
                        <h2>Grade</h2>
                        <div>
                            <label v-for="grade in grades" :key="grade">
                                <input type="radio" v-model="selectedGrade" :value="grade" /> {{ grade }}
                            </label>
                        </div>
          
                        <div class="center">
                            <button v-on:click="submitComment(order)" class="comButton">Submit</button>
                            <button v-on:click="closePopup" class="comButton">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="combine-container">
                <div class="scroll-container">
                    <div class="grid-item-2">
                        <vehicle
                            v-for="vehicle in order.rentedVehicles"
                            :key="vehicle.id"
                            :vehicle="vehicle"
                            :isBasket="isBasket"
                            :show-buttons="false"
                            :show-buttons1="true"
                        ></vehicle>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>
  
<script>
  import OrderedVehicle from "./vehicleForRent.vue";
  import axios from "axios";
  
  export default {
    components: {
      "vehicle": OrderedVehicle,
    },
    computed: {
      statusClass() {
        return [
          "status",
          this.rentacar.workingStatus === "Opened" ? "Opened" : "Closed",
        ];
      },
    },
    data() {
      return {
        orders: [],
        rentacars: [],
        vehicles: [],
        showPopup: false,
        txtComment: '',
        grades: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        selectedGrade: null, 
        user: null,
        isBasket: false,
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
          this.user = response.data;
        } catch (error) {
          console.log("Oops");
        }
        try{
          const response2 = await axios.get("http://localhost:3000/orders/user/" + this.user.id);
          this.orders = response2.data;
        }
        catch(error){
          console.error(error);
        }
      },
      async cancelOrder(id){
        axios
          .delete("http://localhost:3000/orders/" + id)
          .catch((error) => {
            alert(error.response.data.error);
          })
  
        this.getData();
      },
      openPopup() {
        this.showPopup = true;
      },
      closePopup() {
        this.showPopup = false;
        this.txtComment = '';
        this.selectedGrade = null;
      },
      async submitComment(order) {
         try {
          let comment = {
            customer : {
              id: this.user.id,
              username: this.user.username
            },
            rentacarId : order.rentACar,
            text : this.txtComment,
            rating : this.selectedGrade,
            managerApproved: false,
          }
          axios.post("http://localhost:3000/comments", comment);
         }
         catch(error){
            console.error(error);
         }
  
         try {
            await axios.put("http://localhost:3000/rentacar/addedGrade/" + order.rentACar,  {
                grade: this.selectedGrade, 
            });
         }
         catch(error){
            console.error(error);
         }
         order.isRated = true;
         try{
            await axios.put("http://localhost:3000/orders/" + order.id, order);
            this.getData();
         }
         catch(error){
          console.error(error);
         }
        this.closePopup();
      }
    },
  };
</script>

<style scoped>

.grid-item-2 {
    display: flex;
    flex-direction: row;
}

.order-info {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
}

.vertical {
    display: flex;
}
.cancel-button{
    background-color: transparent;
    border: transparent;
    width: 50px;
}

.cancel-button:hover{
    background-color: lightgray;
}

.hole-container{
    min-height: calc(100vh - 320px);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}


</style>