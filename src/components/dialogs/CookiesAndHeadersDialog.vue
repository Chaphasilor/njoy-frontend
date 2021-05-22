<template>
  <div>
    <div
      class="relative w-full h-full overflow-y-auto bg-white shadow-xl text-dark"
    >
      <!-- fixed -->
      <div
        class="sticky top-0 flex flex-row justify-start h-auto pt-0 mb-4 bg-white shadow-md font-quicksand text-dark"
      >
      
        <img
          class="h-5 my-3 ml-5 mr-4"
          src="@/assets/icons/back.svg"
          alt="Remove"
          @click="closeDialogIfPossible"
        >

        <h3
          class="py-2 text-lg antialiased font-bold tracking-wide"
        >
          Manage Cookies & Headers
        </h3>
      </div>

      <h4
        class="pb-2 pl-4 antialiased font-bold tracking-wide font-quicksand text-rg text-dark"
      >
        Cookies
      </h4>

      <div
        class="flex flex-row justify-between h-32 px-4 mb-2"
      >
        <ValuePairList
          class="w-full"
          :pairs="cookiePairs"
          separator=" = "
          :removable="true"
          @remove-pair="removeCookie($event.key, $event.value)"
          @pair-added="animateNewPair($refs[`illusory-source-cookies`], $event);hideNewCookieInput();log('Cookies have been recomputed');"
        />

      </div>

      <div
        class="w-full px-4 mb-6"
      >

        <transition
          enter-active-class="transition-all duration-1000 ease-in-out"
          enter-class="h-0 mb-0"
          enter-to-class="h-12"
          leave-active-class="transition-all duration-1000 ease-in-out"
          leave-class="h-12"
          leave-to-class="h-0 mb-0"
        >
          <div
            class="w-full my-2 overflow-hidden"
            v-if="enableNewCookieInputs"
          >
            <div
              ref="illusory-source-cookies"
            >

              <TextField
                class="inline-block w-1/2 h-12 pr-1"    
                name="new-cookie-name"
                :focus="true"
                placeholder="Cookie Name"
                v-model="newCookie.key"
              />

              <TextField
                class="inline-block w-1/2 h-12 pl-1"
                name="new-cookie-value"
                :focus="false"
                placeholder="Cookie Value"
                v-model="newCookie.value"
              />

            </div>
          </div>
        </transition>

        <CTAButton
          class="w-full h-12"
          :type="(enableNewCookieInputs && newCookieInputValid) ? `good` : `action`"
          :label="!enableNewCookieInputs ? `Add a Cookie` : newCookieInputValid ? `Confirm` : `Cancel`"
          @click.native="enableNewCookieInputs ? handleNewCookieClick() : enableNewCookieInputs = true"
        />
        
      </div>

      <h4
        class="pb-2 pl-4 antialiased font-bold tracking-wide font-quicksand text-rg text-dark"
      >
        Headers
      </h4>

      <div
        class="flex flex-row justify-between h-32 px-4 mb-2"
      >
        <ValuePairList
          class="w-full"
          :pairs="headerPairs"
          separator=": "
          :removable="true"
          @remove-pair="removeHeader($event.key, $event.value)"
          @pair-added="animateNewPair($refs[`illusory-source-headers`], $event);hideNewHeaderInput();"
        />

      </div>

      <div
        class="w-full px-4 mb-16"
      >

        <transition
          enter-active-class="transition-all duration-1000 ease-in-out"
          enter-class="h-0 mb-0"
          enter-to-class="h-12"
          leave-active-class="transition-all duration-1000 ease-in-out"
          leave-class="h-12"
          leave-to-class="h-0 mb-0"
        >
          <div
            class="w-full my-2 overflow-hidden"
            v-if="enableNewHeaderInputs"
          >
            <div
              ref="illusory-source-headers"
            >

              <TextField
                class="inline-block w-1/2 h-12 pr-2"    
                name="new-header-name"
                :focus="true"
                placeholder="Header Name"
                v-model="newHeader.key"
              />

              <TextField
                class="inline-block w-1/2 h-12"    
                name="new-header-value"
                :focus="false"
                placeholder="Header Value"
                v-model="newHeader.value"
              />

            <!-- TODO use two buttons, one for 'Cancel' and one for 'Confirm', and disable the 'Confirm' button as long as the input isn't valid. 'Cancel' should work at all times  -->

            </div>
          </div>
        </transition>

        <CTAButton
          class="w-full h-12"
          :type="(enableNewHeaderInputs && newHeaderInputValid) ? `good` : `action`"
          :label="!enableNewHeaderInputs ? `Add a Header` : newHeaderInputValid ? `Confirm` : `Cancel`"
          @click.native="enableNewHeaderInputs ? handleNewHeaderClick() : enableNewHeaderInputs = true"
        />
          
      </div>

      <CTAButton
        class="w-full h-12 px-4 mt-12"
        type="good"
        label="Confirm"
        @click.native="$emit('show-dialog', {level: level, type: undefined})"
      />    
    </div>

    <ConfirmationDialog
      v-if="confirmation.required"
      class="fixed top-0 left-0 w-full h-full p-4"
      title="Are you sure about that?"
      text="If you leave this screen, all your changes will be discarded!"
      confirm-label="Leave"
      cancel-label="Cancel"
      :level="level+1"
      :opened-dialogs="openedDialogs.slice(1)"
      @confirm="confirmation.required = false; confirmation.result = true"
      @cancel="confirmation.required = false; confirmation.result = false"
      @show-dialog="openedDialogs.find(x => x.level == $event.level).type = $event.type;"
    />
    
  </div>
