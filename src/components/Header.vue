<template>
<header class="fixed w-full z-40">
  <div class="z-10 w-full">
    <div class="flex w-full pt-[6.5px] pb-4">
      <div class="relative mx-auto inline-flex bg-slate-800 rounded-full p-1" @mouseenter="mobileMenuActive = true" @mouseleave="mobileMenuActive = false">

        <!-- <Search class="z-30" /> -->

        <div class="relative z-20 my-auto inline-block text-left pr-6 mr-6 border-r border-slate-600">
          <div class="flex text-white cursor-pointer" @click.prevent="mobileMenuActive = !mobileMenuActive">
            <div class="w-8 h-8 rounded-full overflow-hidden">
              <img class="w-full bg-cover" src="/trevor.jpg" alt="" />
            </div>
            <div class="flex px-2">
              <h4 class="my-auto block truncate text-sm leading-0 font-bold max-w-[145px] md:max-w-[245px]">Trevor Clarke</h4>
            </div>
            <ChevronDownIcon :class="{
              'm-auto text-white h-4 w-4 transition-all': true,
              'rotate-180': mobileMenuActive,
            }" />
          </div>
        </div>

        <div class="relative z-20 flex">
          <button class="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-base font-medium text-green-800 bg-white opacity-90 hover:opacity-100">
            <span class="hidden 3xl:block text-xs uppercase">Contact</span>
            <PaperAirplaneIcon class="h-4 w-4 md:ml-1" />
          </button>
        </div>

        <div :class="{hidden: !mobileMenuActive}" class="absolute z-10 top-5 w-full inset-x-0 transition transform origin-top-center">
          <div class="rounded-3xl rounded-t-none pt-8 shadow-lg ring-1 ring-black ring-opacity-5 text-white bg-slate-800 divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5">
              <nav class="grid gap-y-8">

                <router-link to="/" @click="mobileMenuActive = false" class="-m-3 p-3 flex items-center rounded-2xl hover:bg-slate-600">
                  <HomeModernIcon class="flex-shrink-0 h-6 w-6" />
                  <span class="ml-3 text-base font-medium">
                    Home
                  </span>
                </router-link>

                <router-link to="/tags?selected=web3,cosmos,ethereum" @click="mobileMenuActive = false" class="-m-3 p-3 flex items-center rounded-2xl hover:bg-slate-600">
                  <RectangleStackIcon class="flex-shrink-0 h-6 w-6" />
                  <span class="ml-3 text-base font-medium">
                    Blockchain
                  </span>
                </router-link>

                <router-link to="/tags?selected=robots" @click="mobileMenuActive = false" class="-m-3 p-3 flex items-center rounded-2xl hover:bg-slate-600">
                  <LightBulbIcon class="flex-shrink-0 h-6 w-6" />
                  <span class="ml-3 text-base font-medium">
                    Robotics
                  </span>
                </router-link>

                <router-link to="/tags?selected=3dprint" @click="mobileMenuActive = false" class="-m-3 p-3 flex items-center rounded-2xl hover:bg-slate-600">
                  <FunnelIcon class="flex-shrink-0 h-6 w-6" />
                  <span class="ml-3 text-base font-medium">
                    3D Printing
                  </span>
                </router-link>

                <router-link to="/tags?selected=hackathon" @click="mobileMenuActive = false" class="-m-3 p-3 flex items-center rounded-2xl hover:bg-slate-600">
                  <WrenchScrewdriverIcon class="flex-shrink-0 h-6 w-6" />
                  <span class="ml-3 text-base font-medium">
                    Hackathons
                  </span>
                </router-link>
        
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</header>
</template>

<script lang="ts">
import {
  ChevronDownIcon,
  PaperAirplaneIcon,
  HomeModernIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon,
  FunnelIcon,
  LightBulbIcon,
} from '@heroicons/vue/24/outline'
import Search from '@/components/Search.vue'
import { ellipseLongString } from '@/utils/helpers'

export default {
  components: {
    ChevronDownIcon,
    PaperAirplaneIcon,
    Search,
    HomeModernIcon,
    RectangleStackIcon,
    FunnelIcon,
    WrenchScrewdriverIcon,
    LightBulbIcon,
  },

  data() {
    return {
      mobileMenuActive: false,
      accountMenuActive: false,
      timer: null,
    }
  },

  methods: {
    ellipseLongString,
    hideAccountMenu() {
      this.accountMenuActive = false
    },
    toggleAccountMenu() {
      if (this.timer) clearTimeout(this.timer)
      if (this.accountMenuActive === false) {
        setTimeout(() => {
          this.accountMenuActive = false
        }, 5000)
      }
      this.accountMenuActive = !this.accountMenuActive
    },

  },

  watch: {
    $route: ['hideAccountMenu'],
  },
}
</script>

<style scoped>
.hover-reveal h4 {
  transform: translateY(8px);
  transition: all 220ms ease;
  line-height: 1;
}
.hover-reveal:hover h4 {
  transform: translateY(0px);
}
.hover-reveal span {
  transform: translateY(-3px);
  transition: all 220ms ease;
  opacity: 0;
  max-width: 30px;
  line-height: 1;
}
.hover-reveal:hover span {
  transform: translateY(0px);
  opacity: 0.8;
  max-width: 130px;
}
</style>
