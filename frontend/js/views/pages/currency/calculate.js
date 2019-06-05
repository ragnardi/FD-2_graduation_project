import Component from '../../component';
import Pairs from '../../../models/pairs';

import CalcTemplate from '../../../../templates/pages/currency/CalcTemplate.hbs';
import PairTemplate from '../../../../templates/partials/PairTemplate.hbs';

class Calculate extends Component{
    constructor() {
        super();

        this.model = new Pairs();
    }

    getData() {
        if (JSON.parse(sessionStorage.getItem('converseConfig')).length) {
            this.pairs = JSON.parse(sessionStorage.getItem('converseConfig'));
            return new Promise(resolve => resolve());
        }

        return this.model.getPairs(sessionStorage.getItem('currenciesToCalculate')).then(pairs => {
            this.pairs = pairs;
            sessionStorage.setItem('converseConfig', JSON.stringify(this.pairs));
        }).catch(() => window.location.hash = '#/404');
    }

    render() {
        return new Promise(resolve => resolve(CalcTemplate(this.pairs[0])));
    }

    afterRender() {
        this.appendPairs();
        this.setActions();
    }

    setActions() {
        const pageContent = document.getElementsByClassName('calculation')[0],
            amountInputs = pageContent.getElementsByTagName('input');

        pageContent.addEventListener('keyup', event => {
                if (event.target.classList.contains('original-value')) {
                    this.model.conversion(event.target);
                } else if (event.target.classList.contains('target-value')) {
                    this.model.reverseConversion(event.target);
                }
            }
        );

        pageContent.addEventListener('click', event => {
            if (event.target.classList.contains('back-to-list')) {
                window.location.hash = '#/currencyList';
            } else if (event.target.classList.contains('reset-values-btn')) {
                this.clearAmounts(event.target);
            }
        });

        for (let input in amountInputs) {
            if (amountInputs.hasOwnProperty(input)) {
                amountInputs[input].addEventListener('blur', event => {
                    this.setToZero(event.target);
                });
            }
        }
    }

    appendPairs() {
        const pairsContainer = document.getElementsByClassName('pairs-container')[0];

        this.pairs.forEach(pair => {
            pairsContainer.insertAdjacentHTML('beforeEnd', PairTemplate(pair));
        });
    }

    clearAmounts(resetBtn) {
        const pairContainer = resetBtn.parentElement.parentElement.parentElement,
            original = pairContainer.getElementsByClassName('original-value')[0],
            target = pairContainer.getElementsByClassName('target-value')[0],
            converseConfig = JSON.parse(sessionStorage.getItem('converseConfig')),
            currentPair = converseConfig.find(element => element.to === pairContainer.dataset.target);

        original.value = '0.00';
        target.value = '0.00';

        currentPair.originalAmount = '0.00';
        currentPair.targetAmount = '0.00';

        sessionStorage.setItem('converseConfig', JSON.stringify(converseConfig));
    }

    setToZero(amountInput) {
        /*
        Formatting an input value to n:nn vue
         */
        amountInput.value = amountInput.value.trim() == 0 ? '0.00' : Number(amountInput.value).toFixed(2);
    }
}

export default Calculate;