</template>

<script>

import CTAButton from '@/components/buttons/CTAButton';
import TextField from '@/components/inputs/TextField';
import ValuePairList from '@/components/inputs/ValuePairList';
import ConfirmationDialog from  '@/components/dialogs/ConfirmationDialog';

export default {
  name: 'CookiesAndHeadersDialog',
  components: {
    CTAButton,
    ValuePairList,
    TextField,
    ConfirmationDialog,
  },
  props: {
    value: {
      // headers, renamed for use with v-model
      type: Object,
      default: function() {
        return {};
      },
    },
    level: {
      type: Number,
      required: true,
    },
    openedDialogs: {
      type: Array,
      required: true,
    },
    closeDialog: {
      type: Boolean,
      required: true,
    },
  },
  data: function() {
    return {
      headers: {},
      enableNewCookieInputs: false,
      enableNewHeaderInputs: false,
      newCookie: {
        key: ``,
        value: ``,
      },
      newHeader: {
        key: ``,
        value: ``,
      },
      confirmation: {
        required: false,
        result: undefined,
      }
    }
  },
  computed: {
    cookiePairs: function() {
      return this.generatePairsFromObject(this.headers[`cookie`]);
    },
    headerPairs: function() {

      let headersWithoutCookies = JSON.parse(JSON.stringify(this.headers));
      delete headersWithoutCookies[`cookie`];

      return this.generatePairsFromObject(headersWithoutCookies);

    },
    showNewCookieDialog: function() {
      return this.openedDialogs[0].type === 'new-cookie';
    },
    showNewHeaderDialog: function() {
      return this.openedDialogs[0].type === 'new-header';
    },
    newCookieInputValid: function() {
      return this.newCookie.key.length > 0 && this.newCookie.value.length > 0;
    },
    newHeaderInputValid: function() {
      return this.newHeader.key.length > 0 && this.newHeader.value.length > 0;
    },
    formDirty: function() {
      return (this.newHeader.key.length > 0 || this.newHeader.value.length > 0) || (this.newCookie.key.length > 0 || this.newCookie.value.length > 0)
    },
  },
  watch: {
    closeDialog() {
      if (this.closeDialog) {
        this.closeDialogIfPossible()
      }
    },
    headers: {
      deep: true,
      handler: function() {
        console.log(`this.headers:`, this.headers);
        this.$emit('input', this.headers);
      }
    },
    enableNewCookieInputs() {
      console.log(`new cookie inputs`)
      if (!this.enableNewCookieInputs) {
        this.newCookie.key = ``;
        this.newCookie.value = ``;
      }
    },
    enableNewHeaderInputs() {
      console.log(`new header inputs`)
      if (!this.enableNewHeaderInputs) {
        this.newHeader.key = ``;
        this.newHeader.value = ``;
      }
    },
  },
  methods: {
    beforeWindowUnload(e) {

      if (this.formDirty) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
      }
    },
    async confirmCloseDialog() {
      console.log(`this.formDirty:`, this.formDirty)
      if (this.formDirty) {

        this.confirmation.required = true
        let result = await new Promise((resolve) => {
          let interval = setInterval(() => {
            if (!this.confirmation.required) {
              clearInterval(interval)
              return resolve(this.confirmation.result)
            }
          }, 100)
        })
        this.confirmation.result = undefined
        
        return result
      } else {
        return true
      }
    },
    async closeDialogIfPossible() {
      console.log(`trying to close dialog`)
      let closeable = await this.confirmCloseDialog()
      
      this.$emit('close-dialog', {level: this.level})
      
      if (closeable) {
        this.$emit('show-dialog', {level: this.level, type: undefined})
      }
    },
    generatePairsFromObject(object) {

      if (undefined == object) {
        return [];
      }

      let keys = Object.keys(object);
      let values = Object.values(object);

      let pairs = [];

      keys.forEach((key, index) => {
        pairs.push({
          key: key,
          value: values[index],
        })
      })

      return pairs;
      
    },
    handleNewCookieClick() {
      if (this.newCookieInputValid) {
        this.addCookie(this.newCookie.key, this.newCookie.value);
      } else {
        this.enableNewCookieInputs = false;
      }
    },
    hideNewCookieInput() {
      this.newCookie.key = ``;
      this.newCookie.value = ``;
      this.enableNewCookieInputs = false;
    },
    handleNewHeaderClick() {
      if (this.newHeaderInputValid) {
        this.addHeader(this.newHeader.key, this.newHeader.value);
      } else {
        this.enableNewHeaderInputs = false;
      }
    },
    hideNewHeaderInput() {
      this.newHeader.key = ``;
      this.newHeader.value = ``;
      this.enableNewHeaderInputs = false;
    },
    addCookie(name, value) {
      if (this.headers[`cookie`]) {
        this.$set(this.headers[`cookie`], name, value);
      } else {
        
        let obj = {};
        obj[name] = value;
        this.$set(this.headers, `cookie`, obj);
        
      }
    },
    removeCookie(name, value) {
      this.$delete(this.headers[`cookie`], name, value);
    },
    addHeader(name, value) {
      this.$set(this.headers, name, value);
    },
    removeHeader(name, value) {
      this.$delete(this.headers, name, value);
    },
    log(value) {
      console.log(`value:`, value);
    },
    animateNewPair(source, pairElement) {

      console.log(`source:`, source);

      if (pairElement) {
        this.$illusory(source, pairElement, {
          duration: '1000ms',
          easing: 'ease-in-out',
          zIndex: 30,
          beforeAnimate(from) {
            // Show the natural element and hide the clone
            // because by default the clone has already
            // replaced the natural element
            from.showNatural()
            from.hide()
          },
        });
      }
      
    }
  },
  created: function() {

    this.headers = this.value; // leave in created so that the initial empty object isn't propagated throught the event

  },
  mounted: function() {

    console.log(`this.value:`, this.value);
    window.addEventListener(`beforeunload`, this.beforeWindowUnload)

  },
  beforeDestroy() {
    window.removeEventListener(`beforeunload`, this.beforeWindowUnload)
  }
}
</script>

<style>

</style>