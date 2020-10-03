<template>
  <div
    class="w-full h-full p-4 flex flex-row justify-between text-dark"
  >

    <div
      class="h-full"
      @click="$emit(`show-description`)"
    >

      <span
        class="text-lg font-bold cursor-default"
      >
        {{ title }}
      </span>

      <div
        class="inline-block w-5 h-5 border-1 border-dark rounded-full cursor-pointer"
        title="More Info"
      >
        <svg
          class="stroke-2.5 stroke-current"
          viewBox="0 0 24 24"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg" 
        >
          <title>More Info</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
          <line x1="12" y1="19" x2="12" y2="19.01" />
        </svg>
      </div>

    </div>

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
    title: {
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
