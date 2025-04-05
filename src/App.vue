<template>
  <Suspense>
    <router-view />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
<script setup lang="ts"></script>
