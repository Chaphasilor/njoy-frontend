<template>
  <div>
    <div
      class="relative bg-white w-full h-full overflow-y-auto text-dark shadow-xl"
    >
      <!-- fixed -->
      <div
        class="sticky top-0 h-auto bg-white mb-4 pt-0 shadow-md  font-quicksand text-dark flex flex-row justify-start"
      >
        <!-- TODO replace icon with 'back' -->
        <img
          class="w-4 my-3 mr-3 ml-5"
          src="@/assets/icons/close.svg"
          alt="Remove"
          @click="$emit('show-dialog', {level: level, type: undefined});"
        >

        <h3
          class="text-lg antialiased font-bold tracking-wide py-2"
        >
          Specify the Destination Path
        </h3>
      </div>

      <div
        class="flex flex-row h-12 mb-8 justify-between"
      >
        <TextField
          name="displayPath"
          class="w-full px-4"
          :value="stringifyPath(currentPath)"
          prefix="/ "
          disabled
        />

      </div>

      <div
        class="flex flex-row h-64 mb-2 px-4 justify-between"
      >
        <DirectoryBrowser
          class="w-full"
          :rootDirectoryTree="rootDirectoryTree"
          :currentDirectory="currentDirectory"
          :currentPath="currentPath"
          @directory-down="directoryDown"
          @directory-up="directoryUp"
        />

      </div>

      <div
        class="w-full px-4 mb-6 flex flex-row justify-center"
      >

        <CTAButton
          v-if="!enableNewFolderInputs"
          class="w-full h-12"
          type="action"
          label="New Folder"
          @click.native="enableNewFolderInputs = true"
        />

        <div
          class="w-full flex flex-row justify-between"
          v-else
        >

          <TextField
            class="inline-block w-3/4 h-12 pr-2"    
            name="new-folder-name"
            :focus="true"
            placeholder="Folder Name"
            v-model="newFolderName"
          />

          <CTAButton
            class="inline-block w-1/4 h-12"
            :type="newFolderName.length > 0 ? `good` : `action`"
            :label="newFolderName.length > 0 ? `Confirm` : `Cancel`"
            @click.native="handleNewFolderClick"
          />
          
        </div>
        
      </div>

      <CTAButton
        class="w-full px-4 mt-16 h-12"
        type="good"
        label="Confirm"
        @click.native="$emit('show-dialog', {level: level, type: undefined})"
      />    
    </div>

  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import TextField from '@/components/inputs/TextField';
import DirectoryBrowser from '@/components/inputs/DirectoryBrowser';

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
      currentPath: [],
      currentDirectory: {},
      invalidPart: ``,
      newFolderName: ``,
      enableNewFolderInputs: false,
    }
  },
  computed: {
    rootDirectoryTree: function() {
      return this.$store.getters.rootDirectoryTree;
    },
    showNewFolderDialog: function() {
      return this.openedDialogs[0].type === 'new-folder';
    }
  },
  watch: {
    currentPath: function() {
      this.$emit('input', this.currentPath);
      console.log(`this.currentPath:`, this.currentPath);
      // this.currentDirectory = this.findCurrentDirectory();
      this.currentDirectory = this.findCurrentDirectoryDummy(this.rootDirectoryTree);
    },
    invalidPart: function() {
      if (this.invalidPart.length != 0) {
        this.currentPath = this.removeInvalidPath(this.currentPath, this.invalidPart);
        this.invalidPart = [];
      }
    },
    rootDirectoryTree: function() {
      // this.currentDirectory = this.findCurrentDirectory();
      this.currentDirectory = this.findCurrentDirectoryDummy(this.rootDirectoryTree);
    }
  },
  methods: {
    stringifyPath(pathArray) {
      return pathArray.reduce((pathString, folderName)  => {
        return `${pathString}${folderName} / `;
      }, '');
    },
    findCurrentPathInSubdirectories(currentPath, currentDirectory) {
      console.log(`currentPath:`, currentPath);
      console.log(`currentDirectory:`, currentDirectory);
      if (currentPath.length === 0) {
        return currentDirectory;
      } else {

        let foundDir = currentDirectory.subdirectories.filter(dir => dir.name === currentPath[0]);
        console.log(`foundDir:`, foundDir);
        if (foundDir.length === 0) {
          return {
            exists: false,
            invalidPart: currentPath,
            closest: currentDirectory,
          }
        } else {
          return this.findCurrentPathInSubdirectories(currentPath.slice(1), foundDir[0]);
        }
        
      }
    },
    findCurrentDirectory() {

      let dir = this.findCurrentPathInSubdirectories(this.currentPath, this.rootDirectoryTree);

      if (dir.exists === false) {
        console.warn(`The path specified couldn't be found!`);
        //TODO handle invalid path error
        alert(`The path specified couldn't be found!`);
        this.invalidPart = dir.invalidPart;
        return dir.closest;
      } else {

        return dir;
        
      }

    },
    findCurrentDirectoryDummy(rootDir) {
      //TODO remove
      let dir = this.findCurrentPathInSubdirectories(this.currentPath, rootDir);

      if (dir.exists === false) {
        console.warn(`The path specified couldn't be found!`);
        alert(`The path specified couldn't be found!`);
        
        this.invalidPart = dir.invalidPart;
        return dir.closest;
      } else {

        return dir;
        
      }

    },
    directoryDown(dir) {
      this.currentPath.push(dir.name);
    },
    directoryUp() {
      this.currentPath.pop();
    },
    removeInvalidPath(specifiedPath, invalidPart) {
      console.log(`specifiedPath.slice(0, specifiedPath.length - invalidPart.length):`, specifiedPath.slice(0, specifiedPath.length - invalidPart.length));
      return specifiedPath.slice(0, specifiedPath.length - invalidPart.length);
    },
    handleNewFolderClick() {

      if (this.newFolderName.length > 0) {

        this.createNewDirectory(this.newFolderName);
        this.newFolderName = ``;
        this.enableNewFolderInputs = false;

      } else {
        this.enableNewFolderInputs = false;
      }
      
    },
    createNewDirectory(name) {

      if (0 == name.length) {
        return;
      }
      //TODO create the folder through the API on the server, (then reload all directories)
      let rootDirectoryTreeCopy = JSON.parse(JSON.stringify(this.rootDirectoryTree));

      let current = this.findCurrentDirectoryDummy(rootDirectoryTreeCopy);

      current.subdirectories.push({
        name: name,
        subdirectories: [],
      })
      
      console.log(`current:`, current);
      console.log(`rootDirectoryTreeCopy:`, rootDirectoryTreeCopy);

      this.$store.dispatch('createNewDummyDirectory', {
        path: this.currentPath,
        name: name,
        newRootDirectoryTree: rootDirectoryTreeCopy,
      });

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