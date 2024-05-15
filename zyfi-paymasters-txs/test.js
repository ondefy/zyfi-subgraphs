(async () => {
	const fetch = (await import("node-fetch")).default;

	const endpoint =
		"https://api.studio.thegraph.com/query/69082/zyfi-paymasters-txs/v0.0.1";
	const fromAddress = "0x618a6d148ea45679d02be3f8304d32a28be8d3c8";

	async function fetchTransactions(skip, first) {
		const query = `
  {
    paymasterTransactions(where: { from: "${fromAddress}" }, first: ${first}, skip: ${skip}) {
      value
      refundValue
    }
  }
  `;

		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query }),
		});

		const responseBody = await response.json();
		return responseBody.data.paymasterTransactions;
	}

    async function getAllTransactions() {
        let allTransactions = [];
        let skip = 0;
        const first = 1000;
        let newTransactions;
    
        do {
          newTransactions = await fetchTransactions(skip, first);
          allTransactions = allTransactions.concat(newTransactions);
          skip += first;
        } while (newTransactions.length === first);
    
        return allTransactions;
      }
    
      async function calculateTransactionData() {
        const transactions = await getAllTransactions();
    
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

	calculateTransactionData()
		.then((data) => {
			console.log(`Gas spent: ${data.netValue / 1e18}`);
			console.log(`Points: ${Math.floor(data.netValue / 1e18 / 0.0000025)}`);
			console.log(`Number of Transactions: ${data.transactionCount}`);
		})
		.catch((error) => {
			console.error(error);
		});
})();
