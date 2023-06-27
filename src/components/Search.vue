<template>
  <div class="flex my-auto">
    <div @click="openSearch" class="cursor-pointer flex my-auto pr-6 mr-6 px-2 border-r border-slate-600">
      <!-- <Search class="" /> -->
      <MagnifyingGlassIcon class="inline text-white h-6 w-6 mr-2" />
      <span class="inline-flex my-auto text-slate-500 text-xs mr-2">Search</span>
      <div v-if="isMacOs" class="legend-text flex flex-row items-center text-xs text-slate-800">
        <div class="flex h-4 w-4 mr-0.5 items-center justify-center rounded bg-slate-600">
          <p>⌘</p>
        </div>
        <div class="flex h-4 w-4 items-center justify-center rounded bg-slate-600 uppercase">
          <p>k</p>
        </div>
      </div>
    </div>

    <div class="z-0 p-1" :class="{'fixed top-0 left-0 right-0 bottom-0 z-50': open, 'hidden': !open}">
      <div @click="close()" class="fixed top-0 left-0 right-0 bottom-0 z-10 p-8 bg-green-100 opacity-80" />
      <div class="relative z-20 w-full md:w-1/2 mx-auto">
        <input type="text" autocomplete="off" autofocus="on" ref="query_input" name="query" id="query" v-model="query" placeholder="Search by alias or address..." minlength="0" maxlength="100" class="w-full mt-1 focus:ring-green-500 focus:border-green-500 block p-4 shadow-sm sm:text-sm border-gray-300 rounded-md placeholder:text-gray-200 text-gray-800" />
        <button @click="close()" type="button" class="absolute flex h-[52px] top-0 right-4 z-20">
          <!-- <XMarkIcon class="h-8 w-8 text-gray-700 hover:text-gray-900" /> -->
          <div class="flex my-auto py-2 px-3 items-center justify-center rounded text-xs text-white bg-slate-400 hover:bg-slate-600 uppercase">
            esc
          </div>
        </button>

        <div>
          <div v-if="loading" class="w-full mt-1 block p-4 shadow-sm sm:text-sm bg-white border-gray-300 rounded-md text-gray-800">
            🕵️‍♀️ Looking ...
          </div>
          <div v-if="!loading && results.length <= 0 && query.length > 0" class="w-full mt-1 block p-4 shadow-sm sm:text-sm bg-white border-gray-300 rounded-md text-gray-800">
            😖 No results found
          </div>

          <div v-if="!loading && results.length > 0">
            <div v-for="item in results" :key="item.owner" @click.prevent="goToSearchResult(item)" class="group w-full mt-1 flex p-4 cursor-pointer shadow-sm hover:shadow-md sm:text-sm bg-white border-gray-300 rounded-md text-gray-800">
              <!-- <AtSymbolIcon v-if="item.type == 'alias'" class="inline my-auto h-4 w-4 mr-1" /> -->
              <LinkIcon v-if="item.type == 'link'" class="inline my-auto h-4 w-4 mr-1" />
              <div class="w-full" v-html="formatRecord(item.shortname)"></div>
              <ArrowRightIcon class="inline my-auto h-5 w-5 text-gray-200 group-hover:text-gray-600" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  MagnifyingGlassIcon,
  AtSymbolIcon,
  ArrowRightIcon,
  XMarkIcon,
  LinkIcon,
} from '@heroicons/vue/24/outline'

export default {

  data() {
    return {
      config: null,
      timer: null,

      open: false,
      loading: false,
      query: '',
      results: [],
    }
  },

  components: {
    AtSymbolIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    LinkIcon,
  },

  computed: {
    isMacOs() {
      return navigator.platform.toUpperCase().indexOf('MAC') >= 0
    },
  },

  methods: {
    openSearch() {
      this.open = true
      // autofocus
      setTimeout(() => {
        document.getElementById("query").focus()
      }, 220)
    },
    close() {
      this.open = false
      this.loading = false
      this.query = ''
      this.results = []
    },

    formatRecord(str) {
      return `${str}`.replace(this.query, `<b>${this.query}</b>`)
    },

    goToSearchResult(item) {
      if (item && item.type === 'alias') {
        this.$router.push(`/${item.url}`)
        this.close()
      }
      if (item && item.type === 'link') {
        this.close()
        window.open(`${item.url}`, '_blank')
      }
    },

    debounce() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.search() }, 300)
    },

    async search() {
      if (!this.query || !this.query.length) return
      this.loading = true
      let results = []
      const q = `${this.query}`
      this.loading = false
    },
  },

  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault();
        if (this.open) this.close()
        else this.openSearch()
      }
      if (e.key === "Escape") {
        this.close()
      }
    })
  },

  watch: {
    'query': ['debounce'],
  },
}
</script>
