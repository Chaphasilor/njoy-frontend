<template>
  <div
    class="h-screen bg-white"
  >

    <div
      class="w-full h-16 p-4 flex flex-row justify-between"
      v-shared-element:page-header
    >

      <h2
        class="w-5/6 flex-shrink-0 text-left text-2xl antialiased font-semibold text-dark tracking-wide"
      >
        Progress Overview
      </h2>

      <svg
        class="w-8 h-8 text-dark stroke-current stroke-1.5 active:stroke-2 transition-colors duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        @click="$router.push({name: `Settings`})"
        v-haptic
        v-shared-element:settings-icon
      >
        <title>Settings</title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="6" cy="10" r="2" />
        <line x1="6" y1="4" x2="6" y2="8" />
        <line x1="6" y1="12" x2="6" y2="20" />
        <circle cx="12" cy="16" r="2" />
        <line x1="12" y1="4" x2="12" y2="14" />
        <line x1="12" y1="18" x2="12" y2="20" />
        <circle cx="18" cy="7" r="2" />
        <line x1="18" y1="4" x2="18" y2="5" />
        <line x1="18" y1="9" x2="18" y2="20" />
      </svg>
      
    </div>

    <div v-shared-element:big-buttons></div>
  

    <!-- <button
      class="w-auto h-10 font-bold text-lg bg-green-300 rounded-lg"
      @click="testPush"
    >
      <span class="p-4">{{ pushButtonText }}</span>
    </button> -->

    <ProgressCard
      :key="item.id"
      v-for="item of allItems"
      :download="item"
      v-shared-element:[item.id]="{
        compositeOnly: true,
      }"
      v-haptic
    />

    <div
      v-if="allItems.length == 0"
      class="w-full h-full flex flex-col justify-center"
    >
      <div
        class="w-full h-8 text-gray-500 text-center"
      >
        Nothing downloaded yet
      </div>
    </div>

    <div
      v-else
      class="h-navbar py-24"
    >
      <!-- Used to add bottom padding to the download list -->
    </div>

    <Navbar
      class="fixed bottom-0"
    />

  </div>
</template>

<script>

import ProgressCard from '@/components/ProgressCard';
import Navbar from '@/components/Navbar';

export default {
  name: 'Progress',
  components: {
    ProgressCard,
    Navbar,
  },
  data: function() {
    return {
      pollingIntervalID: undefined,
      pushButtonText: `Subcribe to push!`,
    }
  },
  computed: {
    allItems: function() {
      let downloads = this.$store.getters.downloads;
      
      return Object.values(downloads).reduce((arr, x) => {
        return [...arr, x];
      }, []).flat();
      
    },
    active: function() {
      return this.$store.getters.downloads.active;
    },
    queued: function() {
      return this.$store.getters.downloads.queue;
    },
    finished: function() {
      return this.$store.getters.downloads.downloaded;
    },
  },
  watch: {
    allItems: {
      deep: true,
      handler: function() {
        console.log(`this.allItems:`, this.allItems);
      }
    }
  },
  methods: {
    async testPush() {

      let success = this.$store.dispatch(`subscribeToPush`);

      this.pushButtonText = success ? `Successfully subscribed to push!` : `Couldn't subscribe to push :/`;

      if (success) {
        console.log(`Successfully subscribed to push!`);
      } else {
        console.warn(`Couldn't subscribe to push :/`);
      }
      
    }
  },
  mounted: function() {

    this.$store.dispatch('navigate', { target: this.$route.name });

    // this.$store.dispatch('fetchProgress');
    // this.pollingIntervalID = setInterval(() => {
    //   this.$store.dispatch('fetchProgress');
    // }, 2000);

  },
  beforeDestroy: function() {

    if (undefined != this.pollingIntervalID) {
      clearInterval(this.pollingIntervalID);
    }
    
  }
}
</script>

<style>

</style>