<template>
  <footer class="">
    <div class="mx-auto">
      <p class="py-2 text-center text-xs leading-5 text-gray-500">&copy; 2011 - {{ year }} <a href="https://github.com/TrevorJTClarke" target="_blank" ref="noreferral">Trevor Clarke</a> &middot; <a href="https://github.com/TrevorJTClarke/career" class="uppercase text-[10px] text-slate-700" target="_blank" ref="noreferral">View Source</a></p>
    </div>
  </footer>
</template>

<script lang="ts">
export default {

  data() {
    return {
    }
  },

  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
