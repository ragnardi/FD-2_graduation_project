import Component from '../component';

import Features from '../../helpers/features';

import HeaderTemplate from '../../../templates/partials/Header.hbs';

class Header extends Component {
    render() {
        return new Promise(resolve => resolve(HeaderTemplate()));
    }

    afterRender() {
        Features.startClock();
    }
}

export default Header;