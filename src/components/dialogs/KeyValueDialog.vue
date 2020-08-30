<template>
  <div>
    <div
      @click="$emit('show-dialog', {level: level, type: undefined});"
      class="fixed top-0 left-0 w-screen h-screen bg-dark bg-opacity-25"
    >
    </div>

    <div
      class="relative bg-white w-full text-dark rounded-xl shadow-xl"
    >

      <h4
        class="p-4 text-center font-quicksand text-lg antialiased font-bold text-dark tracking-wide"
      >
        {{ title }}
      </h4>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          name="key"
          class="w-full"
          :focus="true"
          :placeholder="keyPlaceholder"
          v-model="key"
        />
      </div>

      <div
        class="flex flex-row h-12 mb-6 px-4 justify-between"
      >
        <TextField
          name="value"
          class="w-full"
          :placeholder="valuePlaceholder"
          v-model="value"
        />
      </div>

      <div
        class="absolute bottom-0 w-full px-4 py-6 flex flex-row justify-center"
      >
        <CTAButton
          class=" w-full h-12"
          :type="showConfirm ? `good` : `action`"
          :label="showConfirm ? `Confirm` : `Cancel`"
          @click.native="handleButton"
        />    
      </div>

    </div>
    
  </div>
</template>

<script>

import TextField from '@/components/inputs/TextField';
import CTAButton from '@/components/buttons/CTAButton';

export default {
  name: `KeyValueDialog`,
  components: {
    TextField,
    CTAButton,
  },
  props: {
    title: {
      type: String,
      required: false,
      default: function() {
        return ``;
      }
    },
    keyPlaceholder: {
      type: String,
      required: false,
      default: function() {
        return ``;
      }
    },
    valuePlaceholder: {
      type: String,
      required: false,
      default: function() {
        return ``;
      }
    },
    level: {
      type: Number,
      required: true,
    },
    openedDialogs: {
      type: Array,
      required: true,
    },
  },
  data: function() {
    return {
      key: ``,
      value: ``,
    }
  },
  computed: {
    showConfirm: function() {
      return this.key.length > 0 && this.value.length > 0;
    }
  },
  methods: {
    handleButton() {

      if (this.showConfirm) {
        this.$emit('confirm', {
          key: this.key,
          value: this.value,
        });
      }
      
      this.$emit('show-dialog', {level: this.level, type: undefined});

    }
  }
}
</script>
