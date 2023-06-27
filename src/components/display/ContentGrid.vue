<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ProjectItem v-for="item in contents" :key="item.title" :data="item" />
  </section>
</template>

<script lang="ts">
import { projects } from '@/data/projects'
import ProjectItem from './ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },

  data() {
    return {
      contents: projects,
    }
  },
}
</script>
