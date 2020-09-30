<template>
  <div
    id="app"
    class="w-full h-full text-base bg-eggshell font-quicksand"
  >

    <!-- <div
      id="nav"
      class="fixed bottom-0 h-16 text-center w-full rounded-t-xl shadow-top "
    >
      <router-link to="/">
        Progress
      </router-link>
      |
      <router-link to="/download">
        Download
      </router-link>
    </div> -->
    <Navbar
      class="fixed bottom-0"
    />
    <router-view />
  </div>
</template>

<script>

import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  async mounted() {

    if (!this.$store.getters.api) {
      await this.$store.dispatch(`mountApi`);
    }
    this.$store.dispatch(`checkAuthenticated`);
    
  }
}
</script>
