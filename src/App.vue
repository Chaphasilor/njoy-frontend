<template>
  <div
    id="app"
    class="w-full h-full text-base bg-white font-quicksand"
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
    <router-view />

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  async mounted() {

    if (!this.$store.getters.api) {
      await this.$store.dispatch(`mountApi`);
    }
    this.$store.dispatch(`checkAuthenticated`);

    // setInterval(() => {
    //   console.log(Date.now());
    // }, 50)
    
  }
}
</script>
