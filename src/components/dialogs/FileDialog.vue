<template>
  <div>
    <div
      class="relative w-full h-full overflow-y-auto bg-white shadow-xl text-dark rounded-parent"
    >
      <!-- fixed -->
      <div
        class="sticky top-0 flex flex-row justify-start h-auto pt-0 mb-4 bg-white shadow-md font-quicksand text-dark"
      >
        <img
          class="w-4 my-3 ml-5 mr-3"
          src="@/assets/icons/close.svg"
          alt="Remove"
          @click="closeDialogIfPossible"
        >

        <h3
          class="py-2 text-lg antialiased font-bold tracking-wide"
        >
          Download a Single File
        </h3>
      </div>

      
      <!-- scrollable -->
      <div
        class="flex flex-col flex-grow"
      >

        <div class="mb-2 ml-6 font-bold">
          Download-URL:
        </div>
        <div
          class="flex flex-row justify-between h-12 mb-2"
        >
          <TextField
            name="url"
            class="w-full pl-4"
            placeholder="e.g. https://example.com"
            v-model="fileToDownload.url"
            @input="loadFileInfo($event)"
          />

          <SmallButton
            class="w-20 h-12 ml-2 mr-4"
            type="action"
            icon="clipboard"
            @click.native="pasteClipboard()"
          />

        </div>
        <div class="h-6 mb-6 ml-6">
          {{ sizeString }}
        </div>

        <div class="mb-2 ml-6 font-bold">
          Destination Path:
        </div>
        <div
          class="flex flex-row justify-between h-12 px-4 mb-12"
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

        <div class="mb-2 ml-6 font-bold">
          Filename:
        </div>
        <TextField
          name="filename"
          class="w-full h-12 px-4 mb-12"
          placeholder="Extension can be omitted"
          v-model="fileToDownload.filename"
        />

        <CTAButton
          class="w-full h-12 px-4"
          type="action"
          label="Manage Cookies & Headers"
          @click.native="$emit('show-dialog', {level: level+1, type: 'cookiesAndHeaders'})"
        />    

        <CTAButton
          class="w-full h-12 px-4 mt-16"
          :type="downloadButtonActive ? `good` : `action`"
          :label="downloadButtonActive ? `Download!` : `Cancel`"
          @click.native="handleDownloadButton"
        />    
      </div>
      
      <div
        class="mb-10"
      ></div>
      
    </div>

    <transition
      name="dialog-slide-up"
      enter-active-class="transition-all duration-300 ease-in-out transform"
      enter-class="scale-x-90 translate-y-full rounded-t-xl"
      enter-to-class="scale-100 translate-y-0 rounded-t-none"
      leave-active-class="transition-all duration-200 ease-in transform"
      leave-class="scale-100 translate-y-0 rounded-t-none"
      leave-to-class="scale-x-90 translate-y-full rounded-t-xl"
    >
      <PathDialog
        v-if="showPathDialog"
        :level="level+1"
        :opened-dialogs="openedDialogs.slice(1)"
        @show-dialog="$emit('show-dialog', $event); pathString = stringifyPath(fileToDownload.path)"
        v-model="fileToDownload.path"
        class="fixed bottom-0 left-0 w-full h-full"
      />
    </transition>
    
    <transition
      name="dialog-slide-up"
      enter-active-class="transition-all duration-300 ease-in-out transform"
      enter-class="scale-x-90 translate-y-full rounded-t-xl"
      enter-to-class="scale-100 translate-y-0 rounded-t-none"
      leave-active-class="transition-all duration-200 ease-in transform"
      leave-class="scale-100 translate-y-0 rounded-t-none"
      leave-to-class="scale-x-90 translate-y-full rounded-t-xl"
    >
      <CookiesAndHeadersDialog
        v-if="showCookiesAndHeadersDialog"
        :level="level+1"
        :opened-dialogs="openedDialogs.slice(1)"
        :close-dialog="openedDialogs[0].close"
        @show-dialog="$emit('show-dialog', $event)"
        @close-dialog="openedDialogs.find(x => x.level == $event.level).close = false"
        v-model="fileToDownload.customHeaders"
        class="fixed bottom-0 left-0 w-full h-full"
      />
    </transition>

    <ConfirmationDialog
      v-if="confirmation.required"
      class="fixed top-0 left-0 w-full h-full p-4"
      title="Are you sure about that?"
      text="If you leave this screen, all your changes will be discarded!"
      confirm-label="Leave"
      cancel-label="Cancel"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @confirm="confirmation.required = false; confirmation.result = true"
      @cancel="confirmation.required = false; confirmation.result = false"
      @show-dialog="openedDialogs.find(x => x.level == $event.level).type = $event.type;"
    />
    
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import SmallButton from '@/components/buttons/SmallButton';
import TextField from '@/components/inputs/TextField';
import PathDialog from  '@/components/dialogs/PathDialog';
import CookiesAndHeadersDialog from  '@/components/dialogs/CookiesAndHeadersDialog';
import ConfirmationDialog from  '@/components/dialogs/ConfirmationDialog';

