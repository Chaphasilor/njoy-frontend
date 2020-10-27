<template>
  <div
    class="flex flex-row justify-between"
  >
    <div
      :class="`w-1/3 text-left h-full whitespace-no-wrap`"
    >
      <span
        class="inline-block"
        v-shared-element:[`${sharedIdBase}-${name.toLowerCase()}-name`]="{
          zIndex: 2,
          restrictToRoutes: restrictionFunction,
        }"
      >
        {{ name }}
      </span>
    </div>
    <div
      :class="`w-2/3 text-right ${color} h-full font-light`"
    >
      <span
        class="inline-block"
        v-shared-element:[`${sharedIdBase}-${name.toLowerCase()}-value`]="{
          zIndex: 2,
          restrictToRoutes: restrictionFunction,
        }"
      >
        {{ value }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoLine',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: function() {
        return 'Unknown';
      },
    },
    color: {
      type: String,
      required: false,
      default: function() {
        return 'text-dark';
      },
    },
    sharedIdBase: {
      type: String,
      required: false,
      default: function() {
        return String(Math.random(500));
      },
    },
    restrictionFunction: {
      type: Function,
      required: false,
      default: function() {
        return () => {return true};
      },
    },
  },
  mounted() {

    console.log(`this.restrictionFunction:`, this.restrictionFunction);
    
  }
}
</script>
