<template>
  <div>
    <input
      class="inline-block w-full h-full rounded-lg border border-dark p-2 outline-none focus:border-accent"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    }
  }
}
</script>
