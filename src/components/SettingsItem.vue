<template>
  <div
    class="w-full h-full p-4 flex flex-row justify-between text-dark"
  >

    <span
      class="text-lg font-bold"
    >
      {{ text }}
    </span>

    <Toggle
      class=""
      :name="`toggle-${name}`"
      :value="value"
      :timeout="timeout"
      @input="$emit(`change`, {settingsName: name, value: $event})"
    />
    
  </div>
</template>

<script>

import Toggle from '@/components/inputs/Toggle.vue'

export default {
  name: `SettingsItem`,
  components: {
    Toggle,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    timeout: {
      type: Number,
      required: true,
    },
  }
}
</script>
