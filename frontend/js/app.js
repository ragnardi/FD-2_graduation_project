import '../styles/app.less';

import Features from './helpers/features';

import Utils from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import About from './views/pages/about';
import Error404 from './views/pages/error404';

import CurrencyList from './views/pages/currency/currencyList';
import Calculate from './views/pages/currency/calculate';

const Routes = {
    '/': About,
    '/currencyList': CurrencyList,
    '/calculation': Calculate
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        footerContainer = document.getElementsByClassName('footer-container')[0],
        header = new Header(),
        footer = new Footer();

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    header.render().then(html => {
        headerContainer.innerHTML = html;
        header.afterRender();
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
        footer.afterRender();
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
window.addEventListener('scroll', Features.fixTimeBar);
window.addEventListener('scroll', Features.showScrollBtn);
document.getElementsByClassName('scroll-btn')[0].addEventListener('click', Features.scrollPage);
