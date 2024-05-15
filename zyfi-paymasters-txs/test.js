(async () => {
	const fetch = (await import("node-fetch")).default;

	const query = `
{
  paymasterTransactions(where: { from: "0x79A4c883f7654ea81E17848c8aCbfeCe7d9234d2" }) {
    value
    refundValue
  }
}
`;

	async function getTransactionData() {
		const response = await fetch(
			"https://api.studio.thegraph.com/query/69082/zyfi-paymasters-txs/v0.0.1",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			},
		);

		const responseBody = await response.json();
		const transactions = responseBody.data.paymasterTransactions;

		let totalValue = 0;
		let totalRefundValue = 0;
		let transactionCount = 0;

		transactions.forEach((tx) => {
			totalValue += Number.parseInt(tx.value);
			if (tx.refundValue) {
				totalRefundValue += Number.parseInt(tx.refundValue);
			}
			transactionCount += 1;
		});

		const netValue = totalValue - totalRefundValue;

		return { netValue, transactionCount };
	}

	getTransactionData().then((data) => {
		console.log(`Net Value: ${data.netValue/1e18}`);
		console.log(`Number of Transactions: ${data.transactionCount}`);
	});
})();