export default {
  name: 'FileDialog',
  components: {
    CTAButton,
    SmallButton,
    TextField,
    PathDialog,
    CookiesAndHeadersDialog,
    ConfirmationDialog,
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
    closeDialog: {
      type: Boolean,
      required: true,
    },
    downloadUrl: {
      type: String,
      default: function() {
        return ``;
      }
    },
    filename: {
      type: String,
      default: function() {
        return ``;
      }
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
            name: this.filename,
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
      confirmation: {
        required: false,
        result: undefined,
      }
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
    },
    sizeString: function() {
      return this.fileToDownload.size ? `Size: ${this.fileToDownload.size}` : ``;
    },
    formDirty: function() {
      return this.fileToDownload.url.length > 0 || this.fileToDownload.filename.length > 0 || this.fileToDownload.path.length > 0 || Object.entries(this.fileToDownload.customHeaders).length > 0
    },
  },
  watch: {
    closeDialog() {
      if (this.closeDialog) {
        this.closeDialogIfPossible()
      }
    },
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
    },
    //TODO update pathString when path array changes
  },
  methods: {
    beforeWindowUnload(e) {

      if (this.formDirty) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
      }
    },
    async confirmCloseDialog() {
      console.log(`this.formDirty:`, this.formDirty)
      if (this.formDirty) {

        this.confirmation.required = true
        let result = await new Promise((resolve) => {
          let interval = setInterval(() => {
            if (!this.confirmation.required) {
              clearInterval(interval)
              return resolve(this.confirmation.result)
            }
          }, 100)
        })
        this.confirmation.result = undefined
        
        return result
      } else {
        return true
      }
    },
    async closeDialogIfPossible() {
      console.log(`trying to close dialog`)
      let closeable = await this.confirmCloseDialog()
      
      this.$emit('close-dialog', {level: this.level})
      
      if (closeable) {
        this.$emit('show-dialog', {level: this.level, type: undefined})
      }
    },
    handleDownloadButton() {

      if (this.downloadButtonActive) {
        this.submitDownload();
      } else {
        this.$emit('show-dialog', {level: this.level, type: undefined});
      }
      
    },
    async submitDownload() {

      let downloadInfo;

      try {

        downloadInfo = await this.$store.dispatch(`submitDownload`, this.fileToDownload.export());

        this.$emit(`download-submitted`, downloadInfo.id);
        
      } catch (err) {
        console.error(err);
      }

      console.log(`downloadInfo:`, downloadInfo);

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
      this.loadFileInfo(this.fileToDownload.url);
        
    },
    async loadFileInfo(url) {

      this.fileToDownload.size = `Loading...`;
      let fileInfo = await this.$store.dispatch(`getFileInfo`, url);

      console.log(`fileInfo:`, fileInfo);
      this.fileToDownload.size = fileInfo.size;
      this.fileToDownload.filename = fileInfo.name;
      
    }
  },
  mounted: function() {

    console.log(`this.fileToDownload:`, this.fileToDownload);
    console.log(`this.fileToDownload.toString():`, this.fileToDownload.toString());

    if (this.downloadUrl.length > 0) {
      this.fileToDownload.url = this.downloadUrl;
      this.loadFileInfo(this.fileToDownload.url);
    }

    if (this.filename.length > 0) {
      this.fileToDownload.filename = this.filename;
    }
    
    this.$store.dispatch(`loadRootDirectoryTree`); // pre-fetch directories

    window.addEventListener(`beforeunload`, this.beforeWindowUnload)

  },
  beforeDestroy() {

    window.removeEventListener(`beforeunload`, this.beforeWindowUnload)
    
  },
}
</script>

<style>

</style>