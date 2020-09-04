<template>
  <div>
    <div
      class="relative bg-white w-full h-full overflow-y-auto text-dark shadow-xl"
    >
      <!-- fixed -->
      <div
        class="sticky top-0 h-auto bg-white mb-4 pt-0 shadow-md  font-quicksand text-dark flex flex-row justify-start"
      >
        <!-- TODO replace icon with 'back' -->
        <img
          class="w-4 my-3 mr-3 ml-5"
          src="@/assets/icons/close.svg"
          alt="Remove"
          @click="$emit('show-dialog', {level: level, type: undefined});"
        >

        <h3
          class="text-lg antialiased font-bold tracking-wide py-2"
        >
          Manage Cookies & Headers
        </h3>
      </div>

      <h4
        class="pl-4 pb-2 font-quicksand text-rg antialiased font-bold text-dark tracking-wide"
      >
        Cookies
      </h4>

      <div
        class="flex flex-row h-32 mb-2 px-4 justify-between"
      >
        <ValuePairList
          class="w-full"
          :pairs="cookiePairs"
          separator=" = "
          :removable="true"
          @remove-pair="removeCookie($event.key, $event.value)"
        />

      </div>

      <div
        class="w-full px-4 mb-6 flex flex-row justify-center"
      >
        <CTAButton
          v-if="!enableNewCookieInputs"
          class="w-full h-12"
          type="action"
          label="Add a Cookie"
          @click.native="enableNewCookieInputs = true"
        />

        <div
          class="w-full flex flex-row flex-wrap justify-between"
          v-else
        >

          <TextField
            class="inline-block w-1/2 h-12 pr-2"    
            name="new-cookie-name"
            :focus="true"
            placeholder="Cookie Name"
            v-model="newCookie.key"
          />

          <TextField
            class="inline-block w-1/2 h-12"    
            name="new-cookie-value"
            :focus="false"
            placeholder="Cookie Value"
            v-model="newCookie.value"
          />

          <CTAButton
            class="inline-block w-full h-12 mt-2"
            :type="newCookieInputValid ? `good` : `action`"
            :label="newCookieInputValid ? `Confirm` : `Cancel`"
            @click.native="handleNewCookieClick"
          />
          
        </div>
        
      </div>

      <h4
        class="pl-4 pb-2 font-quicksand text-rg antialiased font-bold text-dark tracking-wide"
      >
        Headers
      </h4>

      <div
        class="flex flex-row h-32 mb-2 px-4 justify-between"
      >
        <ValuePairList
          class="w-full"
          :pairs="headerPairs"
          separator=" = "
          :removable="true"
          @remove-pair="removeHeader($event.key, $event.value)"
        />

      </div>

      <div
        class="w-full px-4 mb-16 flex flex-row justify-center"
      >
        <CTAButton
          v-if="!enableNewHeaderInputs"
          class="w-full h-12"
          type="action"
          label="Add a Cookie"
          @click.native="enableNewHeaderInputs = true"
        />

        <div
          class="w-full flex flex-row flex-wrap justify-between"
          v-else
        >

          <TextField
            class="inline-block w-1/2 h-12 pr-2"    
            name="new-header-name"
            :focus="true"
            placeholder="Header Name"
            v-model="newHeader.key"
          />

          <TextField
            class="inline-block w-1/2 h-12"    
            name="new-header-value"
            :focus="false"
            placeholder="Header Value"
            v-model="newHeader.value"
          />

          <!-- TODO use two buttons, one for 'Cancel' and one for 'Confirm', and disable the 'Confirm' button as long as the input isn't valid. 'Cancel' should work at all times  -->

          <CTAButton
            class="inline-block w-full h-12 mt-2"
            :type="newHeaderInputValid ? `good` : `action`"
            :label="newHeaderInputValid ? `Confirm` : `Cancel`"
            @click.native="handleNewHeaderClick"
          />
          
        </div>
        
      </div>

      <CTAButton
        class="w-full px-4 mt-12 h-12"
        type="good"
        label="Confirm"
        @click.native="$emit('show-dialog', {level: level, type: undefined})"
      />    
    </div>
    
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import TextField from '@/components/inputs/TextField';
import ValuePairList from '@/components/inputs/ValuePairList';

export default {
  name: 'CookiesAndHeadersDialog',
  components: {
    CTAButton,
    ValuePairList,
    TextField,
  },
  props: {
    value: {
      // headers, renamed for use with v-model
      type: Object,
      default: function() {
        return {};
      },
    },
    level: {
      type: Number,
      required: true,
    },
    openedDialogs: {
      type: Array,
      required: true,
    },
  },
  data: function() {
    return {
      headers: {},
      enableNewCookieInputs: false,
      enableNewHeaderInputs: false,
      newCookie: {
        key: ``,
        value: ``,
      },
      newHeader: {
        key: ``,
        value: ``,
      },
    }
  },
  computed: {
    cookiePairs: function() {
      return this.generatePairsFromObject(this.headers[`cookie`]);
    },
    headerPairs: function() {

      let headersWithoutCookies = JSON.parse(JSON.stringify(this.headers));
      delete headersWithoutCookies[`cookie`];

      return this.generatePairsFromObject(headersWithoutCookies);

    },
    showNewCookieDialog: function() {
      return this.openedDialogs[0].type === 'new-cookie';
    },
    showNewHeaderDialog: function() {
      return this.openedDialogs[0].type === 'new-header';
    },
    newCookieInputValid: function() {
      return this.newCookie.key.length > 0 && this.newCookie.value.length > 0;
    },
    newHeaderInputValid: function() {
      return this.newHeader.key.length > 0 && this.newHeader.value.length > 0;
    },
  },
  watch: {
    headers: {
      deep: true,
      handler: function() {
        console.log(`this.headers:`, this.headers);
        this.$emit('input', this.headers);
      }
    }
  },
  methods: {
    generatePairsFromObject(object) {

      if (undefined == object) {
        return [];
      }

      let keys = Object.keys(object);
      let values = Object.values(object);

      let pairs = [];

      keys.forEach((key, index) => {
        pairs.push({
          key: key,
          value: values[index],
        })
      })

      return pairs;
      
    },
    handleNewCookieClick() {

      if (this.newCookieInputValid) {
        this.addCookie(this.newCookie.key, this.newCookie.value);
        this.newCookie.key = ``;
        this.newCookie.value = ``;
        this.enableNewCookieInputs = false;
      } else {
        this.enableNewCookieInputs = false;
      }
      
    },
    handleNewHeaderClick() {

      if (this.newHeaderInputValid) {
        this.addHeader(this.newHeader.key, this.newHeader.value);
        this.newHeader.key = ``;
        this.newHeader.value = ``;
        this.enableNewHeaderInputs = false;
      } else {
        this.enableNewHeaderInputs = false;
      }
      
    },
    addCookie(name, value) {

      if (this.headers[`cookie`]) {
        this.$set(this.headers[`cookie`], name, value);
      } else {
        
        let obj = {};
        obj[name] = value;
        this.$set(this.headers, `cookie`, obj);
        
      }
      
    },
    removeCookie(name, value) {
      this.$delete(this.headers[`cookie`], name, value);
    },
    addHeader(name, value) {
      this.$set(this.headers, name, value);
    },
    removeHeader(name, value) {
      this.$delete(this.headers, name, value);
    },
  },
  created: function() {

    this.headers = this.value; // leave in created so that the initial empty object isn't propagated throught the event

  },
  mounted: function() {

    console.log(`this.value:`, this.value);

  }
}
</script>

<style>

</style>