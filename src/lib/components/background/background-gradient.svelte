<section class="whole fixed start-0 top-0">
	<section class="body">
		<div class="air air1"></div>
		<div class="air air2"></div>
		<div class="air air3"></div>
		<div class="air air4"></div>
	</section>
</section>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	section.whole {
		position: fixed;
		top: 0;
		left: 0;
		min-width: 100vw;
		min-height: 100vh;
		z-index: -1;
	}
	section.body {
		position: relative;
		min-width: 100vw;
		min-height: 100vh;
		background: #dadada;
		overflow: hidden;
		z-index: -2;
	}
	section .air {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background: url('assets/wave.png');
		background-size: 1000px 100px;
	}
	section .air.air1 {
		animation: wave 30s linear infinite;
		z-index: 1000;
		opacity: 1;
		animation-delay: 0s;
		bottom: 0;
	}
	section .air.air2 {
		animation: wave2 15s linear infinite;
		z-index: 999;
		opacity: 0.5;
		animation-delay: -5s;
		bottom: 10px;
	}
	section .air.air3 {
		animation: wave 30s linear infinite;
		z-index: 998;
		opacity: 0.2;
		animation-delay: -2s;
		bottom: 15px;
	}
	section .air.air4 {
		animation: wave2 5s linear infinite;
		z-index: 997;
		opacity: 0.7;
		animation-delay: -5s;
		bottom: 20px;
	}
	@keyframes wave {
		0% {
			background-position-x: 0px;
		}
		100% {
			background-position-x: 1000px;
		}
	}
	@keyframes wave2 {
		0% {
			background-position-x: 0px;
		}
		100% {
			background-position-x: -1000px;
		}
	}
</style>
