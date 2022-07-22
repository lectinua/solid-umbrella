<script setup lang="ts">
const props = defineProps({
  bbsUid: String
})
</script>

<template>
  <div>
    <div>article</div>
    <div>{{ bbsUid }}</div>
  </div>
</template>
