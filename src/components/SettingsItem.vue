<template>
  <div
    class="w-full h-full p-4 flex flex-row justify-between text-dark"
  >

    <span
      class="text-lg font-bold"
    >
      {{ text }}
    </span>

    <BasicToggle
      class=""
      :name="`toggle-${name}`"
      :value="value"
      :timeout="timeout"
      @input="$emit(`change`, $event)"
    />
    
  </div>
</template>

<script>

import BasicToggle from '@/components/inputs/BasicToggle.vue'

export default {
  name: `SettingsItem`,
  components: {
    BasicToggle,
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
