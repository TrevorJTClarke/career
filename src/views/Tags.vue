<template>
  <div class="p-4 md:p-14 mx-auto w-full md:w-[1024px]">

    <div class="flex justify-between my-6 md:my-10">
      <Tags :tags="allTags" :nolink="true" :selected="activeTags" :selectCallback="selectedUpdate" />
    </div>
    
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ProjectItem v-for="item in filteredItems" :key="item.title" :data="item" />
    </section>

    <div v-if="!filteredItems.length" class="text-center text-slate-800 font-extrabold">
      <h1 class="text-7xl">😿</h1>
      <h1>No projects match!</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Tags from '@/components/display/Tags.vue'
import ProjectItem from '@/components/display/ProjectItem.vue';
import { projects } from '@/data/projects'


function getUniqueTags(data) {
  return [...new Set(data.flatMap(item => item.tags))]
}

function removeItemFromArray(arr, str) {
  const i = arr.findIndex((item) => typeof item === 'string' && item === str)

  if (i !== -1) {
    arr.splice(i, 1)
  }

  return arr
}

export default {
  components: {
    ProjectItem,
    Tags,
  },

  data() {
    return {
      activeTags: [],
    }
  },

  computed: {
    allTags() {
      return getUniqueTags(projects)
    },
    filteredItems() {
      if (this.activeTags.length <= 0) return projects
      return projects.filter((item) => {
        return this.activeTags.some((tag) => item.tags.includes(tag))
      })
    },
  },

  methods: {
    selectedUpdate(item) {
      if (this.activeTags.includes(item)) this.activeTags = removeItemFromArray([...this.activeTags], item)
      else this.activeTags.push(item)

      this.$router.replace(`/tags?selected=${this.activeTags.join(',')}`)
    },
    routerSelect() {
      if (this.$route.query.selected) this.activeTags = `${this.$route.query.selected}`.split(',')
    },
  },

  async mounted() {
    this.routerSelect()
  },

  watch: {
    $route: ['routerSelect'],
  }
}
</script>
