import Component from '../../views/Component';

import Error404Template from '../../../templates/pages/Error404.hbs';

class Error404 extends Component {
    render() {
        return new Promise(resolve => resolve(Error404Template()));
    }
}

export default Error404;