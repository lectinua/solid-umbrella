<script setup lang="ts">
const props = defineProps({
  uid: String
})
</script>

<template>
  <div>
    <div>detail</div>
    <div>{{ uid }}</div>
  </div>
</template>
