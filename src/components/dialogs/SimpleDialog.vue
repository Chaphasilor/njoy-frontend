<template>
  <div>
    <transition
      name="background-fade"
      :enter-active-class="`transform transition-opacity duration-${transitionDurationIn} ease-out`"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      :leave-active-class="`transition-opacity duration-${transitionDurationOut} ease-in`"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!initialState"
        class="fixed top-0 left-0 w-screen h-screen bg-dark bg-opacity-25"
        @click="$emit('show-dialog', {level: level, type: undefined});"
      >
      </div>
    </transition>

    <transition
      name="dialog-appear-down"
      :enter-active-class="`transform transition-all duration-${transitionDurationIn} ease-out`"
      enter-class="-translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      :leave-active-class="`transition-all duration-${transitionDurationOut} ease-in`"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >

      <div
        v-if="!initialState"
        class="relative w-full h-full flex flex-col justify-center text-dark"
      >

        <div
          class="bg-white rounded-xl shadow-xl"
        >

          <h4
            class="p-4 text-center font-quicksand text-lg antialiased font-bold text-dark tracking-wide"
          >
            {{ title }}
          </h4>

          <div
            class="flex flex-row h-auto mb-2 px-4 justify-between text-center"
          >
            {{ text }}
          </div>

          <div
            class="w-full px-4 py-6 flex flex-row justify-center"
          >
            <CTAButton
              class=" w-full h-12"
              type="good"
              :label="buttonLabel"
              @click.native="handleButton"
            />
          </div>
          
        </div>

      </div>

    </transition>
    
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';

export default {
  name: `ValueDialog`,
  components: {
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
    text: {
      type: String,
      required: false,
      default: function() {
        return ``;
      }
    },
    buttonLabel: {
      type: String,
      required: true,
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
      initialState: true,
      transitionDurationIn: 300,
      transitionDurationOut: 200,
    }
  },
  methods: {
    handleButton() {

      this.initialState = true;
      // wait for the transition to finish before hiding the dialog
      setTimeout(() => {
        this.$emit('show-dialog', {level: this.level, type: undefined});
      }, this.transitionDurationOut);

    },
  },
  mounted() {

    this.$nextTick(function() {
      this.initialState = false;
    })
    
  },
}
</script>
