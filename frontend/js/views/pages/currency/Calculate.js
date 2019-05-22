import Component from '../../../views/Component';
import Pairs from '../../../models/Pairs';

import CalcTemplate from '../../../../templates/pages/currency/CalcTemplate.hbs';
import PairTemplate from '../../../../templates/partials/PairTemplate.hbs';

class Calculate extends Component{
    constructor() {
        super();

        this.model = new Pairs();
    }

    getData() {
        return this.model.getPairs(sessionStorage.getItem('currenciesToCalculate')).then(pairs => {
            this.pairs = pairs;
        });
    }

    render() {
        return new Promise(resolve => resolve(CalcTemplate()));
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

    setToZero(amountInput) {
        amountInput.value = amountInput.value.trim() == 0 ? '0.00' : Number(amountInput.value).toFixed(2);
    }
}

export default Calculate;