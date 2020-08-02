<template>
  <div
    class="p-xs"
  >
    <div
      v-if="type == 'resume'"
      class="w-full h-full rounded-xl bg-cta-green flex flex-col justify-center"
    >
      <img
        src="@/assets/icons/resume.svg"
        alt="Resume"
        class="w-4 h-4 m-auto"
      >
    </div>
    <div
      v-if="type == 'pause'"
      class="w-full h-full rounded-xl bg-cta-yellow flex flex-col justify-center"
    >
      <img
        src="@/assets/icons/pause.png"
        alt="Pause"
        class="w-4 h-4 m-auto"
      >
    </div>
    <div
      v-if="type == 'cancel'"
      class="w-full h-full rounded-xl bg-cta-red flex flex-col justify-center"
    >
      <img
        src="@/assets/icons/cancel.svg"
        alt="Cancel"
        class="w-4 h-4 m-auto"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTAButton',
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
      default: 'resume',
    }
  },
  computed: {
    // iconSource: function() {
    //   return this.iconSourceURLs[this.type];
    // }
  }
}
</script>

<style>
  .bg-cta-green {
    background: linear-gradient(156.44deg, #40D428 0%, #5CE346 100%);
  }
  .bg-cta-yellow {
    background: linear-gradient(168.12deg, #D4C328 0%, #E3DD46 100%);
  }
  .bg-cta-red {
    background: linear-gradient(118.83deg, #D64C21 0%, rgba(214, 76, 33, 0.76) 197.3%);
  }
</style>