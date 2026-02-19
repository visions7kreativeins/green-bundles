<script>
	import { fade, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	
	let { isOpen, selectedPackage, onClose } = $props();
	let phoneNumber = $state('');
	let step = $state(1); // 1: Details, 2: Payment instructions

	let isSubmitting = $state(false);
	let errorMessage = $state('');

	function handleSubmit(e) {
		if (phoneNumber.length >= 10) {
			step = 2;
		}
	}

	function handleClose() {
		step = 1;
		phoneNumber = '';
		isSubmitting = false;
		onClose(true);
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
				class="absolute right-8 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-xl font-light opacity-60 hover:opacity-100 transition-all active:scale-90"
				onclick={handleClose}
				aria-label="Close modal"
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
			{:else if step === 2}
				<div class="mt-4 text-center" in:fly={{ x: 20, duration: 400 }}>
					<div class="mb-8 flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--apple-blue)]/10 text-4xl">📱</div>
						<h2 class="mt-6 text-2xl font-extrabold tracking-tight">Payment Details</h2>
					</div>

					<div class="rounded-3xl bg-[var(--bg-secondary)] p-8 text-left border border-[var(--border-color)]">
						<div class="space-y-4">
							{#each selectedPackage.network.instructions as instruction, i}
								<div class="flex gap-4 items-start">
									<span class="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--apple-blue)] text-[10px] font-bold text-white uppercase">{i + 1}</span>
									<p class="text-xs font-semibold leading-relaxed opacity-70">
										{@html instruction.replace('0534644088', '<span class=\"text-[var(--text-primary)] font-black\">0534644088</span>')}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<form 
						method="POST" 
						action="?/notifyOrder"
						use:enhance={() => {
							isSubmitting = true;
							errorMessage = '';
							return async ({ result }) => {
								if (result.type === 'success') {
									step = 3;
								} else {
									errorMessage = 'Failed to send notification. Please contact WhatsApp support directly.';
								}
								isSubmitting = false;
							};
						}}
					>
						<input type="hidden" name="phoneNumber" value={phoneNumber} />
						<input type="hidden" name="packageSize" value={selectedPackage.size} />
						<input type="hidden" name="packagePrice" value={selectedPackage.price} />
						<input type="hidden" name="network" value={selectedPackage.network.name} />
						
						{#if errorMessage}
							<p class="mb-4 text-xs font-bold text-red-500 bg-red-500/10 py-3 rounded-xl border border-red-500/20">{errorMessage}</p>
						{/if}

						<div class="mt-8 flex flex-col gap-3">
							<button 
								type="submit"
								disabled={isSubmitting}
								class="relative flex items-center justify-center w-full rounded-2xl bg-[var(--text-primary)] py-5 font-bold text-[var(--bg-primary)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
							>
								{#if isSubmitting}
									<div class="absolute inset-0 flex items-center justify-center">
										<div class="h-6 w-6 animate-spin rounded-full border-2 border-[var(--bg-primary)] border-t-transparent"></div>
									</div>
									<span class="opacity-0">Processing</span>
								{:else}
									I have Paid
								{/if}
							</button>

							<button 
								type="button"
								onclick={() => {
									navigator.clipboard.writeText('0534644088');
									const btn = document.getElementById('copy-btn');
									if (btn) btn.innerText = 'Number Copied!';
									setTimeout(() => { if (btn) btn.innerText = 'Copy Support Number'; }, 2000);
								}}
								id="copy-btn"
								class="w-full py-4 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
							>
								Copy Support Number
							</button>

							<button 
								type="button"
								onclick={() => step = 1}
								disabled={isSubmitting}
								class="w-full py-2 text-xs font-bold opacity-30 hover:opacity-100 transition-opacity disabled:pointer-events-none"
							>
								Go Back
							</button>
						</div>
					</form>
				</div>
			{:else}
				<div class="mt-4 text-center" in:fly={{ y: 20, duration: 600 }}>
					<div class="mb-8 flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl">✅</div>
						<h2 class="mt-6 text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">Order Confirmed!</h2>
					</div>
					
					<div class="rounded-3xl bg-emerald-500/5 p-8 text-center border border-emerald-500/10">
						<p class="text-sm font-medium leading-loose opacity-70">
							Thank you! We've received your notification. Our team is now working to provide your <span class="font-bold text-[var(--text-primary)]">{selectedPackage.size}</span> bundle. 
							<br><br>
							You will receive the data on <span class="font-bold text-[var(--text-primary)]">{phoneNumber}</span> shortly.
						</p>
					</div>

					<button 
						onclick={handleClose}
						class="mt-10 w-full rounded-2xl bg-[var(--apple-blue)] py-5 font-bold text-white shadow-lg shadow-[var(--apple-blue)]/20 transition-all hover:scale-[1.02] active:scale-95"
					>
						Done
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
