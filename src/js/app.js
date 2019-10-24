import { detectBrowser } from './_helpers';
import { validation, blockCharacters, maxLenghtInput } from './modules/_validation';
import './modules/_svg';
import AOS from 'aos';
import 'jquery-ui/ui/widgets/slider';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch';
import '@fancyapps/fancybox';

import { initFancybox } from './modules/_initFancybox';

import Calculator from './modules/Calculator';

class Application {
    constructor() {
        Application.init();
    }

    static initializePlugins() {
        AOS.init();
        initFancybox('.fancybox', '.modal__close');
    };

    static initializeModules() {
        validation();
        blockCharacters();
        maxLenghtInput();
        const _Calculator = new Calculator();
    };

    static detectBrowser() {
        document.body.setAttribute('data-browser', detectBrowser());
    }

    static init() {
        this.detectBrowser();
        this.initializePlugins();
        this.initializeModules();
    }
};

const App = new Application();