<script lang="ts">
    import 'bootstrap-icons/font/bootstrap-icons.css';
	import TextInput from '../common/TextInput.svelte';
	
	export let showLoginBox: boolean = false;
	let username: string = '';
	let password: string = '';
    let disabled: boolean = false;
	let errorMessage: string = '';

	let userInput: any;
	let passwordInput: any;
    let loginButton: any;

    async function validateComponent(): Promise<boolean> {
        if (!username) {
            document.getElementById('username')?.focus();
			userInput.validateInput();
            return false;
        }
        if (!password) {
            document.getElementById('password')?.focus();
            return false;
        }

        loginButton.disabled = true; // Disable the button to prevent multiple clicks
        disabled = true; // Disable the inputs to prevent further changes
        loginButton.classList.add('disabled', 'opacity-50');
        loginButton.classList.remove('hover:bg-teal-300', 'active-btn');
        loginButton.textContent = 'กำลังเข้าสู่ระบบ...';
        loginButton.focus();
        
        return true;
    }

	// This function can be used to handle form submission
	async function doLogin(event: Event) {
		event.preventDefault();
		// Add your login logic here
        const isValid = await validateComponent();
		if (isValid) {
			console.log('Login successful');
		}
        else {
            errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        }
	}

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="login-box {showLoginBox ? 'flex' : 'hidden'} p-5" on:keypress={(event) => {
        if (event.key === 'Enter') {
            doLogin(event);
        }
    }}>
	<div class="login-form">
		<div class="form-group">
			<TextInput
                id="username"
                labelText="ชื่อผู้ใช้"
                bind:value={username}
				bind:this={userInput}
                disabled={disabled}
            />
		</div>
		<div class="form-group">
			<TextInput
                id="password"
                labelText="รหัสผ่าน"
                bind:value={password}
				bind:this={passwordInput}
                type="password"
                disabled={disabled}
            />
		</div>
		<p class="text-red-500 text-center">{errorMessage}</p>
	</div>
	<div class="form-actions">
		<button
			class="active-btn btn rounded-md bg-sky-400 px-3 py-1 text-white hover:bg-sky-500"
            bind:this={loginButton}
			on:click={doLogin}>เข้าสู่ระบบ</button
		>
	</div>
</div>

<style scoped>
    div, button {
        transition: 0.35s;
    }

    button.active-btn:hover {
        cursor: pointer;
    }

	div.login-box {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}
	div.login-form {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}

	div.form-group {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	div.form-actions {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
        gap: 0.5rem;
	}
</style>
