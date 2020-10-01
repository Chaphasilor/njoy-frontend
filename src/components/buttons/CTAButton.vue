<template>
  <div
    class="p-xs"
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-medium antialiased cursor-pointer"
    >
      <div
        v-if="type == 'resume'"
        class="w-full h-full bg-cta-green flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/resume.svg"
          alt="Resume"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'pause'"
        class="w-full h-full bg-cta-yellow flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/pause.svg"
          alt="Pause"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'cancel'"
        class="w-full h-full bg-cta-red flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/cancel.svg"
          alt="Cancel"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'good'"
        class="w-full h-full bg-cta-green flex flex-col justify-center font-semibold text-base"
      >
        {{ label }}
      </div>
      <div
        v-if="type == 'action'"
        class="w-full h-full bg-cta-yellow flex flex-col justify-center font-semibold text-base"
      >
        {{ label }}
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