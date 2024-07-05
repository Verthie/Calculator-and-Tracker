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
  listItem.textContent = `Net Worth: $${netWorth.toFixed(2)} on ${new Date().toLocaleDateString()}`;

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
