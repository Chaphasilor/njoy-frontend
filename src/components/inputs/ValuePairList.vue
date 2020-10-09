<template>
  <div
    class="w-full h-full px-2 py-4 text-sm rounded-lg border border-dark flex flex-col items-start flex-no-wrap overflow-scroll"
  >

    <div
      class="h-8 mb-2 bg-gray-300 rounded-lg"
      :key="pair.key"
      v-for="pair of pairs"
      :ref="`pair-${pair.key}`"
    >

      <div
        class="p-2 text-center leading-none whitespace-no-wrap"
      >
        <span class="font-bold">{{ pair.key }}{{ separator }}</span>{{ pair.value }}
        <img
          v-if="removable"
          src="@/assets/icons/close.svg"
          alt="Remove"
          class="inline-block h-3 px-2"
          @click="$emit(`remove-pair`, {key: pair.key, value: pair.value})"
        >
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ValueList',
  props: {
    pairs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    separator: {
      type: String,
      default: function() {
        return ':';
      }
    },
    removable: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data: function() {
    return {
      formerPairLength: 0,
    }
  },
  watch: {
    pairs: {
      deep: true,
      handler: function() {

        this.$nextTick(() => {
          
          if (this.formerPairLength < this.pairs.length) {
            
            let lastPairKey = this.pairs[this.pairs.length-1].key;
            let el = this.$refs[`pair-${lastPairKey}`][0];
            // not supported in firefox. using the normal scrollIntoView causes issues on mobile device, because the page is scrolled before the virtual keyboard is hidden, causing the page to jerk up and down
            el.scrollIntoViewIfNeeded();
            // console.log('this.$refs[`pair-${lastPairKey}`][0]:', this.$refs[`pair-${lastPairKey}`][0]);
            this.$emit(`pair-added`, el);

          } else if (this.formerPairLength === this.pairs.length) {
            this.$emit(`pair-added`, null);
          }

          this.formerPairLength = this.pairs.length;

        })
        
      }
    }
  }
}
</script>
