<script lang="ts">
	import { text } from '@sveltejs/kit';
	import { DateTime } from 'luxon';

	const moneyFormat = new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 2 });

	let startingCapital = '0';
	let years = '32';
	let monthlySavings = '1000';
	let appreciation = '6';

	let events: { date: DateTime; capital: number; text: string }[] = [];

	let endDate: DateTime;
	let capital = 0;

	function calculate() {
		let date = DateTime.now();
		const months = parseFloat(years) * 12;
		const yearlyAppreciation = parseFloat(appreciation) / 100;
		const montlyAddition = parseFloat(monthlySavings);
		capital = parseFloat(startingCapital) || 0;

		events = [];

		for (let month = 0; month < months; month++) {
			capital += montlyAddition;
			date = date.plus({ months: 1 });
			if (month > 0 && month % 12 == 0) {
				const increase = capital * yearlyAppreciation;
				events.push({
					text: `Interest ${yearlyAppreciation * 100}% (${increase.toFixed()})`,
					capital,
					date
				});
				capital += increase;
			}
			events.push({ text: `Save ${monthlySavings}`, date, capital });
		}

		endDate = date;
	}

	calculate();
</script>

<div>
	<form on:input={calculate} class="savings">
		<fieldset>
			<legend>Capital</legend>
			<input type="number" name="capital" bind:value={startingCapital} />

			<p>Input how much capital you are starting with.</p>
		</fieldset>
		<fieldset>
			<legend>Years</legend>
			<input type="number" name="years" bind:value={years} />

			<p>How many years into the future to simulate.</p>
		</fieldset>
		<fieldset>
			<legend>Monthly savings</legend>
			<input type="number" name="monthlySavings" bind:value={monthlySavings} />

			<p>How much you are able to save each month.</p>
		</fieldset>
		<fieldset>
			<legend>Appreciation</legend>
			<input type="number" name="appreciation" bind:value={appreciation} />

			<p>Average growth in % year on year.</p>
		</fieldset>
	</form>

	{#if endDate}
		<div class="summary">
			On {endDate.toLocaleString(DateTime.DATE_MED)} you will have
			<div class="capital">
				{moneyFormat.format(capital)}
			</div>
			if you save {monthlySavings} every month
		</div>
	{/if}

	<div class="events">
		<ul>
			{#each [...events].reverse() as event}
				<li>
					<div class="capital">{moneyFormat.format(event.capital)}</div>
					<time datetime={event.date.toISO()}>{event.date.toFormat('LLL yyyy')}</time>
					<div class="text">
						{event.text}
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	form.savings {
		display: grid;
		grid-gap: 16px;
		grid-template-columns: repeat(4, 1fr);
		margin: auto;
		max-width: 1000px;
		padding: 64px;

		fieldset {
			background: #f3f3f3;
			border: none;
			border-radius: 24px;
			padding: 24px;

			legend {
				font-weight: 600;
				padding: 8px;
				position: relative;
				text-transform: uppercase;
				top: -0.3em;
			}

			input {
				border: none;
				border-radius: 8px;
				display: block;
				font-size: 24px;
				margin: auto;
				padding: 8px;
				text-align: center;
				width: 80%;
			}

			p {
				color: #8a8a8a;
				font-size: 12px;
			}
		}
	}

	.summary {
		padding: 32px;
		text-align: center;
		.capital {
			font-size: 64px;
			font-weight: 700;
		}
	}

	.events {
		overflow-x: scroll;
		ul {
			display: grid;
			grid-gap: 16px;
			//grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			grid-auto-flow: column;
			grid-auto-columns: 200px;
			list-style: none;
			padding: 0;
			li {
				background: #f5f5f5;
				padding: 16px;
				text-align: center;

				.capital {
					font-size: 18px;
					font-weight: 700;
				}

				.text {
					font-size: 12px;
				}
			}
		}
	}
</style>
