<script setup>
const loading = ref(false)
</script>

<template>
    <main class="col-span-12 md:col-span-8 xl:col-span-6">
    <!-- <div> -->
        <MainSection title="home" :loading="loading">
            this is our home page
        </MainSection>
    <!-- </div> -->
    </main>
</template>
