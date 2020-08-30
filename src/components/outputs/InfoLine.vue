<template>
  <div
    class="flex flex-row justify-between"
  >
    <div
      :class="`w-1/3 text-left h-full whitespace-no-wrap`"
    >
      {{ name }}
    </div>
    <div
      :class="`w-2/3 text-right text-${color} h-full font-light`"
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
    color: {
      type: String,
      required: false,
      default: function() {
        return 'dark';
      },
    },
  }
}
</script>

<style>

</style>