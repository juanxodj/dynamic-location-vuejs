<template>
  <div class="container">
    <h1>Culqi with Vue.js</h1>
    <b-button variant="success" @click="getToken">Pagar</b-button>
  </div>
</template>

<script>
import Vue from "vue";
import CulqiCheckout from "vue-culqi-checkout";
import store from "../store";
import axios from "axios";

Vue.use(CulqiCheckout, {
  publicKey: "pk_test_mP2tr6j139mkb1gb",
  title: "Tranki App",
  currency: "PEN",
  description: "Pedido Online",
  amount: store.state.montoTotal
});

export default {
  name: "Culqi",
  data() {
    return {
      currency_code: "PEN",
      description: "PRODUCTO ABC",
      email: "hola@trivelapp.com",
      installments: 2,
      order_id: 23,
      telefono: 970023489,
      token: "",
      amount: 10000,
      resultado: ""
    };
  },
  methods: {
    async getToken() {
      this.token = await this.$culqi.openCheckout();
      console.log(this.token.id);
      this.payment();
    },
    async payment() {
      const axiosInstance = axios.create({
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "content-type": "application/json"
        }
      });
      await axiosInstance
        .post("https://api.culqi.com/v2/charges", {
          amount: this.amount,
          currency_code: this.currency_code,
          email: this.email,
          source_id: this.token.id
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
