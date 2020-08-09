<template>
  <div
    class="p-xs"
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-bold antialiased shadow-lg"
    >
      <div
        v-if="type == 'single'"
        class="w-full h-full bg-bigbutton-green flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/file_single.svg"
          alt="Cancel"
          class="h-16 m-6"
        >
        <span
          class="text-3xl"
        >
          Single File
        </span>
      </div>
      <div
        v-if="type == 'batch'"
        class="w-full h-full bg-bigbutton-yellow flex flex-col justify-center"
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
      // iconSourceURLs: {
      //   resume: "@/assets/icons/resume.svg",
      //   pause: "@/assets/icons/pause.svg",
      //   cancel: "@/assets/icons/cancel.svg"
      // },
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
  }
}
</script>

<style>
  .bg-bigbutton-green {
    background: linear-gradient(111.34deg, #40D428 0%, #5CE346 100%);
  }
  .bg-bigbutton-yellow {
    background: linear-gradient(111.34deg, #D4C328 0%, #E3DD46 100%);
  }
</style>