<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
    export let id: string | undefined = undefined;
	export let type: string = 'text';
	export let labelText: string = 'ข้อมูล';
	export let labelSize: string = 'w-24';
    export let targetableId: string = id && id.length > 0 ? id : 'text-input-' + new Date().getTime();
    export let errorMessage: string | undefined = undefined;
    export let inputElement: any;
    export let showLabel: boolean = true;
</script>

<div class="text-input-group">
	<div class="{showLabel ? 'mt-1' : 'hidden'} {labelSize}">
		<label class="label-text text-black" for={targetableId}>
			{labelText}{@html required ? '<span class="text-red-500">*</span>' : ''}
        </label>
	</div>
    <div class="text-input-box-container">
        <input
		class="text-input-box w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 {disabled ? 'bg-gray-100 text-gray-400' : 'text-black bg-white'}"
		{placeholder}
		id={targetableId}
        bind:this={inputElement}
		{type}
		bind:value
		{required}
		{disabled}
	/>
        {#if errorMessage}
            <div class="text-red-500 text-sm mt-1">{errorMessage}</div>
        {/if}
    </div>
	
</div>

<style>
    div, input {
        transition: 0.35s;
    }

    div.text-input-group {
		display: flex;
		flex-direction: row;
		align-items: top;
        justify-content: space-between;
        width: 100%
	}

    div.text-input-box-container {
        flex-grow: 1;
    }

    div.text-input-box {
        width: 100%;
    }
</style>
