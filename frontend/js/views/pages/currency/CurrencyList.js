import Component from '../../../views/Component';

import Currency_List from '../../../../templates/pages/currency/Currency_List.hbs';

class CurrencyList extends Component{
    render() {
        return new Promise(resolve => resolve(Currency_List()));
    }
}

export default CurrencyList;