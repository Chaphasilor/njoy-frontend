<template>
  <BetterRouterLink
    :to="{
      name: 'DownloadDetails',
      params: {
        downloadId: download.id,
        download: download
      }
    }"
    :class="`mx-4 my-2 bg-white rounded-xl shadow-md border flex flex-row flex-wrap justify-between p-5 leading-9`"
  >

    <div
      :class="(!progressBarStates.includes(download.status) ? 'w-3/4' : 'w-full') + ` text-left font-semibold truncate h-8`"
      v-shared-element:[`${download.id}-title`]="{
        zIndex: 2,
      }"
    >
      {{ download.filename }}
    </div>

    <div
      v-if="showProgressbar"
      class="w-7/8 h-8 flex flex-col justify-center"
      v-shared-element:[`${download.id}-progress-bar`]="{
        zIndex: 3,
      }"
    >
      <ProgressBar
        class="w-full h-2 overflow-hidden"
        :percentage="download.percentage"
      />
    </div>

    <div
      :class="`${(!progressBarStates.includes(download.status) ? `w-1/4` : `w-1/8`)} text-right h-8 ${download.textColors.red.includes(download.status) ? `text-cta-red` : download.textColors.yellow.includes(download.status) ? `text-cta-yellow` : download.textColors.green.includes(download.status) ? `text-cta-green` : `text-dark` } `"
    >
      <!-- Similar thing happens if you remove the span and put the directive on the parent div -->
      <span
        class="inline-block"
        v-shared-element:[`${download.id}-${statusOrPercentage}-value`]="{
          zIndex: 2,
        }"
      >
        {{ statusString }}
      </span>
    </div>

    <br>

    <InfoLine
      v-if="showETA"
      class="w-full h-8"
      name="ETA"
      :value="etaString"
      :shared-id-base="download.id"
    />

    <InfoLine
      v-if="showSize"
      class="w-full h-8"
      name="Progress"
      :value="progressSizeString"
      :shared-id-base="download.id"
    />

    <CTAButton
      v-if="showPauseButton"
      class="w-full h-8 my-2"
      type="pause"
      @click.stop.native="$store.dispatch(`modifyDownloadState`, {
        id: download.id,
        action: `pause`
      })"
      v-shared-element:[`${download.id}-cta-pause`]="{
        zIndex: 2,
      }"
    />
    <CTAButton
      v-if="showCancelButton"
      class="w-1/2 h-8 my-2"
      type="cancel"
      @click.stop.native="$store.dispatch(`modifyDownloadState`, {
        id: download.id,
        action: `stop`
      })"
      v-shared-element:[`${download.id}-cta-cancel`]="{
        zIndex: 2,
      }"
    />
    <CTAButton
      v-if="showResumeButton"
      class="w-1/2 h-8 my-2"
      type="resume"
      @click.stop.native="$store.dispatch(`modifyDownloadState`, {
        id: download.id,
        action: `resume`
      })"
      v-shared-element:[`${download.id}-cta-resume`]="{
        zIndex: 2,
      }"
    />
  </BetterRouterLink>
</template>

<script>

import ProgressBar from '@/components/outputs/ProgressBar';
import CTAButton from '@/components/buttons/CTAButton';
import InfoLine from '@/components/outputs/InfoLine';
import BetterRouterLink from '@/components/BetterRouterLink';

export default {
  name: "ProgressCard",
  components: {
    ProgressBar,
    CTAButton,
    InfoLine,
    BetterRouterLink,
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`queued`, `paused`],
      pauseButtonStates: [`downloading`],
      cancelButtonStates: [`paused`, `error`],
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
      return this.progressBarStates.includes(this.download.status) ? `${this.download.percentage.toFixed(0)}%` : this.download.statusString;
    },
    statusOrPercentage: function() {
      return this.progressBarStates.includes(this.download.status) ? `percentage` : `status`;
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
    progressSizeString: function() {
      return `${this.download.downloaded} / ${this.download.size}`;
    },
  },
  mounted() {

    // console.log(`this.download:`, this.download);

  }
}
</script>

<style>

</style>s