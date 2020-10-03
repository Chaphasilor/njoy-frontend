<template>
  <div
    class="h-full pb-32 bg-white"
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
      v-for="([settingName, settingValue]) of Object.entries(settings)"
      :key="settingName"
      :text="settingValue.text"
      :name="settingName"
      :value="settingValue.value"
      :timeout="settingValue.timeout"
      @change="settingValue.onChange({
        settingName,
        value: $event,
      })"
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
    // settingsHandler({ settingName, newValue }) {

    //   switch (settingName) {
    //     case `notifications`:
          
    //       break;
      
    //     default:
    //       break;
    //   }

    // },
    async notificationSettingsChanged({ settingName, value }) {

      if (this.settings[settingName].value !== value) {

        if (value) {

          // if subscribing doesn't work (i.e. user declines permission, the setting is disabled)
          value = await this.$store.dispatch(`subscribeToPush`);
          
        } else {
          value = !await this.$store.dispatch(`unsubscribePush`);
        }

        this.$store.dispatch(`updateSetting`, {
          settingName,
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