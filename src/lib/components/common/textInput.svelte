<script lang="ts">
	import { REQUIRED_STAR } from "$lib/utils";
	import z from "zod";

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
    export let showLabel: boolean = true;

    export function validateInput(maxLength: number = 100, minLength: number = 1): boolean {
        let validatedResult: any;
        errorMessage = undefined;
        const baseRule = z
            .string({
                required_error: 'ต้องการข้อมูลนี้',
                invalid_type_error: 'ต้องการข้อมูลนี้'
            })
            .min(required ? minLength : 0, {
                message: `ต้องการข้อมูลอย่างน้อย ${minLength} ตัวอักษร`
            })
            .max(maxLength, {
                message: `ต้องการข้อมูลไม่เกิน ${maxLength} ตัวอักษร`
            });
        if (required) {
            validatedResult = baseRule.safeParse(value);
        } else {
            validatedResult = baseRule.nullish().optional().safeParse(value);
        }

        if (!validatedResult.success) {
            const errors = validatedResult.error.format();
            errorMessage = errors._errors[0] ?? 'ข้อมูลไม่ถูกต้อง';
			return false;
        } else {
            errorMessage = undefined;
            return true;
        }     
    }
</script>

<div class="text-input-group">
	<div class="{showLabel ? 'mt-1' : 'hidden'} {labelSize}">
		<label class="label-text text-black inline-flex gap-2" for={targetableId}>
			{labelText}{@html required ? REQUIRED_STAR : ''}
        </label>
	</div>
    <div class="text-input-box-container">
        <input
		class="text-input-box w-full border {errorMessage ? 'border-red-500' : 'border-gray-400'} rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500 {disabled ? 'bg-gray-100 text-gray-400' : 'text-black bg-white'}"
		{placeholder}
		id={targetableId}
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
