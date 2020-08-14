
<template>
  <div>
    <!-- <div
      @click="$emit('dialog-dismissed', true);"
      class="fixed w-full h-full bg-dark bg-opacity-25"
    >
    </div>   -->
    <div
      class="relative bg-white w-full mx-6 my-16 text-dark rounded-xl shadow-xl"
    >
      <h3
        class="p-4 text-center font-quicksand text-lg antialiased font-bold text-dark tracking-wide"
      >
        Specify the Destination Path
      </h3>

      <div
        class="flex flex-row h-12 mb-8 justify-between"
      >
        <TextField
          name="displayPath"
          class="w-full px-4"
          :value="stringifyPath(currentPath)"
          prefix="/"
          disabled
        />

      </div>

      <div
        class="flex flex-row h-52 mb-2 px-4 justify-between"
      >
        <DirectoryBrowser
          class="w-full"
          placeholder="Destination Path"
          v-model="currentPath"
        />

      </div>

      <div
        class="w-full px-4 mb-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="action"
          label="New Folder"
        />    
      </div>

      <div
        class="absolute bottom-0 w-full px-6 py-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="good"
          label="Confirm"
        />    
      </div>
    </div>
  </div>
</template>

<script>

import CTAButton from '@/components/CTAButton';
import TextField from '@/components/TextField';
import DirectoryBrowser from '@/components/DirectoryBrowser';

export default {
  name: 'PathDialog',
  components: {
    CTAButton,
    TextField,
    DirectoryBrowser,
  },
  props: {
    value: {
      // current path, renamed for use with v-model
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data: function() {
    return {
      currentPath: [],
    }
  },
  computed: {

  },
  watch: {
    currentPath: function() {
      this.$emit('input', this.currentPath);
    }
  },
  methods: {
    stringifyPath(pathArray) {
      console.log(`pathArray:`, pathArray);
      return pathArray.reduce((pathString, folderName)  => {
        return `${pathString}${folderName}/`;
      }, '');
    }
  },
  created: function() {

    this.currentPath = this.value; // leave in created so that the initial empty array isn't propagated throught the event

  },
  mounted: function() {

    console.log(`this.currentPath:`, this.currentPath);

  }
}
</script>

<style>

</style>