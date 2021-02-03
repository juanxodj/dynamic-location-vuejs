<template>
  <div class="about">
    <h1>Sendinblue</h1>
    <div class="m-3">
      <button type="button" class="btn btn-primary" v-on:click="sendinblue">
        Save User
      </button>
    </div>
  </div>
</template>

<script>
import SibApiV3Sdk from "sib-api-v3-typescript";

export default {
  name: "Mailchimp",
  components: {},
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
