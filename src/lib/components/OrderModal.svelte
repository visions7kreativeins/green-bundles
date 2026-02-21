<script>
	import { fade, scale, fly } from 'svelte/transition';

	let { isOpen, selectedPackage, onClose } = $props();
	let phoneNumber = $state('');
	let step = $state(1); // 1: Enter number, 2: Pay & verify

	let phoneError = $state('');
	let transactionId = $state('');
	let hasConfirmed = $state(false);

	const WHATSAPP_NUMBER = '233544488152';
	const PAYMENT_NUMBER = '0534644088';
	const PAYMENT_NAME = 'GODWIN KWAME BOTCHWAY';

	// Derived: WhatsApp button is only unlocked when both conditions are met
	let canProceed = $derived(transactionId.trim().length >= 6 && hasConfirmed);

	// Lock body scroll when modal is open
	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleSubmit() {
		phoneError = '';
		const digits = phoneNumber.replace(/\D/g, '');
		if (digits.length < 10) {
			phoneError = 'Please enter a valid 10-digit phone number.';
			return;
		}
		step = 2;
	}

	function openWhatsApp() {
		if (!canProceed) return;
		const message = encodeURIComponent(
			`Hi! I have paid for a *${selectedPackage.size}* bundle on *${selectedPackage.network.name}* (GH₵ ${selectedPackage.price}).\n\n📱 Send data to: *${phoneNumber}*\n🧾 MoMo Reference: *${transactionId.trim()}*\n\nThank you!`
		);
		window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
		handleClose();
	}

	function handleClose() {
		step = 1;
		phoneNumber = '';
		phoneError = '';
		transactionId = '';
		hasConfirmed = false;
		onClose();
	}
</script>

