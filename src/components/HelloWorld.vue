<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <GmapAutocomplete
      class="form-control"
      placeholder="Escriba su dirección"
      id="address"
      ref="address"
      @place_changed="getAddressData"
      v-on:error="handleError"
      :options="{
        componentRestrictions: { country: 'pe' },
        bounds: defaultBounds,
        strictBounds: true,
        fields: ['geometry', 'formatted_address']
      }"
    >
    </GmapAutocomplete>
    <div class="m-3"><b>Dirección:</b> {{ address }}</div>
    <GmapMap
      style="width: 100%; height: 300px"
      :center="locationDetected"
      :zoom="18"
      :options="{
        disableDefaultUI: true,
        fullscreenControl: false,
        mapTypeControl: false,
        rotateControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false
      }"
      @center_changed="resetCenterChange"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="locationDetected"
        :clickable="false"
        :draggable="false"
        :icon="{
          url: require('../assets/Map-Marker.png')
        }"
      />
    </GmapMap>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      locationDetected: {},
      markers: [
        {
          position: {
            lat: "",
            lng: ""
          }
        }
      ],
      address: "",
      mapsKey: "AIzaSyCqupodOy4ShkVk0SzzoRQDuRaQn3IHIcY",
      defaultBounds: {
        northeast: { lat: -5.139501860821229, lng: -80.61527252062896 },
        southwest: { lat: -5.246669630661016, lng: -80.71834006713638 }
      }
    };
  },
  created() {
    this.getLocation();
  },
  watch: {},
  methods: {
    async resetCenterChange(evnt) {
      this.locationDetected = {
        lat: evnt.lat(),
        lng: evnt.lng()
      };
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${evnt.lat()},${evnt.lng()}&key=${
            this.mapsKey
          }`
        )
        .then(
          response => (
            (this.address = response.data.results[0].formatted_address),
            (this.$refs.address.$refs.input.value =
              response.data.results[0].formatted_address)
          )
        );
    },
    getAddressData(addressData) {
      this.address = addressData.formatted_address;
      this.locationDetected.lat = addressData.geometry.location.lat();
      this.locationDetected.lng = addressData.geometry.location.lng();
    },
    handleError(error) {
      alert(error);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.locationDetected = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.markers[0].position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            axios
              .get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${this.mapsKey}`
              )
              .then(
                response => (
                  (this.address = response.data.results[0].formatted_address),
                  (this.$refs.address.$refs.input.value =
                    response.data.results[0].formatted_address)
                )
              );
          },
          error => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Navegador no soportado");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
