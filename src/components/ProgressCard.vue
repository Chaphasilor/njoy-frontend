<template>
  <div
    class="mx-4 my-2 bg-white rounded-xl shadow-md flex flex-row flex-wrap justify-between px-4 py-2 leading-9"
  >
    <div
      class="w-4/5 text-left font-bold break-all h-8 overflow-hidden"
    >
      {{ filename }}
    </div>

    <ProgressBar
      v-if="showProgressbar"
      class="w-5/6 h-8 overflow-hidden"
      :percentage="percentage"
    />
    
    <div
      class="w-1/6 text-right"
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
  </div>
</template>

<script>

import ProgressBar from '@/components/ProgressBar';

export default {
  name: "ProgressCard",
  components: {
    ProgressBar,
  },
  data: function() {
    return {
      progressBarStates: [`downloading`, `paused`],
      etaStates: [`downloading`],
      sizeStates: [`pending`,`paused`],
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
    etaString: function() {
      
      return this.eta.toLocaleTimeString();
      
    }
  }
}
</script>

<style>

</style>