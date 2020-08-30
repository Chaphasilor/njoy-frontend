<template>
  <div
    class="w-full h-navbar rounded-t-xl bg-white text-center flex flex-row justify-center shadow-top"
  >
    <router-link
      :to="{
        name: 'Progress',
      }"
      :class="(currentView == 'progress' ? 'border-t-2 text-accent' : 'text-dark') + '  w-1/5 h-auto mx-10 my-1 border-accent flex flex-col justify-center'"
    >
      <svg
        :class="(currentView == 'progress' ? 'w-6 h-6' : 'w-4 h-4') + 'w-6 h-6 m-auto stroke-current'"
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 17.875H15.1661L1 1H15.1661L1 17.875Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        v-if="currentView != 'progress'"
      >Progress</span>
    </router-link>
    <router-link
      :to="{
        name: 'Download',
      }"
      :class="(currentView == 'download' ? 'border-t-2 text-accent' : 'text-dark') + ' w-1/5 h-auto mx-10 my-1 border-accent flex flex-col justify-center'"
    >
      <svg
        :class="(currentView == 'download' ? 'w-6 h-6' : 'w-4 h-4') + 'w-6 h-6 m-auto stroke-current'"
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.72859 1C8.72859 1 8.72859 2.80295 8.72859 10.8725M3.76021 8.57654L8.72859 15.4643L13.697 8.57654M1 14.0179V17.875H16.4572V14.5"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        v-if="currentView != 'download'"
      >Download</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentView: function() {
      return this.$store.getters.activeView;
    }
  },
}
</script>

<style>

</style>