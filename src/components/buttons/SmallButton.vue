<template>
  <div
    class="p-xs"
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
          color = 'bg-smallbutton-green';
          break;
        case 'action':
          color = 'bg-smallbutton-yellow';
          break;
        case 'bad':
          color = 'bg-smallbutton-red';
          break;
      
        default:
          color = 'bg-smallbutton-green';
          break;
      }

      return color;
      
    }
  }
}
</script>

<style>
  .bg-smallbutton-green {
    background: linear-gradient(111.34deg, #40D428 0%, #5CE346 100%);
  }
  .bg-smallbutton-yellow {
    background: linear-gradient(111.34deg, #D4C328 0%, #E3DD46 100%);
  }
</style>