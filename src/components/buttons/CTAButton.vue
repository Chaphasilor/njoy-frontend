<template>
  <div
    class="p-xs"
    v-haptic
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-medium antialiased cursor-pointer"
    >
      <div
        v-if="type == 'resume'"
        class="w-full h-full bg-gradient-to-br from-cta-green to-cta-green-stop flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/resume.svg"
          alt="Resume"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'pause'"
        class="w-full h-full bg-gradient-to-br from-cta-yellow to-cta-yellow-stop flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/pause.svg"
          alt="Pause"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'cancel'"
        class="w-full h-full bg-gradient-to-br from-cta-red to-cta-red-stop flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/cancel.svg"
          alt="Cancel"
          class="w-5 m-auto"
        >
      </div>
      <div
        v-if="type == 'good'"
        class="w-full h-full bg-gradient-to-br from-cta-green to-cta-green-stop flex flex-col justify-center font-semibold text-base"
      >
        {{ label }}
      </div>
      <div
        v-if="type == 'action'"
        class="w-full h-full bg-gradient-to-br from-cta-yellow to-cta-yellow-stop flex flex-col justify-center font-semibold text-base"
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
  },
}
</script>