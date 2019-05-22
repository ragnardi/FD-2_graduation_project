import Utils from '../helpers/utils';

class Component {
    constructor() {
        this.request = Utils.parseRequestURL();
        document.documentElement.scrollTop = 0;
    }

    getData() {
        return new Promise(resolve => resolve());
    }

    afterRender() {}
}

export default Component;