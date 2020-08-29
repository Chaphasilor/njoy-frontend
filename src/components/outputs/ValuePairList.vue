<template>
  <div
    class="w-full h-full px-2 py-4 text-sm rounded-lg border border-dark flex flex-col items-start overflow-scroll"
  >

    <div
      class="h-8 mb-2 bg-gray-300 rounded-lg overflow-scroll"
      :key="index"
      v-for="(pair, index) of pairs"
    >
      <div
        class="p-2 text-center leading-none"
      >
        <span class="font-bold">{{ pair.key }}</span>{{ separator }}{{ pair.value }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ValueList',
  props: {
    pairs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    separator: {
      type: String,
      default: function() {
        return ':';
      }
    },
  },
}
</script>
