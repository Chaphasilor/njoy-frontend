<template>
  <div
    class="h-full pb-32 bg-white"
  >

    <div
      class="flex flex-row justify-between w-full h-16 p-4 mb-10"
      v-shared-element:page-header
    >

      <h2
        class="flex-shrink-0 w-5/6 text-2xl antialiased font-semibold tracking-wide text-left text-dark"
      >
        Settings
      </h2>

      <svg
        class="w-8 h-8 mr-px stroke-current stroke-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        @click="$router.go(-1);" 
        v-haptic
        v-shared-element:settings-icon
      >
        <title>Back</title>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="15 6 9 12 15 18" />
      </svg>

      
    </div>
  
    <SettingsItem
      v-for="([settingName, settingValue]) of Object.entries(settings)"
      :key="settingName"
      :title="settingValue.title"
      :name="settingName"
      :icon="settingValue.icon"
      :value="settingValue.value"
      :disabled="settingValue.disabled"
      :timeout="settingValue.timeout"
      @change="settingValue.onChange({
        settingName,
        value: $event,
      })"
      @show-description="openDescription(settingValue.title, settingValue.description)"
    />

    <SimpleDialog
      v-if="showDescription"
      class="fixed top-0 left-0 w-full h-full p-4"
      :title="description.title"
      :text="description.text"
      button-label="Got It!"
      :level="0"
      :opened-dialogs="openedDialogs.slice(1)"
      @show-dialog="openedDialogs.find(x => x.level == $event.level).type = $event.type;"
    />

  </div>
</template>

<script>

import SettingsItem from '@/components/SettingsItem.vue';
import SimpleDialog from '@/components/dialogs/SimpleDialog.vue';

export default {
  name: 'Settings',
  components: {
    SettingsItem,
    SimpleDialog,
  },
  data: function() {
    return {
      description: {
        title: ``,
        text: ``,
      },
      openedDialogs: [
        {
          level: 0,
          type: undefined,
        },
      ]
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    showDescription() {
      return this.openedDialogs[0].type === `description`;
    },
  },
  methods: {
    backHandler(next) {

      let level = this.openedDialogs.length - 1;

      console.log(`this.openedDialogs[0].type:`, this.openedDialogs[0].type);

      while (level >= 0) {

        if (undefined != this.openedDialogs[level].type) {

          this.openedDialogs[level].type = undefined;
          navigator.vibrate(25);
          return next(false);

        } else {
          level--;
        }

      }

      return next();
      
    },
    openDescription(title, text) {

      this.description = {
        title,
        text,
      }
      this.openedDialogs[0].type = `description`;

    }
  },
  mounted: function() {

    this.$store.dispatch('navigate', { target: this.$route.name });
    
  },
  beforeRouteLeave(to, from, next) {
    console.log(`to:`, to);
    console.log(`from:`, from);
    this.backHandler(next);
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