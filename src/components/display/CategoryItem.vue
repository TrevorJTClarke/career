<template>
  <router-link  :to="href" class="group flex flex-col overflow-hidden p-0 rounded-3xl bg-slate-500 grayscale transition-all hover:grayscale-0" :style="{background: data.bg || ''}">
    <figure class="flex justify-between pt-10 px-10 mb-10">
      <div class="flex flex-col w-10/12 text-slate-80 font-extrabold">
        <h3 class="text-lg truncate">{{ data.title }}</h3>
        <p v-if="data?.description" class="opacity-60">{{ data.description }}</p>
      </div>
      <div class="flex flex-0 w-8 opacity-50 transition-all duration-500 group-hover:opacity-100">
        <div class="mt-auto p-3">
          <ArrowUpRightIcon class="flex-shrink-0 text-black h-6 w-6" />
        </div>
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts">
import {
  ArrowUpRightIcon,
} from '@heroicons/vue/24/outline'

export default {
  props: ['data'],

  components: {
    ArrowUpRightIcon,
  },

  computed: {
    href() {
      return `/tags?selected=${this.data.title}`
    },
  },
}
</script>
