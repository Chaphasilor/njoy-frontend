<template>
  <div
    id="app"
    class="w-full h-full text-base bg-white font-quicksand"
  >

    <!-- <div
      id="nav"
      class="fixed bottom-0 w-full h-16 text-center rounded-t-xl shadow-top "
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

    try {
      navigator.registerProtocolHandler(`web+download`, `download?url=%s`)
    } catch (err) {
      console.error(`err:`, err)
    }
    console.log(`Registered as protocol handler!`)

  }
}
</script>
