export const actions = {
	notifyOrder: async ({ request }) => {
		const data = await request.formData();
		const phoneNumber = data.get('phoneNumber');
		const packageSize = data.get('packageSize');
		const packagePrice = data.get('packagePrice');
		const network = data.get('network');

		// In a real application, you would use a service like Resend or SendGrid here.
		// For now, we'll simulate the email notification.
		console.log('--- NEW ORDER ALERT ---');
		console.log(`Recipient: ${phoneNumber}`);
		console.log(`Package: ${packageSize} (${network})`);
		console.log(`Price: GH₵ ${packagePrice}`);
		console.log(`Time: ${new Date().toLocaleString()}`);
		console.log('-----------------------');

		return { success: true };
	}
};
