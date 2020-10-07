<template>
  <div
    class="w-full h-navbar rounded-t-xl bg-white text-center flex flex-row justify-center shadow-top"
  >

    <BetterRouterLink
      v-for="view of views"
      :key="view.routeName"
      :to="{
        name: view.routeName,
      }"
      style="-webkit-tap-highlight-color: transparent;"
      :class="`${!navigationPossible ? `opacity-50 cursor-not-allowed` : `active:stroke-2`} ${(currentView == view.routeName ? 'text-accent' : 'text-dark')} w-1/5 h-auto mx-10 pt-2 stroke-1.5 transition-colors duration-300 ease-out`"
      v-haptic
    >
      <!-- v-shared-element:[`navbar-${view.routeName}`] -->
      <svg
        class="w-8 h-8 m-auto my-0 stroke-current stroke-inherit"
        v-html="view.icon.paths"
        width="16"
        height="19"
        viewBox="0 0 24 24"
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
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="4" y1="19" x2="20" y2="19" />
            <polyline points="4 15 8 9 12 11 16 6 20 10" />
            `
          }
        },
        {
          name: `Download`,
          routeName: `Download`,
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <polyline points="7 11 12 16 17 11" />
            <line x1="12" y1="4" x2="12" y2="16" />
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
