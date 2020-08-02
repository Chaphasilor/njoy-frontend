<template>
  <div
    class="mx-4 my-2 bg-white text-dark rounded-xl shadow-md flex flex-row flex-wrap justify-between px-4 py-2 leading-9"
  >
    <div
      class="w-4/5 text-left font-semibold break-all h-8 overflow-hidden"
    >
      {{ filename }}
    </div>

    <ProgressBar
      v-if="showProgressbar"
      class="w-7/8 h-8 overflow-hidden"
      :percentage="percentage"
    />
    
    <div
      class="w-1/8 text-right h-8"
    >
      {{ statusString }}
    </div>

    <br>

    <div
      v-if="showETA"
      class="w-1/2 text-left h-8"
    >
      ETA
    </div>
    <div
      v-if="showETA"
      class="w-1/2 text-right h-8"
    >
      {{ etaString }}
    </div>

    <div
      v-if="showSize"
      class="w-1/2 text-left h-8"
    >
      Size
    </div>
    <div
      v-if="showSize"
      class="w-1/2 text-right h-8"
    >
      {{ size }}
    </div>

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
  </div>
</template>

<script>

import ProgressBar from '@/components/ProgressBar';
import CTAButton from '@/components/CTAButton';

export default {
  name: "ProgressCard",
  components: {
    ProgressBar,
    CTAButton,
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`pending`,`paused`],
      pauseButtonStates: [`downloading`],
      cancelButtonStates: [`paused`],
      resumeButtonStates: [`paused`],
    }
  },
  props: {
    filename: {
      type: String,
      default: `Unknown Filename`,
    },
    status: {
      type: String,
      default: `Unknown`,
    },
    size: {
      type: String,
      default: `Unknown Size`,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    eta: {
      type: Date,
      default: () => new Date(NaN),
    }
  },
  computed: {
    statusString: function() {

      let statusString = ``;
      switch (this.status) {
        case `pending`:
          statusString = `(Pending)`;
          break;
        case `downloading`:
          statusString = `${this.percentage}%`;
          break;
        case `paused`:
          // statusString = `Paused (${this.percentage}%)`;
          statusString = `${this.percentage}%`;
          break;
        case `failed`:
          // statusString = `Paused (${this.percentage}%)`;
          statusString = `(Failed)`;
          break;
      
        default:
          statusString = `Unknown Status`;
          break;
      }

      return statusString;

    },
    showProgressbar: function() {
      return this.progressBarStates.includes(this.status);
    },
    showETA: function() {
      return this.etaStates.includes(this.status);
    },
    showSize: function() {
      return this.sizeStates.includes(this.status);
    },
    showPauseButton: function() {
      return this.pauseButtonStates.includes(this.status);
    },
    showCancelButton: function() {
      return this.cancelButtonStates.includes(this.status);
    },
    showResumeButton: function() {
      return this.resumeButtonStates.includes(this.status);
    },
    etaString: function() {
      
      return this.eta.toLocaleTimeString();
      
    }
  }
}
</script>

<style>

</style>