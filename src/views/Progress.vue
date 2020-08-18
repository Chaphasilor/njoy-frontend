<template>
  <div
    class="pb-64"
  >
    <h2
      class="p-2 text-center text-2xl antialiased font-semibold text-dark tracking-wide"    
    >
      Progress Overview
    </h2>

    <ProgressCard
      :key="index"
      v-for="(item, index) of allItems"
      :download="item"
    />

  </div>
</template>

<script>

import ProgressCard from '@/components/ProgressCard';

export default {
  name: 'Progress',
  components: {
    ProgressCard,
  },
  data: function() {
    return {
      pollingIntervalID: undefined,
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
  mounted: function() {

    this.$store.dispatch('navigate', { target: 'progress' });

    this.$store.dispatch('fetchProgress');
    this.pollingIntervalID = setInterval(() => {
      this.$store.dispatch('fetchProgress');
    }, 2000);

    console.log(`this.allItems:`, this.allItems);

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