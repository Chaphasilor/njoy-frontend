<template>
  <router-link
    :to="{
      name: 'DownloadDetails',
      params: {
        downloadId: download.id,
        download: download
      }
    }"
    class="mx-4 my-2 bg-white text-dark rounded-xl shadow-md flex flex-row flex-wrap justify-between p-5 leading-9"
  >
    <div
      :class="(!progressBarStates.includes(download.status) ? 'w-3/4' : 'w-full') + ' text-left font-semibold truncate h-8'"
    >
      {{ download.filename }}
    </div>

    <div
      v-if="showProgressbar"
      class="w-7/8 h-8 flex flex-col justify-center"
    >
      <ProgressBar
        class="w-full h-2 overflow-hidden"
        :percentage="download.percentage"
      />
    </div>

    
    <div
      :class="(!progressBarStates.includes(download.status) ? 'w-1/4' : 'w-1/8') + ' text-right h-8'"
    >
      {{ statusString }}
    </div>

    <br>

    <InfoLine
      v-if="showETA"
      class="w-full h-8"
      name="ETA"
      :value="etaString"
    />

    <InfoLine
      v-if="showSize"
      class="w-full h-8"
      name="Size"
      :value="download.size"
    />

    <CTAButton
      v-if="showPauseButton"
      class="w-full h-8 my-2"
      type="pause"
    />
    <CTAButton
      v-if="showCancelButton"
      class="w-1/2 h-8 my-2"
      type="cancel"
    />
    <CTAButton
      v-if="showResumeButton"
      class="w-1/2 h-8 my-2"
      type="resume"
    />
  </router-link>
</template>

<script>

import ProgressBar from '@/components/outputs/ProgressBar';
import CTAButton from '@/components/buttons/CTAButton';
import InfoLine from '@/components/outputs/InfoLine';

export default {
  name: "ProgressCard",
  components: {
    ProgressBar,
    CTAButton,
    InfoLine
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`pending`,`paused`, `completed`],
      pauseButtonStates: [`downloading`],
      cancelButtonStates: [`paused`],
      resumeButtonStates: [`paused`],
    }
  },
  props: {
    download: {
      type: Object,
      required: false,
      default: function() {
        return {
          filename: `Unknown Filename`,
          status: `Unknown`,
          size: `Unknown Size`,
          percentage: 0,
          eta: new Date(NaN),
        }
      }
    }
  },
  computed: {
    statusString: function() {

      let statusString = ``;
      switch (this.download.status) {
        case `pending`:
          statusString = `(Pending)`;
          break;
        case `downloading`:
          statusString = `${this.download.percentage}%`;
          break;
        case `paused`:
          // statusString = `Paused (${this.percentage}%)`;
          statusString = `${this.download.percentage}%`;
          break;
        case `failed`:
          statusString = `(Failed)`;
          break;
        case `completed`:
          statusString = `(Completed)`;
          break;
      
        default:
          statusString = `Unknown Status`;
          break;
      }

      return statusString;

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
    }
  }
}
</script>

<style>

</style>