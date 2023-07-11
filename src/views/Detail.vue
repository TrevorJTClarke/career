<template>
  <div class="p-4 md:p-14">

    <article class="group flex flex-col overflow-hidden p-0 rounded-3xl bg-slate-500" :style="{background: data?.bg || ''}">
      <figcaption class="flex flex-col md:flex-row justify-between pt-10 px-10 mb-10">
        <div :class="{
          'flex flex-col w-10/12': true,
          'text-slate-800': data?.theme?.style === 'light',
          'text-slate-50': data?.theme?.style === 'dark',
        }">
          <h3 class="text-4xl font-bold lg:text-6xl">{{ data?.title }}</h3>
          <p class="mt-4 text-xl opacity-60">{{ data?.description }}</p>
        </div>
        <div class="flex mt-6 md:mt-0 opacity-50 transition-all duration-500 group-hover:opacity-100">
          <a v-if="data?.externalHref" :href="data.externalHref" class="mb-auto rounded-full bg-white/30 p-3 transition-all duration-500 group-hover:bg-white/50">
            <EyeIcon class="flex-shrink-0 h-6 w-6" />
          </a>
          <a v-if="data?.githubHref" :href="data.githubHref" class="mb-auto ml-4 rounded-full bg-white/30 p-3 transition-all duration-500 group-hover:bg-white/50">
            <LinkIcon class="flex-shrink-0 h-6 w-6" />
          </a>
        </div>
      </figcaption>
      <figure class="relative z-0 px-10">
        <div class="flex overflow-hidden w-full h-[50vh] rounded-lg rounded-b-none bg-slate-800">
          <img :src="data?.img" :alt="data?.description" class="object-cover min-w-full">
        </div>
      </figure>
    </article>

    <div v-if="data?.awards" class="flex flex-col justify-between my-6 md:my-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div v-for="item in data.awards" class="pointer-events-none flex w-full justify-between mb-2">
        <a :href="item.url"
          class="pointer-events-auto flex w-full items-center gap-x-6 bg-teal-400 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <span class="h-5 w-5 text-white" aria-hidden="true">{{item.icon}}</span>
          <p class="text-sm leading-6 text-white">
            <strong class="font-semibold">{{item.title}}</strong>
            <svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx="1" cy="1" r="1" />
            </svg>
            {{item.description}}
          </p>
          <ChevronRightIcon class="flex-shrink-0 h-6 w-6 text-white ml-auto" />
        </a>
      </div>
    </div>

    <div v-if="data?.tags" class="flex justify-between my-6 md:my-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Tags :tags="data.tags" />
      <date class="my-auto text-sm text-slate-400">{{ postTime }}</date>
    </div>

    <div v-if="data?.intro?.title" class="my-6 md:my-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative isolate overflow-hidden bg-slate-900 px-6 py-20 rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
          <div class="lg:row-start-2 lg:max-w-md">
            <h2 class="text-base font-semibold leading-7 uppercase text-slate-600">Demo</h2>
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{{ data.intro.title }}</h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">{{ data.intro.description }}</p>
          </div>
          <video class="relative mx-auto flex w-full aspect-video rounded overflow-hidden bg-black -z-20 min-w-full max-w-xl lg:row-span-4" controls v-if="data?.intro?.video" :src="data.intro.video" :loop="true" autoplay />
        </div>
      </div>
    </div>

    <div class="flex w-full md:w-[1024px] mx-auto prose lg:prose-xl">
      <div v-html="pageContent"></div>
    </div>

    <div v-if="data?.showcase" class="flex w-full mx-auto">
      <Gallery :items="data.showcase" />
    </div>

    <div v-if="data?.tools" class="my-6 md:my-10 mx-auto prose lg:prose-xl">
      <h4>Tools Used</h4>
      <Tags :tags="data.tools" bg="bg-gray-600" :nolink="true" />
    </div>
    <div class="my-6 md:my-10 mx-auto prose lg:prose-xl">
      <p class="text-sm text-slate-600">
        <span class="text-slate-400" v-if="postStartTime">Timeline: </span>
        <span class="text-slate-400" v-if="!postStartTime">Last Updated: </span>
        <span v-if="postStartTime">{{ postStartTime }} - </span>
        <span>{{ postTime }}</span>
      </p>
    </div>
</div>
</template>

<script lang="ts">
import TimeAgo from 'javascript-time-ago'
const timeAgo = new TimeAgo('en-US')
import Gallery from '@/components/display/Gallery.vue'
import Tags from '@/components/display/Tags.vue'
import { projects } from '@/data/projects'
import {
  EyeIcon,
  LinkIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

export default {
  components: {
    EyeIcon,
    LinkIcon,
    ChevronRightIcon,
    Tags,
    Gallery,
},

  computed: {
    data() {
      return projects.find(p => p.slug === this.$route.name)
    },
    postStartTime() {
      if (!this.data?.startDate) return ''
      const ts = this.data.startDate ? new Date(this.data.startDate) : new Date()
      return timeAgo.format(ts, 'twitter-now')
    },
    postTime() {
      if (!this.data?.endDate) return ''
      const ts = this.data.endDate ? new Date(this.data.endDate) : new Date()
      return timeAgo.format(ts, 'twitter-now')
    },
  },

  data() {
    return {
      pageContent: ''
    }
  },

  async mounted() {
    if (this.$route.matched.length > 0 && this.$route.matched[0].meta) this.pageContent = await this.$route.matched[0].meta()
  }
}
</script>
