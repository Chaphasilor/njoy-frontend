<template>
  <div
    class="w-full h-full px-2 py-4 rounded-lg border border-dark flex flex-col items-start overflow-scroll"
  >

    <div
      v-if="currentPath.length > 0"
      class="h-6 mb-2 bg-gray-300 rounded-lg"
      @click="directoryUp()"
    >
      <div
        class="w-8 text-center text-base leading-normal"
      >
        ..
      </div>
    </div>

    <div
      class="h-8 mb-2 bg-gray-300 rounded-lg"
      :key="index"
      v-for="(dir, index) of subdirectories"
      @click="directoryDown(dir)"
    >
      <div
        class="p-2 text-center text-base leading-none"
      >
      {{ dir.name }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DirectoryBrowser',
  props: {
    value: {
      // path, renamed for use with v-model
      type: Array,
      default: function() {
        return [];
      }
    },
  },
  data: function() {
    return {
      currentPath: [],
    }
  },
  computed: {
    allDirectories: function() {

      //TODO fetch these from vuex
      
      return {
        name: 'ROOT',
        subdirectories: [
          {
            name: 'Backups',
            subdirectories: [
              {
                name: 'OnePlus 5',
                subdirectories: [],
              },
              {
                name: 'Raspberry Pi',
                subdirectories: [],
              },
              {
                name: 'Spectre',
                subdirectories: [],
              },
            ]
          },
          {
            name: 'Documents',
            subdirectories: [
              {
                name: 'Uni',
                subdirectories: [],
              },
              {
                name: 'Unsorted',
                subdirectories: [],
              },
              {
                name: 'Work',
                subdirectories: [],
              },
            ]
          },
          {
            name: 'Media',
            subdirectories: [
              {
                name: 'eBooks',
                subdirectories: [],
              },
              {
                name: 'Movies',
                subdirectories: [],
              },
              {
                name: 'Music',
                subdirectories: [],
              },
              {
                name: 'Pictures',
                subdirectories: [
                  {
                    name: 'Wallpapers',
                    subdirectories: [],
                  },
                ],
              },
              {
                name: 'TV Shows',
                subdirectories: [
                  {
                    name: 'Altered Carbon (2018)',
                    subdirectories: [],
                  },
                  {
                    name: 'Cloak and Dagger (2018)',
                    subdirectories: [
                      {
                        name: 'S1',
                        subdirectories: [],
                      },
                      {
                        name: 'S2',
                        subdirectories: [],
                      },
                    ],
                  },
                  {
                    name: 'Dark (2017)',
                    subdirectories: [
                      {
                        name: 'Season 1',
                        subdirectories: [],
                      },
                      {
                        name: 'Season 2',
                        subdirectories: [],
                      },
                      {
                        name: 'Season 3',
                        subdirectories: [],
                      },
                    ],
                  },
                  {
                    name: 'Dark Matter (2015)',
                    subdirectories: [
                      {
                        name: 'Season 1',
                        subdirectories: [],
                      },
                      {
                        name: 'Season 2',
                        subdirectories: [],
                      },
                      {
                        name: 'Season 3',
                        subdirectories: [],
                      },
                    ],
                  },
                ],
              },
            ]
          },
          {
            name: 'Misc',
            subdirectories: [
              {
                name: 'Code',
                subdirectories: [],
              },
              {
                name: 'Jam Session',
                subdirectories: [],
              },
            ]
          },
        ]
      }
    },
    subdirectories: function() {

      console.log(`this.currentPath:`, this.currentPath);
      console.log(`this.allDirectories:`, this.allDirectories);

      let dir = this.findCurrentPathInSubdirectories(this.currentPath, this.allDirectories);

      if (dir == false) {
        console.warn(`The path specified couldn't be found!`);
        alert(`The path specified couldn't be found!`);
        return [];
      } else {

        return dir.subdirectories;
        
      }
      
    }
  },
  watch: {
    currentPath: function() {
      this.$emit('input', this.currentPath);
    }
  },
  methods: {
    findCurrentPathInSubdirectories(currentPath, currentDirectory) {
      console.log(`currentPath:`, currentPath);
      console.log(`currentDirectory:`, currentDirectory);
      if (currentPath.length === 0) {
        return currentDirectory;
      } else if (currentDirectory.subdirectories.length === 0) {
        return false;
      } else {

        let foundDir = currentDirectory.subdirectories.filter(dir => dir.name === currentPath[0]);
        console.log(`foundDir:`, foundDir);
        if (foundDir.length === 0) {
          return false;
        } else {
          return this.findCurrentPathInSubdirectories(currentPath.slice(1), foundDir[0]);
        }
        
      }
    },
    directoryDown(dir) {
      this.currentPath.push(dir.name);
    },
    directoryUp() {
      this.currentPath.pop();
    }
  },
  mounted() {

    this.currentPath = this.value;
    
  }
}
</script>
