<template>
  <div class="ip-tracker">
    <div class="form-container">
      <h1 class="title">IP Address Tracker</h1>
      <form class="form-elements col-md-11 col-lg-4 col-xl-4">
        <input
          type="text"
          v-maska
          data-maska="#00.#00.#00.#00"
          data-maska-tokens="0:[0-9]:optional"
          class="form-control"
          v-model="ipAddress"
          placeholder="Search for any IP address or domain"
          @blur="v$.ipAddress.$touch"
        />
        <button id="search_btn" class="btn btn-dark" @click.prevent="getInfo">
          <font-awesome-icon icon="fa-solid fa-arrow-right" class="ico" />
        </button>
      </form>
      <div
        v-if="v$.ipAddress.$error"
        class="unValid col-md-10 col-lg-4 col-xl-4"
      >
        please enter valid ip Address
      </div>
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
    
    <div  id="map" class="map-container">
      <img v-if="ipData === null" src="../assets/loading.gif" alt="Loading" class="loader"/>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { vMaska } from "maska";
const axios = require("axios");
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  directives: { maska: vMaska },
  data() {
    return {
      ipData: null,
      ipAddress: "",
      ipAddresss: false,
      map: null,
      marker: "",
      latitude: null,
      longitude: null,
      greenIcon: null,
    };
  },
  validations() {
    return {
      ipAddress: { required }, // Matches this.firstName
    };
  },
  mounted() {
    // this.initMap();
    this.map = L.map("map", {
      zoomControl: true,
      zoom: 1,
      zoomAnimation: false,
      fadeAnimation: true,
      markerZoomAnimation: true,
    }).setView([29.960925752603092, 31.27223940430157], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  
      this.greenIcon = L.icon({
        iconUrl: require("../assets/marker.svg"),

        iconSize: [40, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
      L.marker([29.960925752603092, 31.27223940430157], { icon: this.greenIcon })
        .addTo(this.map)
        .bindPopup("Welcom in Turn Digital.");
    
  },
  methods: {
    async getInfo() {
      try{
      if (this.ipAddress == "") {
        alert("please Enter a valid ip address");
       
      } else {
        const url =
          "https://geo.ipify.org/api/v2/country,city?apiKey=at_txjvfLQeGNvNJ6VzBdO5UjJBdowCy&ipAddress=" +
          this.ipAddress;
        const response = await axios.get(url);
        this.ipData = response.data;
        this.latitude = this.ipData.location.lat;
        this.longitude = this.ipData.location.lng;
        console.log(this.ipData);
        this.map.setView([this.latitude, this.longitude], 13);

        this.addMarker();
      }}catch(e){
        this.$toast.error(e);
      }
    },
    addMarker() {
      this.greenIcon = L.icon({
        iconUrl: require("../assets/marker.svg"),

        iconSize: [40, 50], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
      L.marker([this.latitude, this.longitude], { icon: this.greenIcon })
        .addTo(this.map)
        .bindPopup("Welcom in Turn Digital.");
    },
  },
};
</script>

<style scoped>
@import "./styles.css";
</style>
