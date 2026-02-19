<script>
	let { size, price, network, onSelect } = $props();
</script>

<button 
	onclick={() => onSelect({ size, price, network })}
	class="group relative flex flex-col items-center justify-between rounded-[2rem] bg-[var(--card-bg)] p-7 border border-[var(--border-color)] transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:border-[var(--apple-blue)]/30 active:scale-95"
>
	<div class="mb-5 flex flex-col items-center">
		<span class="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">{size}</span>
		<div class="mt-2 h-1.5 w-6 rounded-full opacity-80" style="background-color: {network.color}"></div>
	</div>
	
	<div class="flex flex-col items-center">
		<span class="text-xl font-bold text-[var(--text-primary)]">GH₵ {price}</span>
		<span class="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 group-hover:opacity-100 transition-opacity">Purchase</span>
	</div>
</button>
