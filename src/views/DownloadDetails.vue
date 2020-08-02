<template>
  <div>
    <h2
      class="p-2 text-center text-2xl antialiased font-semibold text-dark"
    >
      Download Details
    </h2>

    <div
      class="mx-4 my-2 bg-white text-dark rounded-xl shadow-md flex flex-row flex-wrap justify-between p-5 leading-9"
    >
      <div
        :class="(download.status == 'pending' ? 'w-4/5' : 'w-full') + ' text-left font-semibold break-all h-8 overflow-hidden'"
      >
        {{ download.filename }}
      </div>

      <div
        class="w-full h-8 my-4 flex flex-row flex-wrap justify-between"
      >
        <div
          v-if="showProgressbar"
          class="w-7/8 h-8 flex flex-col justify-center"
        >
          <ProgressBar
            class="w-full h-6 overflow-hidden"
            :percentage="download.percentage"
          />
        </div>

        <div
          class="w-1/8 text-right h-8"
        >
          {{ statusString }}
        </div>
      </div>

      <br>

      <div
        class="w-1/2 text-left h-8"
      >
        ETA
      </div>
      <div
        class="w-1/2 text-right h-8"
      >
        {{ etaString }}
      </div>

      <div
        class="w-1/2 text-left h-8"
      >
        Size
      </div>
      <div
        class="w-1/2 text-right h-8"
      >
        {{ download.size }}
      </div>

      <div
        class="w-full h-12 mt-6 flex flex-row flex-wrap justify-between"
      >
        <CTAButton
          v-if="showCancelButton"
          class="w-1/2 h-full"
          type="cancel"
        />
        <CTAButton
          v-if="showPauseButton"
          class="w-1/2 h-full"
          type="pause"
        />
        <CTAButton
          v-if="showResumeButton"
          class="w-1/2 h-full"
          type="resume"
        />    
      </div>

      <CTAButton
        class="w-full h-12 mt-20"
        type="good"
        label="Back"
      />    
    </div>
  </div>
</template>

<script>

import ProgressBar from '@/components/ProgressBar';
import CTAButton from '@/components/CTAButton';

export default {
  name: 'DownloadDetails',
  components: {
    ProgressBar,
    CTAButton,
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`pending`, `paused`],
      pauseButtonStates: [`downloading`],
      cancelButtonStates: [`downloading`, `paused`],
      resumeButtonStates: [`paused`],
      download: {
        filename: `Unknown Filename`,
        status: `Unknown`,
        size: `Unknown Size`,
        percentage: 0,
        eta: new Date(NaN),
      },
    }
  },
  // props: {
  //   downloadId: {
  //     type: String,
  //     //TODO make this required once IDs are available
  //     required: false,
  //     default: '',
  //   },
  //   download: {
  //     type: Object,
  //     required: false,
  //     default: function() {
  //       return {
  //         filename: `Unknown Filename`,
  //         status: `Unknown`,
  //         size: `Unknown Size`,
  //         percentage: 0,
  //         eta: new Date(NaN),
  //       }
  //     }
  //   }
  // },
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
  },
  mounted: function() {
    console.log(`this.download:`, this.download);

    // if params are missing, this will cause errors because of missing nested objects
    if (this.$route.params.download != undefined) {
      this.download = this.$route.params.download;
    } else {
      // no params passed, use download id
    }
    
  }
}
</script>

<style>

</style>