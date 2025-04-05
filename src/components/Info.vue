<script setup>
    import { ref } from 'vue';

    const name = ref("Bob Minion");
    const user = ref("KingBob");

</script>

<template>
    <h2>{{ name }}</h2>
    <h3>{{ user }}</h3>

</template>

<style scoped></style>