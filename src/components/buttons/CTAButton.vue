<template>
  <div
    class="p-xs"
    v-haptic
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center font-bold text-lg text-white antialiased cursor-pointer"
    >
      <!-- TODO transition not happening from 'pause' to 'resume' button state. maybe the state changes in-between (maybe to 'unknown'?), causing the transition to abort -->
      <div
        :class="`w-full h-full ${(type === `resume` || type === `good`) ? `bg-cta-green` : type === `cancel` ? `bg-cta-red` : `bg-cta-yellow`} flex flex-col justify-center transition-colors duration-300`"
      >
        <svg
          v-if="types[type].icon"
          class="w-6 h-6 m-auto stroke-current stroke-2 text-white"
          v-html="types[type].icon.paths"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        />
        <span
          v-else
        >{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //TODO listen to key presses (enter/return) and click the cta button
  name: 'CTAButton',
  data: function() {
    return {
      types: {
        resume: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 4v16l13 -8z" />
            `
          }
        },
        pause: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
            `
          }
        },
        cancel: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <rect x="5" y="5" width="14" height="14" rx="2" />
            `
          }
        },
        good: {
        },
        action: {

        }
      }
    }
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  computed: {
    // iconSource: function() {
    //   return this.iconSourceURLs[this.type];
    // }
  },
  mounted() {
    console.log(`test`);
  }
}
</script>