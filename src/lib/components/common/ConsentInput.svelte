<script lang="ts">
	import { REQUIRED_STAR } from "$lib/utils";
	import z from "zod";

	export let value: boolean = false;
    export let consentText: string = 'ฉันยินยอมให้ใช้ข้อมูลส่วนตัวของฉัน';
	export let consentWarning: string = 'กรุณายืนยันว่าคุณยินยอมให้ใช้ข้อมูลส่วนตัวของคุณ';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string | undefined = undefined;
	export let targetableId: string = id && id.length > 0 ? id : 'consent-input-' + new Date().getTime();
	export let errorMessage: string | undefined = undefined;

	export let handleInputChange: (() => Promise<any>) | undefined = undefined;
    let inputElement: HTMLInputElement | undefined = undefined;

    export async function doInputChange(): Promise<void> {
        if (inputElement && inputElement.checked) {
            value = true;
        } else {
            value = false;
        }
        if (handleInputChange) {
            await handleInputChange();
        }
    }

	export function validateInput(): boolean {
        let validatedResult: any;
        errorMessage = undefined;
		const validatedRule = z
			.literal(true, {
				errorMap: () => {
					return { message: consentWarning };
				}
			});

        validatedResult = validatedRule.safeParse(value ?? false);

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

<div class="text-input-group mt-1">
	<div class="text-input-box-container">
		<div class="inline-flex items-start w-full" >
				<input
						type="checkbox"
						id={targetableId}
						style="margin-top: 0.1rem; width: 1.2rem; height: 1.2rem;"
						class="{!disabled ? 'labelOfList' : ''} text-sky-500 {errorMessage ? 'border-red-500' : 'border-gray-400'} focus:ring-sky-500"
						name={targetableId}
						bind:checked={value}
                        bind:this={inputElement}
						on:change={doInputChange}
						{required}
						{disabled}
					/>
					<label class="ml-2 {disabled ? 'text-gray-400' : 'labelOfList'}" for={targetableId}>{consentText} {@html required ? '&nbsp;' + REQUIRED_STAR : ''}</label>
				</div>
		{#if errorMessage}
			<div class="mt-1 text-sm text-red-500">{errorMessage}</div>
		{/if}
	</div>
</div>

<style>
	div,
	input {
		transition: 0.35s;
	}

	div.text-input-group {
		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: space-between;
		width: 100%;
	}

	div.text-input-box-container {
		flex-grow: 1;
	}

	.labelOfList:hover {
		cursor: pointer;
	}
</style>
