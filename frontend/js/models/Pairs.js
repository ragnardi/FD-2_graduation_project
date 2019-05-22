class Pairs {
    getPairs(currenciesToCalculate) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest(),
                currencies = JSON.parse(currenciesToCalculate);

            xhr.open('GET', `http://www.floatrates.com/daily/${currencies.from}.json`, true);

            xhr.onload = () => {
                const resp = JSON.parse(xhr.response);

                resolve(currencies.to.map(element => ({from: currencies.from[0], to: element,
                    rate: +resp[element].rate.toFixed(4), inverseRate: +resp[element].inverseRate.toFixed(4)})));
            };

            xhr.send();
        });
    }

    amountValidation(main, converted) {
        if (Number(main.value.trim()) !== Number(main.value.trim())) {
            main.value = '0.00';
            converted.value = '0.00';

            main.classList.add('input-error');
        } else  {
            main.classList.remove('input-error');
        }

    }

    conversion(originalInput) {
        const target = originalInput.parentElement.parentElement.getElementsByClassName('target-value')[0];

        this.amountValidation(originalInput, target);

        target.value = (+originalInput.value * +originalInput.dataset.rate).toFixed(2);
    }

    reverseConversion(targetInput) {
        const original = targetInput.parentElement.parentElement.getElementsByClassName('original-value')[0];

        this.amountValidation(targetInput, original);

        original.value = (+targetInput.value * +targetInput.dataset.inverse).toFixed(2);
    }
}

export default Pairs;