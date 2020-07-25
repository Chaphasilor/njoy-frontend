<template>
  <div
    class="flex flex-col justify-center"
  >
    <div
      class="w-full bg-njoy-bg-gray h-2 rounded-md overflow-hidden"
    >
      <div
        class="bg-cover bg-left w-1/2 h-2 rounded-md"
        :style="{
          'background-color': progressBarColor,
          width: `${percentage}%`, 
        }"
      >
      <!-- {{ progressBarColor }} -->
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percentage: {
      type: Number,
      default: 0,
    }
  },
  computed: {
    progressBarColor: function() {

      let hueGreen = 112;
      let hueRed = 20;

      let hue = hueRed + Math.round((hueGreen - hueRed)*(this.percentage/100));

      return `hsl(${hue}, 68%, 49%)`;
      
    }
  }
}
</script>
