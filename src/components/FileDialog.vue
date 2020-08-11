
<template>
  <div>
    <div
      @click="$emit('dialog-dismissed', true);"
      class="fixed w-full h-full bg-dark bg-opacity-25"
    >
    </div>  
    <div
      class="relative bg-white w-full mx-6 my-16 text-dark rounded-xl shadow-xl"
    >
      <h3
        class="p-4 text-center font-quicksand text-lg antialiased font-bold text-dark tracking-wide"
      >
        Download a Single File
      </h3>

      <div
        class="flex flex-row h-12 mb-6 justify-between"
      >
        <TextField
          class="w-full pl-4"
        />

        <SmallButton
          class="w-20 h-12 ml-2 mr-4"
          type="action"
          icon="clipboard"
        />

      </div>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          class="w-full"
        />

        <SmallButton
          class="w-20 h-12 ml-2"
          type="action"
          icon="folder"
        />

      </div>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          class="w-full"
        />

      </div>


      <div
        class="w-full px-4 mb-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="action"
          label="Manage Cookies & Headers"
        />    
      </div>

      <div
        class="absolute bottom-0 w-full px-6 py-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="good"
          label="Download!"
        />    
      </div>
    </div>
  </div>
</template>

<script>

import CTAButton from '@/components/CTAButton';
import SmallButton from '@/components/SmallButton';
import TextField from '@/components/TextField';

export default {
  name: 'DownloadDetails',
  components: {
    CTAButton,
    SmallButton,
    TextField,
  },
  data: function() {
    return {
      fileToDownload: {
        filename: `Unknown Filename`,
        size: `Unknown Size`,
        path: 'Unknown',
        url: 'Unknown',
        headers: {},
      },
    }
  },
  computed: {
    showSize: function() {
      return false;
    },
  },
  mounted: function() {

    console.log(`this.fileToDownload:`, this.fileToDownload);

  }
}
</script>

<style>

</style>