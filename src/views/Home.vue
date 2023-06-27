<template>
  <main class="mx-auto w-full md:w-[1024px] p-6 md:p-0">
    <HeroIntro class="pt-14" />

    <ContentGrid class="mt-6" />
    <CategoryGrid class="mt-6" />
    
    <HeroOutro class="pt-6" />
  </main>
</template>

<script lang="ts">
import HeroIntro from '@/components/sections/HeroIntro.vue'
import HeroOutro from '@/components/sections/HeroOutro.vue'
import ContentGrid from '@/components/display/ContentGrid.vue'
import CategoryGrid from '@/components/display/CategoryGrid.vue'

export default {
  components: {
    CategoryGrid,
    ContentGrid,
    HeroIntro,
    HeroOutro,
  },
}
</script>