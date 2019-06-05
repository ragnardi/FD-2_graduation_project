class Pairs {
    getPairs(currenciesToCalculate) {
        /*
        Method getting a currencies rates from remote service
        and return an array of objects witch consist of currencies names
        and rates if response parsing was successful
        */
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest(),
                currencies = JSON.parse(currenciesToCalculate);

            xhr.open('GET', `http://www.floatrates.com/daily/${currencies.from}.json`, true);

            xhr.onload = () => {
                try {
                    const resp = JSON.parse(xhr.response);

                    resolve(currencies.to.map(element => ({from: currencies.from[0], to: element,
                        rate: +resp[element].rate.toFixed(4), inverseRate: +resp[element].inverseRate.toFixed(4),
                        originalAmount: '1.00', targetAmount: +resp[element].rate.toFixed(4)})));
                } catch (e) {
                    reject();
                }
            };

            xhr.send();
        });
    }

    amountValidation(main, converted) {
        /*
        Only numbers are able to enter in currency inputs
         */
        if (Number(main.value.trim()) !== Number(main.value.trim())) {
            main.value = '0.00';
            converted.value = '0.00';

            main.classList.add('input-error');
        } else  {
            main.classList.remove('input-error');
        }

    }

    conversion(originalInput) {
        /*
        Converse from original currency to target currency
        saving changes in session storage
         */
        const target = originalInput.parentElement.parentElement.getElementsByClassName('target-value')[0],
            currentPair = originalInput.parentElement.parentElement.parentElement.dataset.target,
            converseConfig = JSON.parse(sessionStorage.getItem('converseConfig')),
            pair = converseConfig.find(element => element.to === currentPair);

        this.amountValidation(originalInput, target);

        target.value = (+originalInput.value * +originalInput.dataset.rate).toFixed(2);

        pair.originalAmount = originalInput.value;
        pair.targetAmount = target.value;

        sessionStorage.setItem('converseConfig', JSON.stringify(converseConfig));
    }

    reverseConversion(targetInput) {
        /*
        Converse from target currency to original currency,
        saving changes in session storage
         */
        const original = targetInput.parentElement.parentElement.getElementsByClassName('original-value')[0],
            currentPair = targetInput.parentElement.parentElement.parentElement.dataset.target,
            converseConfig = JSON.parse(sessionStorage.getItem('converseConfig')),
            pair = converseConfig.find(element => element.to === currentPair);

        this.amountValidation(targetInput, original);

        original.value = (+targetInput.value * +targetInput.dataset.inverse).toFixed(2);

        pair.originalAmount = original.value;
        pair.targetAmount = targetInput.value;

        sessionStorage.setItem('converseConfig', JSON.stringify(converseConfig));
    }
}

export default Pairs;