<template>
  <!-- Behaves like a normal router link, but can be prevented from routing if click propagation is prevented -->
  <div
    @click="navigate"
  >

    <slot></slot>

  </div>
</template>

<script>
export default {
  name: `BetterRouterLink`,
  props: {
    to: {
      type: Object,
      required: true,
    }
  },
  methods: {
    navigate() {

      this.$emit(`click`);
      this.$router.push(this.to);

    }
  }
}
</script>
