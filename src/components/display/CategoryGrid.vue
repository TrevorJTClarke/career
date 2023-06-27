<template>
  <section class="columns-1 md:columns-4 gap-6">
    <CategoryItem v-for="item in topCategories" :key="item.title" :data="item" />
  </section>
</template>

<script lang="ts">
import { projects } from '@/data/projects'
import CategoryItem from './CategoryItem.vue'

// const colors = ['#1698EA', '#D853AC', '#54A262', '#BF8124']
const colors = ['#6abfc9', '#c8acee', '#fbdf7e', '#8fc3ff', '#f8d9df']

function getHighestOccurrences(data) {
  const tagCounts = {};

  // Count the occurrences of each tag
  data.forEach((item) => {
    item.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([title, sum], idx) => {
      return {
        title,
        description: sum > 1 ? `(${sum} projects)` : '',
        bg: colors[idx]
      }
    })

  return sortedTags.slice(0,4)
}

export default {
  components: {
    CategoryItem,
  },

  computed: {
    topCategories() {
      return getHighestOccurrences(projects)
    },
  },
}
</script>
