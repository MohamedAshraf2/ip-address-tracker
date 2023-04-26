<template>
  <div class="ip-tracker">
    <div class="form-container">
      <h1 class="title">IP Address Tracker</h1>
      <form class="form-elements col-md-11 col-lg-4 col-xl-4">
        <input
          type="text"
          class="form-control"
          v-model="ipAddress"
          placeholder="Search for any IP address or domain"
        />
        <button id="search_btn" class="btn btn-dark" @click.prevent="getInfo">
          <font-awesome-icon icon="fa-solid fa-arrow-right" class="ico" />
        </button>
      </form>
    </div>
    <div>
      <div class="display-container row">
        <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
          <h4 class="items-title">IP Address</h4>
          <span v-if="ipData" class="res">{{ ipData.ip }}</span>
          <span v-else class="res">Please enter an IP Address</span>
        </div>
        <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
          <h4 class="items-title">Location</h4>
          <span v-if="ipData" class="res"
            >{{ ipData.location.city }}, {{ ipData.location.region }},
            {{ ipData.location.country }}</span
          >
          <span v-else class="res">Please enter an IP Address</span>
        </div>
        <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
          <h4 class="items-title">Timezone</h4>
          <span v-if="ipData" class="res">{{ ipData.location.timezone }}</span>
          <span v-else class="res">Please enter an IP Address</span>
        </div>
        <div class="card-info col-md-12 col-lg-3 col-xl-3">
          <h4 class="items-title">ISP</h4>
          <span v-if="ipData" id="current_isp" class="res">{{
            ipData.isp
          }}</span>
          <span v-else id="current_isp" class="res"
            >Please enter an IP Address</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      ipData: null,
      ipAddress: "",
    };
  },
  methods: {
    async getInfo() {
      const url =
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_txjvfLQeGNvNJ6VzBdO5UjJBdowCy&ipAddress=" +
        this.ipAddress;
      const response = await axios.get(url);
      this.ipData = response.data;
      console.log(this.ipData);
    },
  },
};
</script>

<style scoped>
  @import "./styles.css";
</style>
