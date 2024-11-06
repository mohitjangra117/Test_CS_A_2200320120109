console.log("Hello");

const url = "https://api.exchangerate-api.com/v4/latest/USD"; 

let rates = {}; 


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.rates); 
    rates = data.rates;

    
    const selectElement1 = document.getElementById('currencySelect1');
    const selectElement2 = document.getElementById('currencySelect2');

   
    Object.keys(rates).forEach((currency) => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      selectElement1.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      selectElement2.appendChild(option2);
    });
  })
  .catch((err) => {
    console.log("Error fetching rates:", err);
  });


document.getElementById('convertBtn').addEventListener('click', function () {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('currencySelect1').value;
  const toCurrency = document.getElementById('currencySelect2').value;

  const errorMessage = document.getElementById('errorMessage');
  if (isNaN(amount) || amount <= 0) {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  const convertedAmount = (amount * toRate) / fromRate;


  document.getElementById('convertedAmount').value = convertedAmount.toFixed(2);
});
