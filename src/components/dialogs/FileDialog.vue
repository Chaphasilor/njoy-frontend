
<template>
  <div>
    <div
      @click="$emit('show-dialog', {level: level, type: undefined});"
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
          name="url"
          class="w-full pl-4"
          placeholder="Download-URL"
          v-model="fileToDownload.url"
        />

        <SmallButton
          class="w-20 h-12 ml-2 mr-4"
          type="action"
          icon="clipboard"
          @click.native="pasteClipboard()"
        />

      </div>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          name="path"
          class="w-full"
          placeholder="Destination Path"
          prefix="/"
          v-model="pathString"
        />

        <SmallButton
          class="w-20 h-12 ml-2"
          type="action"
          icon="folder"
          @click.native="$emit('show-dialog', {level: level+1, type: 'path'})"
        />

      </div>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          name="filename"
          class="w-full"
          placeholder="Filename"
          v-model="fileToDownload.filename"
        />

      </div>

      <div
        class="w-full px-4 mb-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="action"
          label="Manage Cookies & Headers"
          @click.native="$emit('show-dialog', {level: level+1, type: 'cookiesAndHeaders'})"
        />    
      </div>

      <div
        class="absolute bottom-0 w-full px-6 py-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          type="good"
          label="Download!"
          @click.native="submitDownload()"
        />    
      </div>
    </div>

    <PathDialog
      v-if="showPathDialog"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @show-dialog="$emit('show-dialog', $event); pathString = stringifyPath(fileToDownload.path)"
      v-model="fileToDownload.path"
      class="fixed top-0 left-0 w-full h-full flex flex-row justify-center"
    />

    <CookiesAndHeadersDialog
      v-if="showCookiesAndHeadersDialog"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @show-dialog="$emit('show-dialog', $event)"
      v-model="fileToDownload.customHeaders"
      class="fixed top-0 left-0 w-full h-full flex flex-row justify-center"
    />
    
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import SmallButton from '@/components/buttons/SmallButton';
import TextField from '@/components/inputs/TextField';
import PathDialog from  '@/components/dialogs/PathDialog';
import CookiesAndHeadersDialog from  '@/components/dialogs/CookiesAndHeadersDialog';

export default {
  name: 'FileDialog',
  components: {
    CTAButton,
    SmallButton,
    TextField,
    PathDialog,
    CookiesAndHeadersDialog,
  },
  props: {
    //TODO use object for v-ifs of dialogs, open dialogs by emitting an event to the view
    level: {
      type: Number,
      required: true,
    },
    openedDialogs: {
      type: Array,
      required: true,
    },
  },
  data: function() {
    return {
      fileToDownload: {
        filename: '',
        size: '',
        path: [],
        url: '',
        customHeaders: {
          cookie: {
            'approve': 1,
          },
          'Authorization': 'Bearer t73485z235u9835498',
        },
        export: function() {
          return {
            filename: this.filename,
            url: this.url,
            path: this.path.join(`/`),
            customHeaders: Object.keys(this.customHeaders).filter(key => `cookie` != key).reduce((headerObject, key) => {
              headerObject[key] = this.customHeaders[key];
              return headerObject;
            }, {}), // remove 'cookie' attribute
            cookies: Object.keys(this.customHeaders[`cookie`]).map(cookieName => {
              return `${cookieName}=${this.customHeaders[`cookie`][cookieName]}`;
            })
          }
        }
      },
      // showPathDialog: false,
      // showCookiesAndHeadersDialog: false,
      pathString: '',
    }
  },
  computed: {
    showSize: function() {
      return false;
    },
    showPathDialog: function() {
      return this.openedDialogs[0].type === 'path';
    },
    showCookiesAndHeadersDialog: function() {
      return this.openedDialogs[0].type === 'cookiesAndHeaders';
    }
  },
  watch: {
    pathString: function() {
      this.fileToDownload.path = this.arrayifyPath(this.pathString);
    },
    fileToDownload: {
      deep: true,
      handler: function() {
        console.log(`this.fileToDownload:`, this.fileToDownload);
      }
    },
    openedDialogs: {
      deep: true,
      handler: function() {
        console.log(this.openedDialogs);
      }
    }
    //TODO update pathString when path array changes
  },
  methods: {
    stringifyPath(pathArray) {
      //TODO trailing slash causes 'invalid' path when trying to find currentDirectory
      return pathArray.reduce((pathString, folderName)  => {
        return `${pathString}${folderName}/`;
      }, '');
    },
    arrayifyPath(pathString) {
      return pathString.split('/').reduce((pathArray, folderName) => {
        return [...pathArray, folderName].filter(name => name.length > 0);
      }, []);
    },
    async pasteClipboard() {

      let clipboard = '';

      try {
        clipboard = await navigator.clipboard.readText();
      } catch (err) {
        alert("Clipboard couldn't be accessed!");
      }

      this.fileToDownload.url = clipboard;
        
    },
    async submitDownload() {

      let responseText;

      try {

        responseText = await this.$store.dispatch(`submitDownload`, this.fileToDownload.export());

        this.$emit(`download-submitted`);
        
      } catch (err) {
        console.error(err);
      }

      console.log(`responseText:`, responseText);

    }
  },
  mounted: function() {

    console.log(`this.fileToDownload:`, this.fileToDownload);
    console.log(`this.fileToDownload.toString():`, this.fileToDownload.toString());

  }
}
</script>

<style>

</style>