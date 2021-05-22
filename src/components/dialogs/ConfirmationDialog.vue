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
        class="fixed top-0 left-0 w-screen h-screen bg-opacity-25 bg-dark"
      >
      </div>
    </transition>

    <transition
      name="dialog-appear-down"
      :enter-active-class="`transform transition-all duration-${transitionDurationIn} ease-out`"
      enter-class="-translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      :leave-active-class="`transition-all duration-${transitionDurationOut} ease-in`"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >

      <div
        v-if="!initialState"
        class="relative flex flex-col justify-center w-full h-full text-dark"
        @click="$emit('show-dialog', {level: level, type: undefined});"
      >

        <div
          class="bg-white shadow-xl rounded-xl"
          @click.stop
        >

          <h4
            class="p-4 text-xl antialiased font-bold tracking-wide text-center font-quicksand text-dark"
          >
            {{ title }}
          </h4>

          <div
            class="flex flex-row justify-between h-auto px-4 mb-2 text-center"
          >
            {{ text }}
          </div>

          <div
            class="flex flex-row justify-center w-full px-4 py-6"
          >
            <CTAButton
              class="w-full h-12 mr-4"
              type="good"
              :label="confirmLabel"
              @click.native="handleConfirmButton"
            />
            <CTAButton
              class="w-full h-12"
              type="action"
              :label="cancelLabel"
              @click.native="handleCancelButton"
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
  name: `ConfirmationDialog`,
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
    confirmLabel: {
      type: String,
      required: true,
    },
    cancelLabel: {
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
    handleConfirmButton() {

      this.initialState = true;
      // wait for the transition to finish before hiding the dialog
      setTimeout(() => {
        this.$emit('confirm');
        this.$emit('show-dialog', {level: this.level, type: undefined});
      }, this.transitionDurationOut);

    },
    handleCancelButton() {

      this.initialState = true;
      // wait for the transition to finish before hiding the dialog
      setTimeout(() => {
        this.$emit('cancel');
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
