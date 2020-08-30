<template>
  <div
    class="w-full h-full px-2 py-4 text-sm rounded-lg border border-dark flex flex-col items-start flex-no-wrap overflow-scroll"
  >

    <div
      class="h-8 mb-2 bg-gray-300 rounded-lg"
      :key="index"
      v-for="(pair, index) of pairs"
    >

      <div
        class="p-2 text-center leading-none whitespace-no-wrap"
      >
        <span class="font-bold">{{ pair.key }}</span>{{ separator }}{{ pair.value }}
        <img
          v-if="removable"
          src="@/assets/icons/close.svg"
          alt="Remove"
          class="inline-block h-3 px-2"
          @click="$emit(`remove-pair`, {key: pair.key, value: pair.value})"
        >
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
    removable: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
}
</script>
