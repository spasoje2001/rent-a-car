<template>
    <div class="hole-container">
      <div class="grid-item-2">
        <div class="searching">
          <form class="search-inputs">
            <div class="form-input">
              <input type="text" v-model="search.priceFrom" placeholder="Price from" />
              <input type="text" v-model="search.priceTo" placeholder="Price to" />
              <label class="label-color">Date from:</label>
              <input type="date" v-model="search.dateFrom" />
              <label class="label-color">Date to:</label>
              <input type="date" v-model="search.dateTo" />
              <button type="button" class="sort-button" v-on:click="searchForm">
                <img src="../assets/filter.png" alt="Filter Icon" class="user-icon" />
              </button>
              <button type="button" class="sort-button" v-on:click="getData">
                <img src="../assets/reload.png" alt="Filter Icon" class="user-icon" />
              </button>
            </div>
          </form>
        </div>
        <div class="sort">
          <div>
            <select id="sortParamter" v-model="sortingParam">
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </div>
          <button class="sort-button" v-on:click="sortAsc">
            <img src="../assets/upArrow.png" alt="Sort Icon" class="user-icon" />
          </button>
          <button class="sort-button" v-on:click="sortDesc">
            <img src="../assets/downArrow.png" alt="Sort Icon" class="user-icon" />
          </button>
        </div>
        <div v-for="order in orders" :key="order.id" class="rental-container">
          <div class="vertical">
            <div class="order-info">
              <h2>Order {{ order.uniqueOrderId }}</h2>
              <label class="order-labels">Start time: {{ order.rentalTimeStamp }}</label>
              <label class="order-labels">Duration: {{ order.leaseDuration }}</label>
              <label class="order-labels">Price: {{ order.price }}</label>
              <label class="order-labels1">Status: {{ order.status }}</label>
              <button
                type="submit"
                class="cancel-button"
                v-on:click="accept(order)"
                v-if="order.status === 'Processing'"
              >
                <img src="../assets/yes.png" alt="Icon" class="cancel-icon" />
              </button>
              <button
                type="submit"
                class="cancel-button"
                v-on:click="decline(order)"
                v-if="order.status === 'Processing'"
              >
                <img src="../assets/no.png" alt="Icon" class="cancel-icon" />
              </button>
              <div v-if="isRejected">
                <input type="text" placeholder="Why?" />
                <button v-on:click="reject(order)" type="submit" class="send">Send</button>
              </div>
              <div v-if="order.status === 'PickedUp'">
                <button v-on:click="returned(order)" type="submit" class="ret">Vehicles returned</button>
              </div>
            </div>
            <div class="combine-container">
              <div class="scroll-container">
                <div class="grid-item-2">
                  <vehicle
                    v-for="vehicle in order.rentedVehicles"
                    :key="vehicle.id"
                    :vehicle="vehicle"
                    :show-buttons="false"
                    :show-buttons1="true"
                  ></vehicle>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
<script>
  import Vehicle from "./vehicleForRent.vue";
  import axios from "axios";
  
  export default {
    components: {
        "vehicle": Vehicle,
    },
    mounted() {
        this.getData();
    },
    data() {
      return {
        search: {
          dateFrom: "",
          dateTo: "",
          priceFrom: "",
          priceTo: "",
          rentacarId: 0,
        },
        orders: [],
        sortingParam: "",
        isProcessing: false,
        isRejected: false,
      };
    },
    methods: {
        async getData() {
            const userRole = localStorage.getItem("userRole");
            if (userRole === "Manager") {
                this.isManager = true;
            }
            this.search.rentacarId = this.$route.params.id;
            console.log(this.search.rentacarId);
            try {
                const response = await axios.get(
                    `http://localhost:3000/rentacar/${this.search.rentacarId}`
                );
                this.carObject = response.data;
  
                const orderResponse = await axios.get(
                    `http://localhost:3000/orders/rentacar/${this.search.rentacarId}`
                );
                this.orders = orderResponse.data;
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.error);
                } else {
                    console.error(error);
                }
            }
        },
  
        async sortAsc() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/orders/sortedAscending",
                    {
                        params: {
                            sortingParameter: this.sortingParam,
                            rentacarId: this.search.rentacarId,
                        },
                    }
                );
                this.orders = response.data;
            } catch (error) {
                console.error(error);
            }
      }, 
        async sortDesc() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/orders/sortedDescending",
                    {
                        params: {
                            sortingParameter: this.sortingParam,
                            rentacarId: this.search.rentacarId,
                        },
                    }
                );
                this.orders = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async searchForm() {
            try {
                const response = await axios.get("http://localhost:3000/orders/filtered", {
                    params: {
                        rentacarId: this.search.rentacarId,
                        priceFrom: this.search.priceFrom,
                        priceTo: this.search.priceTo,
                        dateFrom: this.search.dateFrom,
                        dateTo: this.search.dateTo
                    },
                });
                this.orders = response.data;
            } catch (error) {
                console.error(error); 
            }
        },
        async accept(order){
            const confirmation = confirm(
                "Are you sure you want to approve this order?"
            );
  
            if (confirmation) {
                order.status = "Approved";
                try{
                    await axios.put(`http://localhost:3000/orders/` + order.id, order);

                }catch(error){
                    console.error(error);
                }
            }
        },
        decline(){
            this.isRejected = true;
        },
        async reject(order){
            this.isRejected = false;
            try{
                order.status = "Rejected";
                await axios
                    .put(`http://localhost:3000/orders/` + order.id, order);
            }catch(error){
                console.error(error);
            }
        },
        async returned(order){
            try{
                order.status = "Returned";
                await axios
                    .put(`http://localhost:3000/orders/` + order.id, order);
            }catch(error){
                console.error(error);
            }
        }
    }
  }
  </script>