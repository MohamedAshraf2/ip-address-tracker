<template>
  <div class="ip-tracker">
    <div class="ip-input">
      <label for="ip-address">Enter IP Address:</label>
      <input type="text" id="ip-address" v-model="ipAddress" />
      <button @click="getIpInfo">Track</button>
    </div>
  </div>
</template>

<script>
// import L from 'leaflet';
import "leaflet/dist/leaflet.css";
const axios = require("axios");
export default {
  data() {
    return {
      ipAddress: "",
    };
  },
  methods: {
    async getIpInfo() {
      const url =
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_txjvfLQeGNvNJ6VzBdO5UjJBdowCy&ipAddress=" +
        this.ipAddress;
      const response = await axios.get(url);
      const result = response.data;
      console.log(result.location.country);
    },
  },
};
</script>

<style scoped>
.ip-tracker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ip-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.ip-input label {
  margin-right: 10px;
}

.ip-input input[type="text"] {
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  width: 200px;
}

.ip-input button {
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.ip-input button:hover {
  background-color: #0066cc;
}
</style>
