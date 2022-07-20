<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <div>
      <button btn text-sm m="3 t8" @click="router.back()">뒤로 가기</button>
    </div>
  </main>
</template>
