<script>
	import { fade, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	
	let { isOpen, selectedPackage, onClose } = $props();
	let phoneNumber = $state('');
	let step = $state(1); // 1: Details, 2: Payment instructions

	function handleSubmit(e) {
		if (phoneNumber.length >= 10) {
			step = 2;
		}
	}

	function handleClose() {
		step = 1;
		phoneNumber = '';
		onClose();
	}
</script>

{#if isOpen && selectedPackage}
	<div 
		transition:fade={{ duration: 300 }}
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px);"
		onclick={handleClose}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="button"
		tabindex="-1"
	>
		<div 
			transition:scale={{ duration: 400, start: 0.9, opacity: 0 }}
			class="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-[var(--card-bg)] p-10 border border-[var(--border-color)] shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="0"
		>
			<button 
				class="absolute right-8 top-8 text-2xl font-light opacity-30 hover:opacity-100 transition-opacity"
				onclick={handleClose}
			>
				&times;
			</button>

			{#if step === 1}
				<div class="mt-4" in:fly={{ x: 20, duration: 400 }}>
					<h2 class="text-3xl font-extrabold tracking-tight">{selectedPackage.size}</h2>
					<p class="mt-1 text-sm font-medium opacity-40">Enter number for delivery</p>

					<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="mt-10 space-y-8">
						<div>
							<label for="phone" class="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">Recipient Number</label>
							<input 
								type="tel" 
								id="phone"
								bind:value={phoneNumber}
								required
								placeholder="05xxxxxxx"
								class="mt-2 w-full border-b-2 border-[var(--border-color)] bg-transparent py-4 text-3xl font-bold outline-none transition-colors focus:border-[var(--apple-blue)] text-[var(--text-primary)]"
							/>
						</div>

						<div class="space-y-4">
							<div class="flex justify-between text-sm">
								<span class="opacity-40">Network</span>
								<span class="font-bold">{selectedPackage.network.name}</span>
							</div>
							<div class="flex justify-between text-base border-t border-[var(--border-color)] pt-4">
								<span class="opacity-40">Total</span>
								<span class="font-black text-[var(--apple-blue)]">GH₵ {selectedPackage.price}</span>
							</div>
						</div>

						<button type="submit" class="w-full rounded-2xl bg-[var(--apple-blue)] py-5 font-bold text-white shadow-lg shadow-[var(--apple-blue)]/20 transition-all hover:scale-[1.02] active:scale-95">
							Continue
						</button>
					</form>
				</div>
			{:else}
				<div class="mt-4 text-center" in:fly={{ x: 20, duration: 400 }}>
					<div class="mb-8 flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--apple-blue)]/10 text-4xl">📱</div>
						<h2 class="mt-6 text-2xl font-extrabold tracking-tight">Payment Details</h2>
					</div>

					<div class="rounded-3xl bg-[var(--bg-secondary)] p-8 text-left border border-[var(--border-color)]">
						<p class="text-sm font-medium leading-loose opacity-70">
							1. Send <span class="font-bold text-[var(--text-primary)]">GH₵ {selectedPackage.price}</span> to <br>
							<span class="text-lg font-black text-[var(--apple-blue)] tracking-tight">0534644088</span><br>
							2. Name: <span class="font-bold text-[var(--text-primary)]">Green Bundles</span><br>
							3. Reference: <span class="font-bold text-[var(--text-primary)]">{phoneNumber}</span>
						</p>
					</div>

					<form 
						method="POST" 
						action="?/notifyOrder"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									handleClose();
									alert('Order received! We are processing your data.');
								}
							};
						}}
					>
						<input type="hidden" name="phoneNumber" value={phoneNumber} />
						<input type="hidden" name="packageSize" value={selectedPackage.size} />
						<input type="hidden" name="packagePrice" value={selectedPackage.price} />
						<input type="hidden" name="network" value={selectedPackage.network.name} />
						
						<button 
							type="submit"
							class="mt-10 w-full rounded-2xl bg-[var(--text-primary)] py-5 font-bold text-[var(--bg-primary)] transition-all hover:scale-[1.02] active:scale-95"
						>
							I have Paid
						</button>
					</form>
				</div>
			{/if}
		</div>
	</div>
{/if}
