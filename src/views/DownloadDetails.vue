<template>
  <div
    class="h-screen"
  >
    <div
      class="w-full h-16 p-4 flex flex-row justify-between"
    >

      <h2
        class="w-5/6 flex-shrink-0 text-left text-2xl antialiased font-semibold text-dark tracking-wide"    
      >
        Download Details
      </h2>

    </div>

    <div
      class="mx-4 my-2 bg-white text-dark rounded-xl shadow-md p-5 leading-9"
      v-shared-element:[download.id]
    >

      <div
        class="w-full text-left mb-2 font-semibold break-all h-8 overflow-hidden"
      >
        {{ download.filename }}
      </div>

      <!-- <div
        v-if="!showProgressbar"
        class="w-1/5 text-right h-8"
      >
        {{ statusString }}
      </div> -->

      <div
        v-if="showProgressbar"
        class="w-full h-8 my-2 flex flex-row flex-wrap justify-between"
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
        :color="download.textColor"
      />

      <InfoLine
        class="w-full h-8"
        name="Percentage"
        :value="`${download.percentage} %`"
      />

      <InfoLine
        class="w-full h-8"
        name="ETA"
        :value="etaString"
      />

      <InfoLine
        class="w-full h-8"
        name="Download Speed"
        :value="download.speed"
      />

      <InfoLine
        class="w-full h-8"
        name="Progress"
        :value="progressSizeString"
      />

      <InfoLine
        class="w-full h-8"
        name="Elapsed"
        :value="elapsedString"
      />

      <InfoLine
        class="w-full h-8"
        name="Destination"
        :value="download.path"
      />

      <InfoLine
        class="w-full h-8 overflow-hidden"
        name="URL"
        :value="download.url"
      />

      <InfoLine
        class="w-full h-8"
        name="Retries"
        :value="download.retries.toString()"
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
        class="w-full h-12 mt-4 flex flex-row flex-wrap justify-between"
      >
        <CTAButton
          v-if="showCancelButton"
          class="w-1/2 h-12"
          type="cancel"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `stop`
          })"
        />
        <CTAButton
          v-if="showPauseButton"
          class="w-1/2 h-full"
          type="pause"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `pause`
          })"
        />
        <CTAButton
          v-if="showResumeButton"
          class="w-1/2 h-full"
          type="resume"
          @click.native="$store.dispatch(`modifyDownloadState`, {
            id: download.id,
            action: `resume`
          })"
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
      }
    }
  },
  computed: {
    download: function() {

      if (undefined != this.$route.params.downloadId) {

        let found = this.$store.getters.downloads.find(x => x.id == this.$route.params.downloadId);

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
    elapsedString: function() {
      //TODO show date as designed in Figma
      return this.download.startDate.toLocaleTimeString();
      
    },
    progressSizeString: function() {
      return `${this.download.downloaded} / ${this.download.size}`;
    },
  },
  mounted: function() {

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