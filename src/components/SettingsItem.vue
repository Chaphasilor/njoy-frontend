<template>
  <div
    class="w-full h-full p-4 flex flex-row justify-between text-dark"
  >

    <div
      class="h-full flex flex-row"
      @click="$emit(`show-description`)"
    >

      <svg
        v-if="icon"
        class="w-6 h-6 cursor-pointer stroke-1.5 stroke-current"
        v-html="icon.paths"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg" 
      />

      <span
        class="text-lg font-bold cursor-default px-1"
      >
        {{ title }}
      </span>

      <svg
        class="w-6 h-6 cursor-pointer stroke-1.5 stroke-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg" 
      >
        <title>More Info</title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
        <polyline points="11 12 12 12 12 16 13 16" />
      </svg>

    </div>

    <BasicToggle
      class=""
      :name="`toggle-${name}`"
      :value="value"
      :timeout="timeout"
      @input="$emit(`change`, $event)"
      v-haptic
      @failed="log"
    />

    <!-- <BasicToggle
      class=""
      :name="`toggle-${name}`"
      :value="value"
      :timeout="timeout"
      @input="$emit(`change`, $event)"
      This caueses the 'error' pattern to occur every time v-haptic would trigger. Removing v-haptic will remove vibration alltogether
      v-haptic
      v-haptic:error="{
        trigger: `failed`,
      }"
      @failed="log"
    /> -->
    
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
    icon: {
      type: Object,
      required: true,
    },
    timeout: {
      type: Number,
      required: true,
    },
  },
  methods: {
    log() {
      // alert(`test`);
      console.log(`test`);
    }
  }
}
</script>
