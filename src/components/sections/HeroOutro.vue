<template>
  <section class="flex" id="contact">
    <div class="w-full flex flex-col bg-slate-300 text-slate-700 rounded-3xl p-10">
      <h1 class="font-bold text-black text-3xl md:text-5xl">Want to work together?</h1>
      <p class="pt-4 pb-10">Reach out for collaborations or just a friendly idea jam-session!</p>
      <div class="flex gap-4 justify-start">
        <a href="mailto:trevorjtclarke@gmail.com" target="_blank" class="">
          <button class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-slate-800 bg-white opacity-90 hover:opacity-100 hover:bg-slate-50">
            <span class="block text-xs uppercase">Contact</span>
            <PaperAirplaneIcon class="h-4 w-4 ml-1" />
          </button>
        </a>
        
        <a class="flex mr-4 text-black bg-white rounded-full px-2 opacity-50 hover:opacity-100 hover:bg-[#1ea1f1] hover:text-white hover:fill-white" href="https://twitter.com/trevorjtclarke" rel="noreferrer" target="_blank">
          <svg class="m-auto w-5 h-5" fill="currentColor" stroke="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"> </path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'

export default {
  components: {
    PaperAirplaneIcon,
  }
}
</script>
