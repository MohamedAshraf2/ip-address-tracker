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
        <div class="display-container">
          <div v-if="isLoading==false" class="display-container-items">
            <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
              <h4 class="items-title">IP Address</h4>
              <span v-if="ipData" class="res">{{ ipData.query }}</span>
              <span v-else class="res"
                >
                  Please enter an IP Address
              </span>
            </div>
            <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
              <h4 class="items-title">Location</h4>
              <span v-if="ipData" class="res"
                >{{ ipData.city }}, {{ ipData.region }},
                {{ ipData.country }}</span
              >
              <span v-else class="res"
                >Please enter an IP Address
              </span>
            </div>
            <div class="card-info block-seperator col-md-12 col-lg-3 col-xl-3">
              <h4 class="items-title">Timezone</h4>
              <span v-if="ipData" class="res">{{ ipData.timezone }}</span>
              <span v-else class="res"
                >Please enter an IP Address
              </span>
            </div>
            <div class="card-info col-md-12 col-lg-3 col-xl-3">
              <h4 class="items-title">ISP</h4>
              <span v-if="ipData" id="current_isp" class="res">{{
                ipData.isp
              }}</span>
              <span v-else class="res"
                >Please enter an IP Address
              </span>
            </div>
          </div>
          <img v-else src="../assets/loading2.gif" alt="Loading" class="loader2" />
        </div>
      
    </div>
    <div id="map" class="map-container"></div>
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
      isLoading: false,
      ipAddress: "",
      ipAddresss: false,
      map: null,
      marker: {},
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
  },
  methods: {
    async getInfo() {
      this.isLoading = true;
      try {
        if (this.ipAddress == "") {
          alert("please Enter a valid ip address");
        } else {
          const url = "http://ip-api.com/json/" + this.ipAddress;
          const response = await axios.get(url);

          this.ipData = response.data;
          this.latitude = this.ipData.lat;
          this.longitude = this.ipData.lon;
          console.log(this.ipData);
          this.map.setView([this.latitude, this.longitude], 13);
          this.remouvMarker();
          this.addMarker();
          this.isLoading=false
        }
      } catch (e) {
        this.ipData = null
        this.isLoading =false
        this.$toast.error("Bad request");
      }
    },
  
    remouvMarker() {
      this.map.removeLayer(this.marker);
      console.log("marker removed ");
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
      this.marker = L.marker([this.latitude, this.longitude], {
        icon: this.greenIcon,
      })
      .addTo(this.map)
      .bindPopup("Welcom in Turn Digital.");
    },
  },
  watch: {
    ipData(){
    }
  },
};
</script>

<style scoped>
@import "./styles.css";
</style>
