<script lang="ts">
	import type { MenuItem } from "$lib/interfaces/common/Menu";
    import { page } from "$app/state";

    let menuItems: MenuItem[] = [
        { title: "Examples", href: "/examples" },
        { title: "About", href: "/about" }
    ];
</script>

<div class="fixed w-full bg-white shadow-md px-5 py-4 z-10">
    <div class="container max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" class="text-lg font-semibold text-gray-800">
            Svelte Template
        </a>
        <nav class="space-x-2">
            {#each menuItems as item}
                {#if new RegExp('^' + item.href, 'i').test(page.url.pathname)}
                    <a href={item.href} class="text-white bg-sky-500 px-3 py-2 rounded-md hover:bg-sky-600">{item.title}</a>
                {:else}
                    <a href={item.href} class="text-sky-500 px-3 py-2 rounded-md hover:bg-sky-100">{item.title}</a>
                {/if}    
            {/each}
        </nav>
    </div>
</div>

<div class="opacity-0 w-full bg-white shadow-md px-5 py-4 pointer-events-none">
    <div class="container max-w-6xl mx-auto flex items-center justify-between">
        <div class="text-lg font-semibold text-gray-800">
            Svelte Template
        </div>
        <nav class="space-x-4">
            {#each menuItems as item}
                {#if new RegExp('^' + item.href, 'i').test(page.url.pathname)}
                    <a href={item.href} class="text-white bg-sky-500 px-3 py-2 rounded-md hover:bg-sky-600">{item.title}</a>
                {:else}
                    <a href={item.href} class="text-sky-500 px-3 py-2 rounded-md hover:bg-sky-100">{item.title}</a>
                {/if}    
            {/each}
        </nav>
    </div>
</div>