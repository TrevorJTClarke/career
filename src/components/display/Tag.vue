<template>
  <div>
    <router-link v-if="nolink != true" :to="href" class="no-underline">
      <span :class="[
        'inline-flex items-center rounded-full mr-2 md:mr-4 mb-2 md:mb-4 px-4 py-2 text-xs font-medium uppercase text-slate-100',
        !bg ? 'bg-slate-700 hover:bg-slate-900' : bg,
      ]">{{ label }}</span>
    </router-link>
    <div class="" v-else @click.prevent="callback">
      <div :class="[
        'inline-flex items-center rounded-full mr-2 md:mr-4 mb-2 md:mb-4 px-4 py-2 text-xs font-medium uppercase text-slate-100',
        !bg ? 'bg-slate-700 hover:bg-slate-900' : bg,
        typeof selectCallback === 'function' ? 'cursor-pointer' : '',
        isSelected ? 'cursor-pointer bg-slate-900' : '',
      ]">
        <span>{{ label }}</span>

        <XMarkIcon v-if="isSelected" class="ml-2 -mr-2 w-4 h-4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'

export default {
  props: ['label', 'bg', 'nolink', 'selected', 'selectCallback'],

  components: {
    XMarkIcon,
  },

  computed: {
    href() {
      return `/tags?selected=${this.label}`
    },
    isSelected() {
      return `${this.selected}`.search(`${this.label}`) > -1
    },
  },

  methods: {
    callback() {
      if (typeof this.selectCallback === 'function') this.selectCallback(`${this.label}`)
    },
  },
}
</script>
