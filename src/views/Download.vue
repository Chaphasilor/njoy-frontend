<template>
  <div
    class="w-full h-full"
  >

    <div
      class="flex flex-row justify-between w-full h-16 p-4"
      v-shared-element:page-header
    >

      <h2
        class="flex-shrink-0 w-5/6 text-2xl antialiased font-semibold tracking-wide text-left text-dark"
      >
        Start a Download
      </h2>

      <svg
        class="w-8 h-8 text-dark stroke-current stroke-1.5 active:stroke-2 transition-colors duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        @click="$router.push({name: `Settings`})"
        v-haptic
        v-shared-element:settings-icon
      >
        <title>Settings</title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="6" cy="10" r="2" />
        <line x1="6" y1="4" x2="6" y2="8" />
        <line x1="6" y1="12" x2="6" y2="20" />
        <circle cx="12" cy="16" r="2" />
        <line x1="12" y1="4" x2="12" y2="14" />
        <line x1="12" y1="18" x2="12" y2="20" />
        <circle cx="18" cy="7" r="2" />
        <line x1="18" y1="4" x2="18" y2="5" />
        <line x1="18" y1="9" x2="18" y2="20" />
      </svg>
      
    </div>

    <BigButton
      @click.native="openedDialogs[0].type = 'single'"
      class="h-56 mx-6 my-4"
      type="single"
    />

    <span
      class="inline-block w-full text-lg font-bold tracking-tighter text-center opacity-25 font-quicksand-bold text-dark"
    >
      OR
    </span>

    <BigButton
      @click.native="type = 'batch'"
      class="h-56 mx-6 my-4 opacity-25"
      type="batch"
    />

    <transition
      name="dialog-slide-up"
      enter-active-class="transition-all duration-300 ease-in-out transform"
      enter-class="scale-x-90 translate-y-full rounded-t-xl"
      enter-to-class="scale-100 translate-y-0 rounded-t-none"
      leave-active-class="transition-all duration-200 ease-in transform"
      leave-class="scale-100 translate-y-0 rounded-t-none"
      leave-to-class="scale-x-90 translate-y-full rounded-t-xl"
    >
      <FileDialog
        v-if="showSingleFileDialog"
        :level="0"
        :opened-dialogs="openedDialogs.slice(1)"
        :download-url="receivedUrl"
        :filename="$route.query.title"
        @show-dialog="openedDialogs.find(x => x.level == $event.level).type = $event.type;"
        @download-submitted="handleDownloadSubmitted"
        class="fixed bottom-0 left-0 z-10 w-full h-full"
      />
    </transition>

    <Navbar
      class="fixed bottom-0"
    />

  </div>
</template>

<script>

import BigButton from '@/components/buttons/BigButton';
import FileDialog from '@/components/dialogs/FileDialog';
import Navbar from '@/components/Navbar';

export default {
  name: 'Download',
  components: {
    BigButton,
    FileDialog,
    Navbar,
  },
  data: function() {
    return {
      type: undefined, 
      openedDialogs: [
        {
          level: 0,
          type: undefined,
        },
        {
          level: 1,
          type: undefined,
        },
      ]
    };
  },
  computed: {
    showSingleFileDialog: function() {
      // return this.type === 'single';
      return this.openedDialogs[0].type === 'single';
    },
    showBatchFileDialog: function() {
      // return this.type === 'batch';
      return this.openedDialogs[0].type === 'batch';
    },
    receivedUrl: function() {

      let url = decodeURI(this.$route.query.url)
      console.log(`url:`, url)
      if (url.split(`:`)[0] === `web+download`) {
        let urlArray = url.split(`:`)
        urlArray.shift()
        url = urlArray.join(`:`)
      } else {

        if (this.isValidHttpUrl(this.$route.query.url)) {
          url = this.$route.query.url;
        } else if (this.isValidHttpUrl(this.$route.query.text)) {
          url = this.$route.query.text;
        } else {
          url = ``;
        }

      }

      return url
      
    }
  },
  methods: {
    backHandler(next) {

      let level = this.openedDialogs.length - 1;

      console.log(`this.openedDialogs[0].type:`, this.openedDialogs[0].type);

      while (level >= 0) {

        if (undefined != this.openedDialogs[level].type) {

          this.openedDialogs[level].type = undefined;
          navigator.vibrate(25);
          return next(false);

        } else {
          level--;
        }

      }

      return next();
      
    },
    handleDownloadSubmitted() {

      // close all dialogs
      this.openedDialogs.forEach(x => x.type = undefined);
      
      // navigate back to progress overview
      this.$router.push({
        name: 'Progress',
      })
      
    },
    isValidHttpUrl(string) {
      
      let url;
      try {
        url = new URL(string);
      } catch (err) {
        return false;  
      }
      return url.protocol === "http:" || url.protocol === "https:";

    }
  },
  mounted: function() {
    
    this.$store.dispatch('navigate', { target: this.$route.name });

    if (this.$route.query.text || this.$route.query.url) {

      if (!(this.receivedUrl.length > 0)) {
        alert(`No valid URL provided!`);
      } else {
        this.openedDialogs[0].type = `single`;
      }
      
    }

  },
  beforeRouteLeave(to, from, next) {
    console.log(`to:`, to);
    console.log(`from:`, from);
    this.backHandler(next);
  },

}
</script>

<style>

</style>