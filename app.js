'use strict';

let lists = localStorage.getItem('history');

const tabsAssets = document.querySelector('#assetsForm');
const tabsLiabilities = document.querySelector('#liabilitiesForm');
const tabButton = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.content');
const historyList = document.getElementById('historyList');

const init = function () {
  if (lists) {
    historyList.insertAdjacentHTML('afterbegin', lists);

    const markup = `<hr style="margin-top: 20px;">
    <div>
        <button class="btn-delete" type="button" onclick="deleteHistory()">Delete History</button>
    </div>
    `;

    historyList.insertAdjacentHTML('afterend', markup);
  }
};

init();

const tabLogic = function (id, e, type) {
  if (id) {
    tabButton.forEach(btn => {
      if (btn.parentElement.parentElement.id === type) btn.classList.remove('active');
    });
    e.target.classList.add('active');

    contents.forEach(content => {
      if (content.parentElement.parentElement.parentElement.id === type) content.classList.remove('active');
    });
    const element = document.getElementById(id);
    element.classList.add('active');
  }
};

tabsAssets.onclick = e => {
  const id = e.target.dataset.id;
  const type = 'assetsForm';
  tabLogic(id, e, type);
};

tabsLiabilities.onclick = e => {
  const id = e.target.dataset.id;
  const type = 'liabilitiesForm';
  tabLogic(id, e, type);
};

function calculateNetWorth() {
  const getNumberValue = id => parseFloat(document.getElementById(id).value) || 0;

  const totalAssets =
    getNumberValue('checking') +
    getNumberValue('savings') +
    getNumberValue('moneyMarket') +
    getNumberValue('savingsBonds') +
    getNumberValue('cds') +
    getNumberValue('otherCash') +
    getNumberValue('brokerage') +
    getNumberValue('otherInvested') +
    getNumberValue('ira') +
    getNumberValue('rothIra') +
    getNumberValue('retirement') +
    getNumberValue('rothRetirement') +
    getNumberValue('hsa') +
    getNumberValue('sepIra') +
    getNumberValue('pension') +
    getNumberValue('annuity') +
    getNumberValue('otherRetirement') +
    getNumberValue('realEstate') +
    getNumberValue('soleProprietorship') +
    getNumberValue('partnership') +
    getNumberValue('cCorporation') +
    getNumberValue('sCorporation') +
    getNumberValue('llc') +
    getNumberValue('otherBusiness') +
    getNumberValue('principalHome') +
    getNumberValue('vacationHome') +
    getNumberValue('vehicles') +
    getNumberValue('homeFurnishings') +
    getNumberValue('art') +
    getNumberValue('jewelry') +
    getNumberValue('otherUse');

  const totalLiabilities =
    getNumberValue('creditCard') +
    getNumberValue('taxOwed') +
    getNumberValue('outstandingBills') +
    getNumberValue('homeMortgage') +
    getNumberValue('homeEquityLoan') +
    getNumberValue('rentalMortgage') +
    getNumberValue('carLoans') +
    getNumberValue('studentLoans') +
    getNumberValue('lifeInsuranceLoans') +
    getNumberValue('otherDebt');

  const netWorth = totalAssets - totalLiabilities;

  document.getElementById('netWorth').textContent = `$${netWorth.toFixed(2)}`;

  addNetWorthToHistory(netWorth);
}

function addNetWorthToHistory(netWorth) {
  const listItem = document.createElement('li');
  const date = new Date();
  listItem.textContent = `Net Worth: $${netWorth.toFixed(2)} on ${date.toLocaleDateString()}`;

  listItem.setAttribute('data-date', date);

  if (lists) {
    lists += `${listItem.outerHTML}`;
  } else {
    lists = `${listItem.outerHTML}`;

    const markup = `<hr style="margin-top: 20px;">
    <div>
        <button class="btn-delete" type="button" onclick="deleteHistory()">Delete History</button>
    </div>
    `;

    historyList.insertAdjacentHTML('afterend', markup);
  }

  localStorage.setItem('history', lists);

  historyList.appendChild(listItem);
}

function deleteHistory() {
  localStorage.clear();
  location.reload();
}

function generateRaport() {
  const startDate = new Date(document.getElementById('startDate').value);
  const endDate = new Date(document.getElementById('endDate').value);

  if (isNaN(startDate) || isNaN(endDate)) {
    alert('Please enter valid start and end dates.');
    return;
  }

  const historyItems = historyList.querySelectorAll('li');
  const filteredItems = Array.from(historyItems).filter(item => {
    const itemDate = new Date(item.getAttribute('data-date'));
    console.log(item.getAttribute('data-date'));
    console.log(startDate);
    return itemDate >= startDate && itemDate <= endDate;
  });

  if (filteredItems.length === 0) {
    alert('No records found for the specified date range.');
    return;
  }

  const reportWindow = window.open('', 'Report', 'width=800,height=600');
  reportWindow.document.write('<html><head><title>Net Worth Report</title>');
  reportWindow.document.write('<style>');
  reportWindow.document.write(`
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
    h1 {
      color: #007bff;
    }
    p {
      font-size: 1.1em;
      color: #666;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      background: #f4f4f4;
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `);
  reportWindow.document.write('</style>');
  reportWindow.document.write('</head><body>');
  reportWindow.document.write('<h1>Net Worth Report</h1>');
  reportWindow.document.write(`<p>From: ${startDate.toLocaleDateString()} To: ${endDate.toLocaleDateString()}</p>`);
  reportWindow.document.write('<ul>');

  filteredItems.forEach(item => {
    reportWindow.document.write(`<li>${item.textContent}</li>`);
  });

  reportWindow.document.write('</ul>');
  reportWindow.document.write('</body></html>');
  reportWindow.document.close();
}
