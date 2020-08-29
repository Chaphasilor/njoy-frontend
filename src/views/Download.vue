<template>
  <div>
    <h2
      class="p-2 text-center text-3xl antialiased font-bold text-dark"    
    >
      Start a Download
    </h2>
    <BigButton
      @click.native="openedDialogs[0].type = 'single'"
      class="h-56 mx-6 my-4"
      type="single"
    />
    <span
      class="inline-block w-full text-center font-quicksand-bold tracking-tighter font-bold text-lg text-dark"
    >
      OR
    </span>
    <BigButton
      @click.native="type = 'batch'"
      class="h-56 mx-6 my-4 opacity-50"
      type="batch"
    />
    <FileDialog
      v-if="showSingleFileDialog"
      :level="0"
      :opened-dialogs="openedDialogs.slice(1)"
      @dialog-dismissed="type = undefined"
      @show-dialog="openedDialogs.find(x => x.level == $event.level).type = $event.type; log($event); log(openedDialogs.find(x => x.level == $event.level));"
      class="fixed top-0 left-0 w-full h-full flex flex-row justify-center"
    />
    <!-- @show-dialog="alert(JSON.stringify($event));openedDialogs.find(x => x.level = $event.level).type = $event.type" -->
  </div>
</template>

<script>

import BigButton from '@/components/buttons/BigButton';
import FileDialog from '@/components/dialogs/FileDialog';

export default {
  name: 'Download',
  components: {
    BigButton,
    FileDialog,
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
        }
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
  },
  methods: {
    backHandler(next) {

      let level = this.openedDialogs.length - 1;

      while (level >= 0) {

        if (undefined != this.openedDialogs[level].type) {

          this.openedDialogs[level].type = undefined;
          return next(false);

        } else {
          level--;
        }

      }

      return next();
      
    },
    log(payload) {
      console.log(payload);
    }
  },
  mounted: function() {
    
    this.$store.dispatch('navigate', { target: 'download' });
    
  },
  beforeRouteLeave(to, from, next) {
    this.backHandler(next);
  },

}
</script>

<style>

</style>