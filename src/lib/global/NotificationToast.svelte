<script lang="ts">
	let notificationText: string;

	let display = 'hidden';
	let opacity = 'opacity-0';

	export function displayNotification(text: string) {
        notificationText = text
		display = 'absolute';
		setTimeout(() => (opacity = 'opacity-100'), 1000);

		setTimeout(() => {
			opacity = 'opacity-0';
			setTimeout(() => {
				display = 'hidden';
				notificationText = '';
			}, 1000);
		}, 5000);
	}
</script>

<div
	class="transition-opacity duration-700 right-4 top-4 bg-green-400 dark:bg-green-600 text-gray-200 p-3 text-lg rounded-sm shadow-md {display} {opacity}"
>
	{notificationText}
</div>
