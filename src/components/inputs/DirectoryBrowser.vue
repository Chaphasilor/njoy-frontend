<template>
  <div
    class="flex flex-col items-start w-full h-full px-2 py-4 overflow-auto border rounded-lg border-dark"
  >

    <div
      v-if="currentPath.length > 0"
      class="h-6 mb-2 bg-gray-300 rounded-lg"
      @click="$emit('directory-up')"
    >
      <div
        class="w-8 text-base leading-normal text-center"
      >
        ..
      </div>
    </div>

    <div
      class="h-8 mb-2 bg-gray-300 rounded-lg"
      :key="index"
      v-for="(dir, index) of currentDirectory.subDirectories"
      @click="$emit('directory-down', dir)"
    >
      <div
        class="p-2 text-base leading-none text-center"
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
    currentPath: {
      type: Array,
      default: function() {
        return [];
      }
    },
    currentDirectory: {
      type: Object,
      required: true,
    }
  },
}
</script>
