<template>
  <div
    class="h-full"
  >
    <div
      class="flex flex-row justify-between w-full h-16 p-4"
      v-shared-element:page-header
    >

      <h2
        class="flex-shrink-0 w-5/6 text-2xl antialiased font-semibold tracking-wide text-left text-dark"
      >
        Download Details
      </h2>

      <div
        class="w-8 h-8 text-dark stroke-current stroke-1.5 active:stroke-2 transition-colors duration-300"
      >
      <!-- Dummy element used for fading out the settings icon -->
      </div>

    </div>

    <div
      class="p-5 mx-4 my-2 leading-9 bg-white shadow-md text-dark rounded-xl"
      v-shared-element:[download.id]
    >

      <div
        class="w-full h-8 mb-2 overflow-hidden font-semibold text-left break-all"
        v-shared-element:[`${download.id}-title`]="{
          zIndex: 2,
        }"
      >
        {{ download.filename }}
      </div>

      <!-- <div
        v-if="!showProgressbar"
        class="w-1/5 h-8 text-right"
      >
        {{ statusString }}
      </div> -->

      <div
        v-if="showProgressbar"
        class="flex flex-row flex-wrap justify-between w-full h-8 my-2"
        v-shared-element:[`${download.id}-progress-bar`]="{
          zIndex: 3,
        }"
      >
        <ProgressBar
          class="w-full h-6 overflow-hidden"
          :percentage="download.percentage"
        />
      </div>

      <InfoLine
        class="w-full h-8"
        name="Status"
        :value="statusString"
        :shared-id-base="download.id"
        :color="download.textColors.red.includes(download.status) ? `text-cta-red` : download.textColors.yellow.includes(download.status) ? `text-cta-yellow` : download.textColors.green.includes(download.status) ? `text-cta-green` : `text-dark`"
      />
      <!-- v-shared-element:[`${download.id}-status2`]="{
        zIndex: 2,
      }" -->

      <InfoLine
        class="w-full h-8"
        name="Percentage"
        :value="`${download.percentage} %`"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="ETA"
        :value="etaString"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Current Speed"
        :value="download.speed"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Average Speed"
        :value="download.averageSpeed"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Progress"
        :value="progressSizeString"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Started"
        :value="startedString"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Destination"
        :value="download.path"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8 overflow-hidden"
        name="URL"
        :value="download.url"
        :shared-id-base="download.id"
      />

      <InfoLine
        class="w-full h-8"
        name="Retries"
        :value="download.retries.toString()"
        :shared-id-base="download.id"
      />

      <!-- TODO collapse headers by default (also design in Figma) -->

      <div
        v-if="Object.keys(download.headers).length >= 0"
        class="w-full h-8 text-center"
      >
        Headers
      </div>

      <div
        v-if="Object.keys(download.headers).length >= 0"
        class="w-full h-20 overflow-y-scroll"
      >
        <HeaderLine
          :key="key"
          v-for="(header, key) in download.headers"
          class="w-full h-8"
          :name="key"
          :value="header"
        />
      </div>

      <div
        class="flex flex-row flex-wrap justify-between w-full h-12 mt-4"
      >
        <CTAButton
          v-if="showCancelButton"
          class="w-1/2 h-12"
          type="cancel"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `stop`
          })"
          v-shared-element:[`${download.id}-cta-cancel`]="{
            zIndex: 2,
          }"
        />
        <CTAButton
          v-if="showPauseButton"
          class="w-1/2 h-full"
          type="pause"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `pause`
          })"
          v-shared-element:[`${download.id}-cta-pause`]="{
            zIndex: 2,
          }"
        />
        <CTAButton
          v-if="showResumeButton"
          class="w-1/2 h-full"
          type="resume"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `resume`
          })"
          v-shared-element:[`${download.id}-cta-resume`]="{
            zIndex: 2,
          }"
        />    
      </div>

      <router-link
        class="w-full"
        :to="{
          name: 'Progress',
        }"
      >
        <CTAButton
          class="w-full h-12 mt-6"
          type="good"
          label="Back"
        />
      </router-link>
    </div>
  </div>
</template>

<script>

import ProgressBar from '@/components/outputs/ProgressBar';
import CTAButton from '@/components/buttons/CTAButton';
import InfoLine from '@/components/outputs/InfoLine';
import HeaderLine from '@/components/outputs/HeaderLine';

export default {
  name: 'DownloadDetails',
  components: {
    ProgressBar,
    CTAButton,
    InfoLine,
    HeaderLine,
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`pending`, `initializing`, `paused`],
      pauseButtonStates: [`downloading`],
      cancelButtonStates: [`downloading`, `paused`],
      resumeButtonStates: [`paused`],
      unknownDownload: {
        filename: `Unknown Filename`,
        status: `Unknown`,
        percentage: 0,
        eta: new Date(NaN),
        size: `Unknown Size`,
        downloaded: '-',
        startDate: new Date(NaN),
        speed: '-',
        path: 'Unknown',
        url: 'Unknown',
        retries: 'Unknown',
        headers: {},
      },
      textColors: {
        red: [],
        yellow: [],
        green: [],
      }
    }
  },
  computed: {
    download: function() {

      if (undefined != this.$route.params.downloadId) {

        console.log(`this.$store.getters.downloads:`, this.$store.getters.downloads)
        let found = this.$store.getters.downloads.find(x => x.id == this.$route.params.downloadId);
        console.log(`found:`, found)

        if (found) {
          return found;
        } else {
          return this.unknownDownload;
        }

      } else {
        return this.unknownDownload;
      }
      
    },
    statusString: function() {
      return this.download.statusString;
    },
    showProgressbar: function() {
      return this.progressBarStates.includes(this.download.status);
    },
    showETA: function() {
      return this.etaStates.includes(this.download.status);
    },
    showSize: function() {
      return this.sizeStates.includes(this.download.status);
    },
    showPauseButton: function() {
      return this.pauseButtonStates.includes(this.download.status);
    },
    showCancelButton: function() {
      return this.cancelButtonStates.includes(this.download.status);
    },
    showResumeButton: function() {
      return this.resumeButtonStates.includes(this.download.status);
    },
    etaString: function() {
      //TODO show date as designed in Figma
      return this.download.eta.toLocaleTimeString();
    },
    startedString: function() {
      //TODO show date as designed in Figma
      return this.download.startDate.toLocaleTimeString();
    },
    progressSizeString: function() {
      return `${this.download.downloaded} / ${this.download.size}`;
    },
  },
  mounted: function() {

    console.log(`this.download:`, this.download)

    this.$store.dispatch('navigate', { target: this.$route.name });

    this.$store.dispatch('fetchProgress');
    this.pollingIntervalID = setInterval(() => {
      this.$store.dispatch('fetchProgress');
    }, 2000);

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