function makePurchase() {
  // Set Cose for Items
  const items = {
    "Chair": 25.50,
    "Recliner": 37.75,
    "Table": 49.95,
    "Umbrella": 24.89
  };

  // Set zones for States
  const stateToZone = {
    "ME": 1, "VT": 1, "NH": 1, "MA": 1, "CT": 1, "RI": 1,
    "NY": 2, "NJ": 2, "PA": 2, "DE": 2, "MD": 2, "VA": 2, "WV": 2,
    "NC": 3, "SC": 3, "GA": 3, "FL": 3,
    "AL": 4, "MS": 4, "TN": 4, "KY": 4, "OH": 4, "MI": 4, "IN": 4, "IL": 4, "MO": 4, "AR": 4, "LA": 4, "TX": 4,
    "ND": 5, "SD": 5, "NE": 5, "KS": 5, "OK": 5, "MT": 5, "WY": 5, "CO": 5, "NM": 5, "ID": 5, "UT": 5, "AZ": 5, "NV": 5, "CA": 5, "OR": 5, "WA": 5, "AK": 5, "HI": 5
  };

  // Set shipping cost for each zone
  const shippingCosts = {
    1: 0.00, // Free shipping for Zone 1
    2: 20.00,
    3: 30.00,
    4: 35.00,
    5: 45.00
  };

  let totalCost = 0;
  let itemDetails = [];

  // Ask for input until the user enters "n"
  while (true) {
    let item = prompt("What item would you like to buy today: Chair, Recliner, Table, or Umbrella?")

    // For each item in items 
    if (items.hasOwnProperty(item)) {
      let quantity = prompt(`How many ${item}s do you want to buy?`);
      quantity = parseInt(quantity);

      if (!isNaN(quantity) && quantity > 0) {
        let cost = items[item] * quantity;
        totalCost += cost;
        itemDetails.push({ name: item, quantity: quantity, unitPrice: items[item], price: cost });
      } else {
        alert("Please enter a valid quantity.");
      }
    } else {
      alert("Sorry, we don't have that item.");
    }
    let ready = prompt("Continue shopping? y/n");
    if (ready == "n") {
      break;
    }
  }

  let state = prompt("Please enter the two letter state abbreviation (e.g., NY for New York):").toUpperCase();

  let shippingCost = 0;
  if (stateToZone.hasOwnProperty(state)) {
    let zone = stateToZone[state];
    // Purchas over $100 get free shipping
    shippingCost = totalCost > 100 ? 0 : shippingCosts[zone];
    totalCost += shippingCost;
  } else {
    alert("Invalid state abbreviation. No shipping cost added.");
  }

  let tax = totalCost * 0.15; // Assuming a 15% tax rate
  let invoiceTotal = totalCost + tax;

  // Generate HTML for the invoice
  let invoiceHTML = `<hr>
  <table border="1" cellpadding="5" cellspacing="0">
    <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Price</th>
    </tr>`;

  itemDetails.forEach(item => {
    invoiceHTML += `<tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.unitPrice.toFixed(2)}</td>
        <td>$${item.price.toFixed(2)}</td>
    </tr>`;
  });

  invoiceHTML += `
    <tr>
        <td colspan="3">Item Total:</td>
        <td>$${totalCost.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="3">Shipping to [${state}]:</td>
        <td>$${shippingCost.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="3">Subtotal:</td>
        <td>$${totalCost.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="3">Tax:</td>
        <td>$${tax.toFixed(2)}</td>
    </tr>
    <tr>
        <td colspan="3"><strong>Invoice Total:</strong></td>
        <td><strong>$${invoiceTotal.toFixed(2)}</strong></td>
    </tr>
  </table>`;

  document.getElementById('invoice').innerHTML = invoiceHTML;
}
