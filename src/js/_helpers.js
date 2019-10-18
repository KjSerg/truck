import $ from 'jquery';

export const $body = $('body');
export const $document = $(document);
export const $window = $(window);
export const $header = $('header');
export const $footer = $('footer');
export const $scrolledElements = $('html, body');
export const winWidth = $window.width();
export const currentPage = $body.find('main').data('page');
export const toggleClass = (clickHandler, element, className = 'active') => {
    clickHandler.on('click tap', () => element.toggleClass(className));
};
export const isScrolledIntoView = ($element, offsetTop = 0, fullyInView = false) => {
    const pageTop = $window.scrollTop();
    const pageBottom = pageTop + $window.height();
    const elementTop = $element.offset().top;
    const elementBottom = elementTop + $element.height();

    if (fullyInView) return ((pageTop < elementTop) && (pageBottom > elementBottom));

    return (((elementTop + offsetTop) <= pageBottom) && (elementBottom >= pageTop));
};
export const checkClosest = (e, item) => $(e.target).closest(item).length > 0;
export class Resp {

    static get currWidth() {
        return window.innerWidth;
    }

    static get isTouch() {
        return 'ontouchstart' in window;
    }

    static get isDesk() {
        return window.matchMedia('(min-width: 1280px)').matches;
    }

    static get isTablet() {
        return window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches;
    }

    static get isMobile() {
        return window.matchMedia('(max-width: 767px)').matches;
    }
}
export const randomString = (length = 10) => Math.random().toString(36).substr(2, length > 10 ? length : 10);
export const detectBrowser = () => {
    const isOpera     = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isFirefox   = typeof InstallTrigger !== 'undefined',
        isSafari    = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
        isIE        = /*@cc_on!@*/false || !!document.documentMode,
        isEdge      = !isIE && !!window.StyleMedia,
        isChrome    = !!window.chrome && !!window.chrome.webstore,
        isBlink     = (isChrome || isOpera) && !!window.CSS;

    switch (true) {
        case isOpera:
            return 'opera';
            break;
        case isFirefox:
            return 'firefox';
            break;
        case isSafari:
            return 'safari';
            break;
        case isIE:
            return 'ie';
            break;
        case isEdge:
            return 'edge';
            break;
        case isChrome:
            return 'chrome';
            break;
        case isBlink:
            return 'blink';
            break;

        default:
            return undefined;
    }
};
