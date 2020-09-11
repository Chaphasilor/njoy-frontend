<template>
  <div>
    <input
      class="inline-block w-full h-full rounded-lg border border-dark p-2 outline-none focus:border-accent"
      :type="isPassword ? `password` : `text`"
      ref="inputField"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="`${prefix}${value}`"
      @input="$emit('input', removePrefix($event.target.value))"
    >
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: {
      type: String,
      default: function() {
        return '';
      }
    },
    placeholder: {
      type: String,
      default: function() {
        return '';
      }
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
    focus: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    isPassword: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
  },
  watch: {
    value: function() {
      // scroll to the right of the text field when the value changes
      // use timeout to use updated width instead of old one
      setTimeout(() => {
        this.$el.firstChild.scrollLeft = this.$el.firstChild.scrollWidth;
      }, 0);
    }
  },
  methods: {
    removePrefix(textWithPrefix) {
      return textWithPrefix.replace(this.prefix, '');
    }
  },
  mounted() {

    console.log(`this.$refs:`, this.$refs);
    if (this.focus) {
      this.$refs.inputField.focus();
    }
    
  },
}
</script>
