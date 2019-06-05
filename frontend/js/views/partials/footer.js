import Component from '../component';

import FooterTemplate from '../../../templates/partials/Footer.hbs';

class Footer extends Component {
    render() {
        return new Promise(resolve => resolve(FooterTemplate()));
    }
}

export default Footer;