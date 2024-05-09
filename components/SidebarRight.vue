<script setup>
const whatsHappeningItems = ref([
    {
        title: 'Trending in United States',
        count: '1,234 Tweets'
    },
    {
        title: 'Trending in United States',
        count: '1,234 Tweets'
    },
    {
        title: 'Trending in United States',
        count: '1,234 Tweets'
    }
])
const whoToFollowItems = ref([
    {
        name: 'John Doe',
        username: '@johndoe',
        img: 'https://picsum.photos/200/200'
    },
    {
        name: 'Rebeca Smith',
        username: '@rebecasmith',
        img: 'https://picsum.photos/200/200'
    },
    {
        name: 'Jane Doe',
        username: '@janedoe',
        img: 'https://picsum.photos/200/200'
    }
])
</script>
<template>
    <div class="hidden col-span-12 md:block md:col-span-3 xl:col-span-4">
        <div class="sticky top-0">
            <div class="flex flex-col">
                <!-- Preview Card : What`s happening -->
                <PreviewCard title="What`s happening">
                    <PreviewCardItem
                        v-for="(item, idx) in whatsHappeningItems"
                        :key="idx"
                    >
                        <div>
                            <h2 class="font-bold text-gray-800 text-base dark:text-white">
                                {{ item.title }}
                            </h2>
                            <p class="text-sm text-gray-400">
                                {{ item.count }}
                            </p>
                        </div>
                    </PreviewCardItem>
                </PreviewCard>

                <!-- Preview Card : Who to follow -->
                <PreviewCard title="Who to follow">
                    <PreviewCardItem
                        v-for="(item, idx) in whoToFollowItems"
                        :key="idx"
                    >
                        <div class="flex flex-row justify-between p-2 items-center">
                            <div class="flex flex-row">
                                <img 
                                    :src="item.img"
                                    :alt="item.name"
                                    class="w-10 h-10 rounded-full"
                                />
                                <div class="flex flex-col ml-2">
                                    <h2 class="text-sm font-bold text-gray-900 dark:text-white">
                                        {{ item.name }}
                                    </h2>
                                    <p class="text-xs text-gray-400">
                                        {{ item.username }}
                                    </p>
                                </div>
                            </div>
                            <div class="flex h-full">
                                <button class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </PreviewCardItem>
                </PreviewCard>
            </div>
        </div>
    </div>
</template>
