<template>
  <div
    class="p-xs"
    v-haptic
  >
    <div
      class="w-full h-full rounded-lg overflow-hidden text-center text-lg text-white font-bold antialiased shadow-md"
    >
      <div
        :class="`w-full h-full flex flex-col justify-center ${buttonColorClass}`"
      >
        <img
          v-if="icon === 'clipboard'"
          src="@/assets/icons/clipboard.svg"
          alt="Cancel"
          class="h-20 m-2"
        >
        <img
          v-if="icon === 'folder'"
          src="@/assets/icons/folder.svg"
          alt="Cancel"
          class="h-20 m-3"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallButton',
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
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonColorClass: function() {

      let color = '';

      switch (this.type) {
        case 'good':
          color = 'bg-gradient-to-br from-cta-green to-cta-green-stop';
          break;
        case 'action':
          color = 'bg-gradient-to-br from-cta-yellow to-cta-yellow-stop';
          break;
        case 'bad':
          color = 'bg-gradient-to-br from-cta-red to-cta-red-stop';
          break;
      
        default:
          color = 'bg-gradient-to-br from-cta-green to-cta-green-stop';
          break;
      }

      return color;
      
    }
  },
}
</script>
