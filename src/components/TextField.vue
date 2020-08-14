<template>
  <div>
    <input
      class="inline-block w-full h-full rounded-lg border border-dark p-2 outline-none focus:border-accent"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="`${prefix}${value}`"
      @input="$emit('input', removePrefix($event.target.value))"
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
    },
    prefix: {
      type: String,
      default: function() {
        return '';
      }
    },
    disabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
  },
  methods: {
    removePrefix(textWithPrefix) {
      return textWithPrefix.replace(this.prefix, '');
    }
  }
}
</script>
