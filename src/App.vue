<template>
  <div
    id="app"
    class="text-sm bg-eggshell font-quicksand"
  >
    <div
      id="nav"
      class="fixed bottom-0 h-16 text-center w-full rounded-t-xl shadow-top "
    >
      <router-link to="/">
        Progress
      </router-link>
      |
      <router-link to="/download">
        Download
      </router-link>
    </div>
    <router-view />
  </div>
</template>
