<template>
  <div class="flex flex-wrap">
    <Tag v-for="item in tags" :label="item" :key="item" :bg="bg" :nolink="nolink" :selected="selected" :selectCallback="selectCallback" />
  </div>
</template>

<script lang="ts">
import Tag from './Tag.vue'

export default {
  props: ['tags', 'bg', 'nolink', 'selected', 'selectCallback'],

  components: {
    Tag,
  },
}
</script>
