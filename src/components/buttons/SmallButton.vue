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
        <!-- <img
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
        > -->
        <svg
          v-if="icons[icon].icon"
          class="w-8 h-8 m-auto stroke-current stroke-2 text-white"
          v-html="icons[icon].icon.paths"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallButton',
  data: function() {
    return {
      icons: {
        clipboard: {
          icon: {
            paths: `
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="2" />
            `
          }
        },
        folder: {
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
          color = 'bg-cta-green';
          break;
        case 'action':
          color = 'bg-cta-yellow';
          break;
        case 'bad':
          color = 'bg-cta-red';
          break;
      
        default:
          color = 'bg-cta-yellow';
          break;
      }

      return color;
      
    }
  },
}
</script>
