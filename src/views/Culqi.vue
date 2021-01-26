<template>
  <div class="container">
    <h1>Culqi with Vue.js</h1>
    <!-- <b-form-input v-model="number" placeholder="Ingrese Monto"></b-form-input> -->
    <b-button variant="success" @click="pay">Pagar</b-button>
  </div>
</template>

<script>
import Vue from "vue";
import CulqiCheckout from "vue-culqi-checkout";
import store from "../store";

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
      number: ""
    };
  },
  methods: {
    async pay() {
      const token = await this.$culqi.openCheckout();
      console.log(token);
      /* console.log(token.id);
      alert(token.id); */
    }
  }
};
</script>
