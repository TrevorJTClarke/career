<template>
  <main class="bg-gray-50">
    <Header />
    <div style="min-height: calc(100vh - 36px)">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </main>
</template>

<script lang="ts">
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: .5s;
}

.fade-enter-active {
  transition-delay: .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>