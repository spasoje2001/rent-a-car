<template>
    <div class="vehicle">
      <div class="grid-item-2-1">
        <h2 class="title">{{ vehicle.brand }} {{ vehicle.model }}</h2>
      </div>
      <div class="grid-item-3">
        <div>
          <button
            class="buttonBasket"
            type="submit"
            v-on:click.prevent="putInBasket(vehicle.id)"
            v-if="!isBasket"
          >
            <img src="../assets/shoppingCart.png" alt="delete" class="binIcon" />
          </button>
          <button
            class="binButton"
            type="submit"
            v-if="isBasket"
            v-on:click.prevent="deleteFromBasket(vehicle)"
          >
            <img src="../assets/trashCan.png" alt="delete" class="binIcon" />
          </button>
        </div>
        <div class="grid-item-4">
          <div class="grid-item-2-2">
            <div class="label-info">
              <label class="labels2">Price:</label>
              <p class="paragraph2">{{ vehicle.price }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Vehicle type:</label>
              <p class="paragraph">{{ vehicle.type }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Transmission:</label>
              <p class="paragraph">{{ vehicle.transmissionType }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Fuel type:</label>
              <p class="paragraph1">{{ vehicle.fuelType }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Consumption:</label>
              <p class="paragraph1">{{ vehicle.consumption }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Doors:</label>
              <p class="paragraph1">{{ vehicle.doors }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Capacity:</label>
              <p class="paragraph1">{{ vehicle.maxPersons }}</p>
            </div>
            <div class="label-info">
              <label class="labels">Description:</label>
              <p class="paragraph1">{{ vehicle.description }}</p>
            </div>
          </div>
        </div>
        <div v-if="isBasket" class="num">
          <label>{{ vehicle.quantity }}</label>
        </div>
      </div>
      <div class="under" v-if="isBasket">
        <button class="addButton" @click="plus">
          <img src="../assets/plus.png" alt="Plus" class="img" />
        </button>
        <button class="deleteButton" @click="minus">
          <img src="../assets/minus.png" alt="Plus" class="img" />
        </button>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: "VehicleCard",
    props: {
      vehicle: Object,
      putInBasket: Function,
      deleteFromBasket: Function,
      isBasket: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      async plus() {
        this.$emit("car-added", this.vehicle);
      },
      async minus() {
        this.$emit("car-deleted", this.vehicle);
      },
    },
  };
  </script>

<style scoped>
.vehicle {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 500px; /* Set the width to match your design */
  height: 200px; /* Set the height to match your design */
}

.grid-item-2-1 {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.title {
  color: #007bff;
  margin: 0;
}

.grid-item-3 {
  display: flex;
  align-items: center;
}

.buttonBasket {
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 20px;
  width: 50px;
}

.binIcon {
  width: 30px;
  height: 30px;
}

.grid-item-4 {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label-info {
  display: flex;
  align-items: center;
}

.labels2 {
  color: #007bff;
}

.labels {
  color: #007bff;
}

.paragraph2 {
  color: #df4c73;
  margin: 0;
}

.paragraph {
  color: #df4c73;
  margin: 0;
}

.paragraph1 {
  color: #df4c73;
  margin: 0;
}

.num {
  display: flex;
  align-items: center;
}

.under {
  display: flex;
  align-items: center;
}

.addButton {
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 5px;
}

.deleteButton {
  border: none;
  background: none;
  cursor: pointer;
}

.img {
  width: 20px;
  height: 20px;
}

.addBasket {
  width: 20px;
  height: 20px;
}
</style>
