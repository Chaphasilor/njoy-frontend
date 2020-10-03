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
        class="w-full h-full bg-gradient-to-br from-cta-green to-cta-green-stop flex flex-col justify-center"
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
        class="w-full h-full bg-gradient-to-br from-cta-yellow to-cta-yellow-stop flex flex-col justify-center"
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
  },
}
</script>