{#if isOpen && selectedPackage}
	<div
		transition:fade={{ duration: 300 }}
		style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(8px);"
		onclick={handleClose}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="button"
		tabindex="-1"
	>
		<div
			transition:scale={{ duration: 400, start: 0.9, opacity: 0 }}
			class="relative w-full max-w-sm rounded-[2.5rem] bg-[var(--card-bg)] p-10 border border-[var(--border-color)] shadow-2xl max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label="Order bundle"
			tabindex="0"
		>
			<button
				class="absolute right-8 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-xl font-light opacity-60 hover:opacity-100 transition-all active:scale-90"
				onclick={handleClose}
				aria-label="Close order modal"
			>
				&times;
			</button>

			{#if step === 1}
				<!-- Step 1: Enter recipient number -->
				<div class="mt-4" in:fly={{ x: 20, duration: 400 }}>
					<h2 class="text-3xl font-extrabold tracking-tight">{selectedPackage.size}</h2>
					<p class="mt-1 text-sm font-medium opacity-40">Enter the number to receive data</p>

					<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="mt-10 space-y-8">
						<div>
							<label for="phone" class="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">Recipient Number</label>
							<input
								type="tel"
								id="phone"
								bind:value={phoneNumber}
								required
								placeholder="05xxxxxxxx"
								maxlength="10"
								minlength="10"
								inputmode="numeric"
								class="mt-2 w-full border-b-2 border-[var(--border-color)] bg-transparent py-4 text-3xl font-bold outline-none transition-colors focus:border-[var(--apple-blue)] text-[var(--text-primary)] {phoneError ? '!border-red-500' : ''}"
								oninput={() => { phoneError = ''; phoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 10); }}
							/>
							{#if phoneError}
								<p class="mt-2 text-xs font-bold text-red-500" in:fly={{ y: -4, duration: 200 }}>{phoneError}</p>
							{/if}
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
				<!-- Step 2: Pay, verify, then message on WhatsApp -->
				<div class="mt-4" in:fly={{ x: 20, duration: 400 }}>
					<h2 class="text-2xl font-extrabold tracking-tight">Complete Payment</h2>
					<p class="mt-1 text-sm font-medium opacity-40">Follow the steps below to finish your order</p>

					<!-- Recipient + amount summary -->
					<div class="mt-6 rounded-2xl bg-[var(--apple-blue)]/5 border border-[var(--apple-blue)]/20 px-5 py-4">
						<div class="flex justify-between text-sm">
							<span class="opacity-40">Sending to</span>
							<span class="font-black text-[var(--apple-blue)]">{phoneNumber}</span>
						</div>
						<div class="mt-1 flex justify-between text-sm">
							<span class="opacity-40">Amount</span>
							<span class="font-black">GH₵ {selectedPackage.price}</span>
						</div>
					</div>

					<!-- Payment instructions -->
					<div class="mt-5 rounded-3xl bg-[var(--bg-secondary)] p-6 border border-[var(--border-color)]">
						<!-- Recipient name + number callout -->
						<div class="mb-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] px-4 py-3 text-center">
							<p class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">Send MoMo Payment To</p>
							<p class="mt-1 text-2xl font-black tracking-tight">{PAYMENT_NUMBER}</p>
							<p class="mt-0.5 text-[11px] font-bold uppercase tracking-widest opacity-50">{PAYMENT_NAME}</p>
						</div>

						<div class="space-y-3">
							{#each selectedPackage.network.instructions as instruction, i}
								<div class="flex gap-3 items-start">
									<span class="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--apple-blue)] text-[9px] font-bold text-white">{i + 1}</span>
									<p class="text-xs font-semibold leading-relaxed opacity-70">
										{@html instruction.replace(PAYMENT_NUMBER, `<span class="text-[var(--text-primary)] font-black">${PAYMENT_NUMBER}</span>`)}
									</p>
								</div>
							{/each}
						</div>
					</div>

					<!-- Verification: transaction ID + checkbox -->
					<div class="mt-6 space-y-4">
						<div>
							<label for="txn-id" class="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">MoMo Transaction / Reference ID</label>
							<p class="mt-0.5 text-[10px] opacity-40">From your payment confirmation SMS</p>
							<input
								type="text"
								id="txn-id"
								bind:value={transactionId}
								placeholder="e.g. MTN1234567890"
								class="mt-2 w-full border-b-2 border-[var(--border-color)] bg-transparent py-3 text-lg font-bold outline-none transition-colors focus:border-[var(--apple-blue)] text-[var(--text-primary)] placeholder:opacity-20 placeholder:font-normal"
							/>
						</div>

						<!-- Checkbox confirmation -->
						<label class="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 transition-colors {hasConfirmed ? 'border-emerald-500/40 bg-emerald-500/5' : ''}">
							<input
								type="checkbox"
								bind:checked={hasConfirmed}
								class="mt-0.5 h-4 w-4 flex-shrink-0 accent-emerald-500 cursor-pointer"
							/>
							<span class="text-xs font-semibold leading-relaxed opacity-60">
								I confirm I have sent <span class="font-black text-[var(--text-primary)]">GH₵ {selectedPackage.price}</span> to <span class="font-black text-[var(--text-primary)]">{PAYMENT_NUMBER}</span> ({PAYMENT_NAME}) via Mobile Money.
							</span>
						</label>
					</div>

					<div class="mt-6 flex flex-col gap-3">
						<!-- WhatsApp CTA — locked until both conditions are met -->
						<button
							onclick={openWhatsApp}
							disabled={!canProceed}
							class="flex items-center justify-center gap-3 w-full rounded-2xl py-5 font-bold text-white shadow-lg transition-all
								{canProceed
									? 'bg-[#25D366] shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95'
									: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-not-allowed opacity-50 shadow-none'}"
						>
							{#if canProceed}
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
								</svg>
								Notify Us on WhatsApp
							{:else}
								Complete verification above to continue
							{/if}
						</button>

						<button
							type="button"
							onclick={() => step = 1}
							class="w-full py-2 text-xs font-bold opacity-30 hover:opacity-100 transition-opacity"
						>
							Go Back
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
