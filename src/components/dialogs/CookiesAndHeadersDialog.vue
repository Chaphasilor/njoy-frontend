
<template>
  <div>
    <!-- <div
      @click="$emit('dialog-dismissed', true);"
      class="fixed w-full h-full bg-dark bg-opacity-25"
    >
    </div>   -->
    <div
      class="relative bg-white w-full mx-6 my-16 text-dark rounded-xl shadow-xl"
    >
      <h3
        class="p-4 text-center font-quicksand text-lg antialiased font-bold text-dark tracking-wide"
      >
        Manage Cookies & Headers
      </h3>

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
        />

      </div>

      <div
        class="w-full px-4 mb-4 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="action"
          label="Add a Cookie"
          @click.native="createNewDirectory('Test')"
        />    
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
          separator=": "
        />

      </div>

      <div
        class="w-full px-4 mb-4 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="action"
          label="Add a Header"
          @click.native="createNewDirectory('Test')"
        />    
      </div>

      <div
        class="absolute bottom-0 w-full px-6 py-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="good"
          label="Confirm"
          @click.native="$emit('confirmed')"
        />    
      </div>
    </div>
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import ValuePairList from '@/components/outputs/ValuePairList';

export default {
  name: 'CookiesAndHeadersDialog',
  components: {
    CTAButton,
    ValuePairList,
  },
  props: {
    value: {
      // headers, renamed for use with v-model
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  data: function() {
    return {

    }
  },
  computed: {
    cookiePairs: function() {
      return this.generatePairsFromObject(this.value.cookies);
    },
    headerPairs: function() {

      let headersWithoutCookies = JSON.parse(JSON.stringify(this.value));
      delete headersWithoutCookies.cookies;

      return this.generatePairsFromObject(headersWithoutCookies);

    }
  },
  watch: {
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
      
    }
  },
  mounted: function() {

    console.log(`this.value:`, this.value);

  }
}
</script>

<style>

</style>