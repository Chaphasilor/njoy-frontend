<template>
  <div
    class="p-xs"
    v-haptic
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-medium antialiased cursor-pointer"
    >
      <!-- TODO transition not happening from 'pause' to 'resume' button state. maybe the state changes in-between (maybe to 'unknown'?), causing the transition to abort -->
      <div
        v-if="['resume', 'pause', 'cancel'].includes(type)"
        :class="`w-full h-full ${type === `resume` ? `bg-cta-green` : type === `pause` ? `bg-cta-yellow` : `bg-cta-red`} flex flex-col justify-center transition-colors duration-300`"
      >
        <img
          v-if="type === 'resume'"
          src="@/assets/icons/resume.svg"
          alt="Resume"
          class="w-5 m-auto"
        >
        <img
          v-if="type === 'pause'"
          src="@/assets/icons/pause.svg"
          alt="Pause"
          class="w-5 m-auto"
        >
        <img
          v-if="type === 'cancel'"
          src="@/assets/icons/cancel.svg"
          alt="Cancel"
          class="w-5 m-auto"
        >
      </div>
      <!-- <div
        v-if="type == 'resume'"
        :key="type"
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
        :key="type"
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
        :key="type"
        class="w-full h-full bg-cta-red flex flex-col justify-center"
      >
        <img
          src="@/assets/icons/cancel.svg"
          alt="Cancel"
          class="w-5 m-auto"
        >
      </div> -->
      <div
        v-if="['good', 'action'].includes(type)"
        :class="`w-full h-full ${type === `good` ? ` bg-cta-green` : ` bg-cta-yellow`} flex flex-col justify-center font-semibold text-base transition-colors duration-300`"
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