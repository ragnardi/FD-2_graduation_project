import Component from '../../views/component';

import Features from '../../helpers/Features';

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