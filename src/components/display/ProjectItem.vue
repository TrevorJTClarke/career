<template>
  <router-link :to="`${data.slug ? '/' + data.slug : data.href}`" class="group flex flex-col overflow-hidden p-0 rounded-3xl bg-slate-500" :style="{background: data.bg || ''}">
    <figcaption class="flex justify-between pt-10 px-10 mb-10">
      <div :class="{
        'flex flex-col w-10/12': true,
        'text-slate-800': data.theme.style === 'light',
        'text-slate-50': data.theme.style === 'dark',
      }">
        <h3 class="text-lg truncate">{{ data.title }}</h3>
        <p class="opacity-60">{{ data.description }}</p>
      </div>
      <div class="flex flex-0 w-8 opacity-50 transition-all duration-500 group-hover:opacity-100">
        <div class="mb-auto rounded-full bg-white/30 p-3 -rotate-45 transition-all duration-500 group-hover:rotate-0 group-hover:bg-white/50">
          <ArrowRightIcon class="flex-shrink-0 h-6 w-6" />
        </div>
      </div>
    </figcaption>
    <figure class="relative z-0 pl-10 scale-100 translate-0 transition-all duration-500 group-hover:scale-105 group-hover:-translate-x-2">
      <div class="flex overflow-hidden w-full min-h-[275px] h-[275px] rounded-lg bg-slate-800">
        <img :src="data.img" :alt="data.description"  class="object-cover min-w-full min-h-full">
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts">
import {
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'

export default {
  props: ['data'],

  components: {
    ArrowRightIcon,
  },
}
</script>
