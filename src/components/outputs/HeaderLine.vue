<template>
  <div
    class="flex flex-row justify-between text-sm"
  >
    <div
      class="w-1/3 text-left whitespace-no-wrap"
    >
      {{ name }}:
    </div>
    <div
      class="w-2/3 text-right min-h-full font-light flex flex-col"
    >
      <span v-if="!multiline">
        {{ value }}
      </span>
      <span
        v-else
        :key="value.indexOf(line)"
        v-for="line of value"
        class="leading-5"
      >
        {{ line }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoLine',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Array],
      required: false,
      default: function() {
        return 'Unknown';
      },
    },
  },
  computed: {
    multiline: function() {
      return typeof this.value == 'object';
    }
  }
}
</script>

<style>

</style>