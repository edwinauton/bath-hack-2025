<script setup>
    import { reactive } from 'vue';

    const badges = reactive([
        {
            name: "First Badge",
            description: "This is the first badge",
        },
        {
            name: "Second Badge",
            description: "This is the second badge",
        },
        {
            name: "Third Badge",
            description: "This is the third badge",
        }
    ]);
</script>

<template>
    <div>
        <ul>
            <li v-for="badge in badges" :key="badge.name">
                <h3>{{ badge.name }}</h3>
                <p>{{ badge.description }}</p>
            </li>
        </ul>
    </div>
    

</template>

<style scoped></style>