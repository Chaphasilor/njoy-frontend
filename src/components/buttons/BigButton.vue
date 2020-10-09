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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
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
