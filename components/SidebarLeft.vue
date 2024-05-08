<script setup>

const tabs = ref([
    {
        name: 'Home',
        icon: 'heroicons-solid:home',
    },
    {
        name: 'Explore',
        icon: 'heroicons-outline:hashtag'
    },
    {
        name: 'Notifications',
        icon: 'heroicons-outline:bell'
    },
    {
        name: 'Messages',
        icon: 'heroicons-outline:inbox'
    },
    {
        name: 'Bookmarks',
        icon: 'heroicons-outline:bookmark'
    },
    {
        name: 'Lists',
        icon: 'heroicons-outline:document-text'
    },
    {
        name: 'Profile',
        icon: 'heroicons-outline:user'
    },
    {
        name: 'More',
        icon: 'heroicons-outline:dots-circle-horizontal'
    }
])
</script>

<template>
    <div class="flex flex-col h-screen">
        <div 
            class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20 defaultTransition"
        >
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <IconTwitterLogo />
                </div>
            </NuxtLink>
        </div>
        <!--  -->
        <div class="mt-2 space-y-3"
            v-for="(tab, idx) in tabs"
            :key="idx"
        >
            <SidebarLeftTab :active="idx === 0">
                <template #icon>
                    <Icon :name="tab.icon" />
                </template>
                <template #name>
                    {{ tab.name }}
                </template>
            </SidebarLeftTab>
        </div>
    </div>
</template>
