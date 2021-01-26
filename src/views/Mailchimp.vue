<template>
  <div class="about">
    <h1>MailChimp</h1>
    <div class="m-3">
      <button type="button" class="btn btn-primary" v-on:click="sendinblue">
        Sendinblue
      </button>
    </div>
    <mailchimp-subscribe
      url="https://xxx.xxx.list-manage.com/subscribe/post-json"
      user-id="xxx"
      list-id="bc055928d5"
      @error="onError"
      @success="onSuccess"
    >
      <template v-slot="{ subscribe, setEmail, error, success, loading }">
        <form @submit.prevent="subscribe">
          <input type="email" @input="setEmail($event.target.value)" />
          <button type="submit">Submit</button>
          <div v-if="error">{{ error }}</div>
          <div v-if="success">Yay!</div>
          <div v-if="loading">Loading…</div>
        </form>
      </template>
    </mailchimp-subscribe>
  </div>
</template>

<script>
import MailchimpSubscribe from "vue-mailchimp-subscribe";
import SibApiV3Sdk from "sib-api-v3-typescript";

export default {
  name: "Mailchimp",
  components: {
    MailchimpSubscribe
  },
  data() {
    return {
      sendinblueKey:
        "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"
    };
  },
  methods: {
    sendinblue() {
      let newSendInBlueClient = {
        listIds: ["2"],
        email: "jlsc92@gmail.com",
        updateEnabled: true,
        attributes: {
          FIRST_NAME: "FIRST NAME",
          LAST_NAME: "LAST NAME",
          SMS: "+51970023489"
        }
      };
      let apiInstance = new SibApiV3Sdk.ContactsApi();
      let apiKey = apiInstance.authentications["apiKey"];
      apiKey.apiKey = this.sendinblueKey;
      let createContact = new SibApiV3Sdk.CreateContact(newSendInBlueClient);
      apiInstance.createContact(createContact).then(
        data => {
          console.log("API called successfully. Returned data: " + data);
        },
        error => {
          console.error(error);
        }
      );
    },
    onError() {
      console.log("Error");
    },
    onSuccess() {
      console.log("Success");
    }
  }
};
</script>
