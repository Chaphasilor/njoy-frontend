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
      :title="settingValue.title"
      :name="settingName"
      :value="settingValue.value"
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
    SimpleDialog
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