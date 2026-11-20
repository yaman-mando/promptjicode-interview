<script setup lang="ts">
// Old links (/quiz/mid) now live under the frontend track (/frontend/mid)
const route = useRoute()
const localePath = useLocalePath()
await navigateTo(localePath({ path: `/frontend/${route.params.level}`, query: route.query }), { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>
