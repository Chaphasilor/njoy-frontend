<template>
  <div>
    <h2
      class="p-2 text-center text-3xl antialiased font-bold text-dark"    
    >
      Start a Download
    </h2>
    <BigButton
      @click.native="type = 'single'"
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
      v-on:dialog-dismissed="type = undefined"
      class="absolute top-0 left-0 w-full h-full flex flex-row justify-center"
    />
  </div>
</template>

<script>

import BigButton from '@/components/BigButton';
import FileDialog from '@/components/FileDialog';

export default {
  name: 'Download',
  components: {
    BigButton,
    FileDialog,
  },
  data: function() {
    return {
      type: undefined, 
    };
  },
  computed: {
    showSingleFileDialog: function() {
      return this.type === 'single';
    },
    showBatchFileDialog: function() {
      return this.type === 'batch';
    },
  }
}
</script>

<style>

</style>