<script lang="ts">
    import 'bootstrap-icons/font/bootstrap-icons.css';
    export let textAlign: "start" | "center" | "end" = "start";
    export let title: string = "Title";
    export let subtitle: string = "";
</script>

<div class="header-form w-full text-{textAlign}">
    <div class="text-2xl font-bold"><i class="bi bi-chevron-right me-2 text-sky-400"></i>{title}</div>
    <div class="{subtitle ? '' : 'hidden'} text-lg font-semibold text-gray-500">{subtitle}</div>
</div>