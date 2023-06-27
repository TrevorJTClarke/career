<template>
  <div class="my-12 mx-auto w-full">
    <div class="text-center">
      <h2 class="text-2xl font-semibold leading-8 tracking-tight text-slate-600">Showcase</h2>
    </div>
    <div class="mx-auto mt-8 max-w-7xl gap-8 columns-1 md:columns-4">
      <figure
        v-for="(item, idx) in items"
        :key="idx"
        class="relative mb-4 md:mb-8 rounded bg-white p-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
        @click.prevent="view(idx)"
      >
        <img class="block h-full w-full bg-cover bg-slate-800" :src="item.src" alt="" />
      </figure>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto z-10">
          <div class="flex min-h-full items-center justify-center py-12 px-1 md:p-1 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel class="w-full h-full transform select-none overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                <div class="h-[80vh] md:h-[94vh] select-none">
                  <img class="block rounded h-full w-full object-contain select-none" :src="activeItem.src" alt="" />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>

        <div class="fixed inset-0 overflow-y-auto z-20">
          <div class="group absolute left-2 flex min-h-full items-center justify-center">
            <div class="bg-white/5 group-hover:bg-white/50 transition-all rounded-full p-4 cursor-pointer" @click="view(activeIdx - 1)">
              <ChevronLeftIcon class="w-12 h-12" />
            </div>
          </div>
          <div class="group absolute right-2 flex min-h-full items-center justify-center">
            <div class="bg-white/5 group-hover:bg-white/50 transition-all rounded-full p-4 cursor-pointer" @click="view(activeIdx + 1)">
              <ChevronRightIcon class="w-12 h-12" />
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

export default {
  props: ['items'],

  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },

  data() {
    return {
      isOpen: false,
      activeIdx: 0,
      activeItem: null,
    }
  },

  methods: {
    view(index) {
      let idx = index
      if (idx > this.items.length - 1) idx = 0
      if (idx < 0) idx = this.items.length - 1
      this.activeItem = this.items[idx]
      this.activeIdx = idx
      this.isOpen = typeof this.activeItem !== 'undefined'
    },
    closeModal() {
      this.isOpen = false
    },
    openModal() {
      this.isOpen = true
    },
  },
}
</script>
