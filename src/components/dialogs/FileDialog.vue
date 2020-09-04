<template>
  <div>
    <div
      class="relative bg-white w-full h-full overflow-y-auto text-dark shadow-xl"
    >
      <!-- fixed -->
      <div
        class="sticky top-0 h-auto bg-white mb-4 pt-0 shadow-md  font-quicksand text-dark flex flex-row justify-start"
      >
        <img
          class="w-4 my-3 mr-3 ml-5"
          src="@/assets/icons/close.svg"
          alt="Remove"
          @click="$emit('show-dialog', {level: level, type: undefined});"
        >

        <h3
          class="text-lg antialiased font-bold tracking-wide py-2"
        >
          Download a Single File
        </h3>
      </div>

      
      <!-- scrollable -->
      <div
        class="flex flex-col flex-grow"
      >

        <div
          class="flex flex-row h-12 mb-6 justify-between"
        >
          <TextField
            name="url"
            class="w-full pl-4"
            placeholder="Download-URL"
            v-model="fileToDownload.url"
            @input="loadFileSize($event)"
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

        <TextField
          name="filename"
          class="w-full h-12 px-4 mb-6"
          placeholder="Filename"
          v-model="fileToDownload.filename"
        />

        <CTAButton
          class="w-full px-4 h-12"
          type="action"
          label="Manage Cookies & Headers"
          @click.native="$emit('show-dialog', {level: level+1, type: 'cookiesAndHeaders'})"
        />    

        <CTAButton
          class="w-full px-4 mt-16 h-12"
          :type="downloadButtonActive ? `good` : `action`"
          :label="downloadButtonActive ? `Download!` : `Cancel`"
          @click.native="handleDownloadButton"
        />    
      </div>
      
      <div
        class="mb-10"
      ></div>
      
    </div>

    <PathDialog
      v-if="showPathDialog"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @show-dialog="$emit('show-dialog', $event); pathString = stringifyPath(fileToDownload.path)"
      v-model="fileToDownload.path"
      class="fixed bottom-0 left-0 w-full h-full"
    />

    <CookiesAndHeadersDialog
      v-if="showCookiesAndHeadersDialog"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @show-dialog="$emit('show-dialog', $event)"
      v-model="fileToDownload.customHeaders"
      class="fixed bottom-0 left-0 w-full h-full"
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
          // cookie: {
          //   'approve': 1,
          // },
          // 'Authorization': 'Bearer t73485z235u9835498',
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
            cookies: this.customHeaders[`cookie`] ? Object.keys(this.customHeaders[`cookie`]).map(cookieName => {
              return `${cookieName}=${this.customHeaders[`cookie`][cookieName]}`;
            }) : [],
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
    },
    downloadButtonActive: function() {
      return this.fileToDownload.url.length > 0 && this.fileToDownload.filename.length > 0;
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
    handleDownloadButton() {

      if (this.downloadButtonActive) {
        this.submitDownload();
      } else {
        this.$emit('show-dialog', {level: this.level, type: undefined});
      }
      
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

    },
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
      this.loadFileSize(this.fileToDownload.url);
        
    },
    async loadFileSize(url) {

      let size = await this.$store.dispatch(`getFileSize`, url);

      console.log(`size:`, size);
      
    }
  },
  mounted: function() {

    console.log(`this.fileToDownload:`, this.fileToDownload);
    console.log(`this.fileToDownload.toString():`, this.fileToDownload.toString());
    this.$store.dispatch(`loadRootDirectoryTree`); // pre-fetch directories

  }
}
</script>

<style>

</style>