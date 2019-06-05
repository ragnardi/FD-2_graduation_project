import Component from '../../component';

import Currency_List from '../../../../templates/pages/currency/Currency_List.hbs';

class CurrencyList extends Component{
    constructor() {
        super();

        this.currenciesToCalculate = {from: [], to: []};
    }

    render() {
        return new Promise(resolve => resolve(Currency_List()));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const currencyTable = document.getElementsByClassName('currency-table')[0],
            controlBtns = document.getElementsByClassName('control-btns')[0],
            originalCurrencies = document.getElementsByClassName('original'),
            targetCurrencies = document.getElementsByClassName('target');

        currencyTable.addEventListener('click', event => {
            if (event.target.classList.contains('currency-btn')) {
                this.selectCurrencies(event.target, originalCurrencies, targetCurrencies);
            }
        });

        window.addEventListener('scroll', () => this.fixControls(controlBtns));

        controlBtns.addEventListener('click', event => {
            if (event.target.classList.contains('reset-selection-btn')) {
                this.resetSelections(originalCurrencies, targetCurrencies);
            } else if (event.target.classList.contains('calculate-btn')) {
                this.calculate();
            }
        });
    }

    calculate() {
        if (!this.currenciesToCalculate.from.length) {
            alert('Не задана начальная валюта.');
            return;
        } else if (!this.currenciesToCalculate.to.length) {
            alert('Не задана валюта для конверсии');
            return;
        }

        sessionStorage.setItem('converseConfig', JSON.stringify([]));
        sessionStorage.setItem('currenciesToCalculate', JSON.stringify(this.currenciesToCalculate));
        window.location.hash = '#/calculation';
    }

    fixControls(controlBtns) {
        /*
        Need to keep control buttons in visible area
         */
        if (window.location.hash === '#/currencyList') {
            const triggerToControls = (document.getElementsByClassName('header')[0].offsetHeight +
                document.getElementsByClassName('content-header')[0].offsetHeight +
                document.getElementsByClassName('tutorial')[0].offsetHeight) - 70;

            if (document.documentElement.scrollTop > triggerToControls) {
                controlBtns.classList.add('sticky-controls');
            } else if (document.documentElement.scrollTop < triggerToControls) {
                controlBtns.classList.remove('sticky-controls');
            }
        }
    }

    resetSelections(originalCurrencies, targetCurrencies) {
        for (let btnToReset in originalCurrencies) {
            if (originalCurrencies.hasOwnProperty(btnToReset)) {
                originalCurrencies[btnToReset].classList.remove('selected-currency');
                originalCurrencies[btnToReset].disabled = false;

                targetCurrencies[btnToReset].classList.remove('selected-currency');
                targetCurrencies[btnToReset].disabled = false;
            }
        }

        [this.currenciesToCalculate.from, this.currenciesToCalculate.to] = [[], []];
        sessionStorage.clear();
    }

    selectCurrencies(btn, originalCurrencies, targetCurrencies) {
        /*
        Making user able to choose just one currency from a left side, disable a same
        currency from right, and to choose one or few target currencies from right,
        disabling an analogs in left side
         */
        if (btn.classList.contains('original')) {
            for (let originBtn in originalCurrencies) {
                if (originalCurrencies.hasOwnProperty(originBtn)) {
                    btn.dataset.currency !== originalCurrencies[originBtn].dataset.currency &&
                        originalCurrencies[originBtn].classList.remove('selected-currency');
                }
            }

            btn.classList.toggle('selected-currency');
            for (let targetToDisable in targetCurrencies) {
                if (targetCurrencies.hasOwnProperty(targetToDisable)) {
                    if (targetCurrencies[targetToDisable].dataset.currency === btn.dataset.currency) {
                        targetCurrencies[targetToDisable].disabled = !targetCurrencies[targetToDisable].disabled;
                    } else {
                        targetCurrencies[targetToDisable].disabled = false;
                    }
                }
            }

            this.currenciesToCalculate.from = this.currenciesToCalculate.from[0] === btn.dataset.currency ?
                [] : [btn.dataset.currency];
        } else if (btn.classList.contains('target')) {
            btn.classList.toggle('selected-currency');

            for (let originToDisable in originalCurrencies) {
                if (originalCurrencies.hasOwnProperty(originToDisable)) {
                    if (btn.dataset.currency === originalCurrencies[originToDisable].dataset.currency) {
                        originalCurrencies[originToDisable].disabled = !originalCurrencies[originToDisable].disabled;
                    }
                }
            }

            if (this.currenciesToCalculate.to.find(elem => elem === btn.dataset.currency)) {
                this.currenciesToCalculate.to = this.currenciesToCalculate.to.filter(elem => elem !== btn.dataset.currency);
            } else {
                this.currenciesToCalculate.to.push(btn.dataset.currency);
            }
        }
    }
}

export default CurrencyList;