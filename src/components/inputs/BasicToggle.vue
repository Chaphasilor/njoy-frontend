<template>
  <div
    class="relative w-14 h-7 rounded-full overflow-hidden"
    type="checkbox"
  >
    <input
      class="block appearance-none w-full h-full bg-gray-500 checked:bg-cta-green transition-colors duration-300 ease-out"
      type="checkbox"
      :name="name"
      :ref="name"
      :id="id"
      @input="handleInput"
    >
    <label
      :for="id"
      :class="`${checked ? `translate-x-7` : `translate-x-0`} absolute top-0 left-0 m-1 transform block bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-out`"
    ></label>
    
  </div>
</template>

<script>
export default {
  name: `BasicToggle`,
  data: function() {
    return {
      id: this.makeId(16),
      checked: undefined,
    }
  },
  props: {
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
  },
  watch: {
    value() {
      console.log(`this.value:`, this.value);
      this.$refs[this.name].checked = this.value;
    },
    checked() {
      console.log(`this.checked:`, this.checked);
      this.$refs[this.name].checked = this.checked;
    }
  },
  methods: {
    makeId(length) {
      let result = ``;
      let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
      for (let i=0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    },
    handleInput(event) {

      console.log(`this.$refs[this.name].checked:`, this.$refs[this.name].checked);
      // emit the value that should be switched to
      this.checked = event.target.checked;
      this.$emit(`input`, event.target.checked);
      // but keep the current settings value until the setting is updated in the store
      setTimeout(() => {
        console.log(`this.checked:`, this.checked);
        this.checked = this.value;
      }, this.timeout)

      
    }
  },
  mounted() {

    this.checked = this.value;
    
  },
}
</script>