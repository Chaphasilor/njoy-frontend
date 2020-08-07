<template>
  <div
    class="flex flex-row justify-between"
  >
    <div
      class="w-1/3 text-left h-full"
    >
      {{ name }}
    </div>
    <div
      class="w-2/3 text-right h-full font-light"
    >
      {{ value }}
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
      type: String,
      required: false,
      default: function() {
        return 'Unknown';
      },
    },
  }
}
</script>

<style>

</style>