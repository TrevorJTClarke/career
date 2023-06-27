<template>
  <section class="flex flex-col-reverse md:flex-row gap-6">
    <div class="w-full md:w-8/12 bg-slate-400 bg-[#89b5d3] bg-gradient-to-b from-[#6997c5] to-[#89b5d3] rounded-3xl p-10">
      <h1 class="font-bold text-black text-4xl">Hello, I’m Trevor, a software<br>entrepreneur with 12 years<br>of experience.</h1>
      <p class="mt-6 text-xl">I am passionate about quality code, ease of use, future proof experiences, blockchain and robotics.<br>Welcome to my archive.</p>
    </div>
    <div class="w-full md:w-4/12 bg-slate-800 text-white rounded-3xl p-0 overflow-hidden">
      <img src="/trevor.jpg" alt="Trevor Clarke in Uruguay" class="block box-content bg-cover">
    </div>
  </section>
</template>

<script lang="ts">
// from: 6997c5
// to: 89b5d3
export default {

  data() {
    return {
    }
  },

  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
}
</script>
