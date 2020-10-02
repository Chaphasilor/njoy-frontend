<template>
  <div
    class="h-full pb-32 bg-eggshell"
  >

    <div
      class="w-full h-16 p-4 flex flex-row justify-between mb-10"
    >

      <h2
        class="w-5/6 flex-shrink-0 text-left text-2xl antialiased font-semibold text-dark tracking-wide"    
      >
        Settings
      </h2>

      <img
        class="h-5 my-3 mr-4 ml-5"
        src="@/assets/icons/back.svg"
        alt="Back"
        @click="$router.go(-1);"
      >
      
    </div>
  
    <SettingsItem
      :text="settings.notifications.text"
      name="notifications"
      :value="settings.notifications.value"
      :timeout="settings.notifications.timeout"
      @change="notificationSettingsChanged"
    />

  </div>
</template>

<script>

import SettingsItem from '@/components/SettingsItem.vue';

export default {
  name: 'Settings',
  components: {
    SettingsItem,
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
  },
  methods: {
    async testPush() {

      let success = this.$store.dispatch(`subscribeToPush`);

      this.pushButtonText = success ? `Successfully subscribed to push!` : `Couldn't subscribe to push :/`;

      if (success) {
        console.log(`Successfully subscribed to push!`);
      } else {
        console.warn(`Couldn't subscribe to push :/`);
      }
      
    },
    async notificationSettingsChanged({ settingsName, value }) {

      if (this.settings[settingsName].value !== value) {

        if (value) {

          // if subscribing doesn't work (i.e. user declines permission, the setting is disabled)
          value = await this.$store.dispatch(`subscribeToPush`);
          
        } else {
          value = !await this.$store.dispatch(`unsubscribePush`);
        }

        this.$store.dispatch(`updateSettings`, {
          settingsName,
          value,
        })
        
      }

    }
  },
  mounted: function() {

    this.$store.dispatch('navigate', { target: this.$route.name });
    
  },
  beforeDestroy: function() {

    if (undefined != this.pollingIntervalID) {
      clearInterval(this.pollingIntervalID);
    }
    
  }
}
</script>

<style>

</style>