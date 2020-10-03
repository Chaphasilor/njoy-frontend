<template>
  <div
    class="w-full h-navbar rounded-t-xl bg-white text-center flex flex-row justify-center shadow-top"
  >

    <BetterRouterLink
      v-for="(view, index) in views"
      :key="index"
      :to="{
        name: view.routeName,
      }"
      style="-webkit-tap-highlight-color: transparent;"
      :class="`${!navigationPossible ? `opacity-50 cursor-not-allowed` : `active:stroke-2`} ${(currentView == view.routeName ? 'text-accent' : 'text-dark')} w-1/5 h-auto mx-10 border-accent pt-2 stroke-1.5`"
      v-haptic
    >
      <svg
        class="w-8 h-8 m-auto my-0 stroke-current stroke-inherit"
        v-html="view.icon.paths"
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      />
      <span>{{ view.name }}</span>
    </BetterRouterLink>

  </div>
</template>

<script>

import BetterRouterLink from '@/components/BetterRouterLink.vue';

export default {
  name: 'Navbar',
  components: {
    BetterRouterLink,
  },
  data: function() {
    return {
      views: [
        {
          name: `Progress`,
          routeName: `Progress`,
          icon: {
            paths: `
            <path
              d="M1 17.875H15.1661L1 1H15.1661L1 17.875Z"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            `
          }
        },
        {
          name: `Download`,
          routeName: `Download`,
          icon: {
            paths: `
            <path
              d="M8.72859 1C8.72859 1 8.72859 2.80295 8.72859 10.8725M3.76021 8.57654L8.72859 15.4643L13.697 8.57654M1 14.0179V17.875H16.4572V14.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            `
          }
        },
      ],
      vibrationLength: 25,
      errorVibration: [50, 75, 50],
    }
  },
  computed: {
    currentView: function() {
      return this.$store.getters.activeView;
    },
    navigationPossible: function() {
      return this.$store.getters.authStatus;
    }
  },
}
</script>
