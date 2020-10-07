<template>
  <div
    class="p-xs"
    v-haptic
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-bold antialiased shadow-lg"
    >
      <div
        v-if="type == 'single'"
        :class="`w-full h-full ${type === `single` ? `bg-cta-green` : `bg-cta-yellow`} flex flex-col justify-center`"
      >
        <svg
          v-if="types[type].icon"
          class="w-16 h-16 mx-auto stroke-current stroke-2 text-white"
          v-html="types[type].icon.paths"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        />
        <!-- <img
          src="@/assets/icons/file_single.svg"
          alt="Cancel"
          class="h-16 m-6"
        > -->
        <span
          class="mt-4 text-3xl"
        >
          Single File
        </span>
      </div>
      <div
        v-if="type == 'batch'"
        class="w-full h-full bg-cta-yellow flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/file_batch.svg"
          alt="Cancel"
          class="h-16 m-6"
        >
        <span
          class="text-3xl"
        >
          Multiple Files
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigButton',
  data: function() {
    return {
      types: {
        single: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="2" />
            `
          }
        },
        batch: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
            `
          }
        },
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
}
</script>
