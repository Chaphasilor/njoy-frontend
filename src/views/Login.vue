<template>
  <div
    class="h-screen pb-32 bg-eggshell"
  >
    <h2
      class="p-2 text-center text-2xl antialiased font-semibold text-dark tracking-wide"    
    >
      Login
    </h2>

    <div
      class="w-full h-full px-16 flex flex-col justify-center"
    >

      <form
        action="#"
        @submit="submit"
      >

        <TextField
          class="my-6"
          placeholder="Username"
          v-model="username"
          @keypress.enter.native="submit"
        />

        <TextField
          class="my-6"
          :is-password="true"
          placeholder="Password"
          v-model="password"
          @keypress.enter.native="submit"
        />

        <CTAButton
          class="w-full h-12 mt-32"
          type="good"
          label="Login"
          @click.native="submit"
        />

      </form>

    </div>

  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import TextField from '@/components/inputs/TextField';

export default {
  name: 'Login',
  components: {
    CTAButton,
    TextField,
  },
  data: function() {
    return {
      username: ``,
      password: ``,
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    async submit() {

      console.log(`Submitted!`);

      let success = await this.$store.dispatch('authenticateApi', {
        username: this.username,
        password: this.password,
      })

      if (success) {
        this.$router.push({
          name: `Progress`,
        })
      }

      
    }
  },
  mounted: function() {

    this.$store.dispatch('navigate', { target: 'login' });

  },
}
</script>

<style>

</style>