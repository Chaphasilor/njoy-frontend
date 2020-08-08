<template>
  <div>
    <h2
      class="p-2 text-center text-2xl antialiased font-semibold text-dark"    
    >
      Progress Overview
    </h2>

    <ProgressCard
      :download="{
        filename: 'Once Upon a Time ... in Hollywood (2019).mp4',
        status: 'downloading',
        percentage: 80,
        eta: new Date(Date.now() + 2 * 60 * 60 * 1000),
        size: '2.3 GB',
        downloaded: '800 MB',
        startDate: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        speed: '786 Kb/s',
        path: 'Storage / Media / Movies',
        url: 'https://example.com/download',
        retries: 0,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer t73485z235u9835498',
          'Cookie': [
            'approve = 1',
            'allow = true',
          ]
        },
      }"
    />

    <ProgressCard
      :download="{
        filename: 'The Avengers (2015).mp4',
        status: 'paused',
        size: '1.9 GB',
        percentage: 23,
        eta: new Date(Date.now() + 9 * 60 * 60 * 1000),
      }"
    />

    <ProgressCard
      :download="{
        filename: 'Extraction (2020).mkv',
        status: 'pending',
        size: '1.7 GB',
      }"
    />

    <ProgressCard 
      :download="{
        filename: 'Extraction (2020).mkv',
        status: 'pending',
        size: '1.7 GB',
      }"
    />

    <ProgressCard 
      :download="{
        filename: 'Extraction (2020).mkv',
        status: 'pending',
        size: '1.7 GB',
      }"
    />
  </div>
</template>

<script>

import ProgressCard from '@/components/ProgressCard';

export default {
  name: 'Progress',
  components: {
    ProgressCard,
  },
}
</script>

<style>

</style>