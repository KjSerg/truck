

export default class Calculator {
    constructor() {

        this.data = {
            rate: Number($('.calculator').attr('data-rate')),
        };

        this.init();

    }

    get() {
        return this.data;
    }

    set(obj) {
        this.data = obj;
    }

    initSliders() {
        const _this = this;

        const arr = _this.get();

        const $sliders = $(document).find('.calculator-item__slider');

        const test = $sliders.length > 0;

        if(!test) {
            return;
        }

        $sliders.each(function () {
            const $this = $(this);

            const min = Number($this.attr('data-min'));
            const max = Number($this.attr('data-max'));
            const $out = $this.closest('.calculator-item').find('.calculator-item__val');
            const _value = $this.attr('data-val') ? Number($this.attr('data-val')) : min;

            $out.text( _this.separator(_value) );

            _this.setValue($this, arr, _value);

            $this.slider({
                range: "max",
                min: min,
                max: max,
                value: _value,
                slide: function(event, ui) {
                    $out.text( _this.separator(ui.value) );
                    _this.setValue($this, arr, ui.value);
                    _this.view();
                    _this.setValueInInput();
                }
            });
        });
    }

    setValue($this, arr, _value){

        const _this = this;

        if($this.hasClass('calculator__cost')) {
            arr.cost = _value;
        }else if($this.hasClass('calculator__amount')) {
            arr.amount = _value;
        }else if($this.hasClass('calculator__time')) {
            arr.time = _value;
        }

        _this.set(arr);
    }

    advance() {
        return this.data.cost * this.data.amount / 100;
    }
    summary() {
        return this.data.cost - this.advance();
    }
    leasing() {
        return this.data.time * this.payment() + this.advance();
    }

    payment() {
        let a = this.data.rate / 12 * (this.summary() * Math.pow(1 + this.data.rate / 12, this.data.time));
        let b = Math.pow(1 + this.data.rate / 12, this.data.time) - 1;
        return a / b;
    }
    appreciation() {
        let appreciation = (this.leasing() - this.data.cost) / this.data.cost * 100 / (this.data.time / 12);
        return appreciation.toFixed(2);
    }

    summary_final() {
        return this.data.cost - this.advance();
    }

    view() {

        const _this = this;

        const leasing = _this.leasing();

        const payment = _this.payment();

        const appreciation = _this.appreciation();

        $('.calculator-result--payment .calculator-result-row__sum strong').text(_this.separator(payment.toFixed()));

        $('.calculator-result--sum .calculator-result-row__sum strong').text(_this.separator(leasing.toFixed()));

        $('.calculator-result--rise-in-price .calculator-result-row__sum strong').text(appreciation);

    }

    setValueInInput() {

        const _this = this;

        const {cost, amount, time} = _this.data;

        const leasing = _this.leasing();

        const payment = _this.payment();

        const appreciation = _this.appreciation();

        $('.calc-val-cost').val(cost);
        $('.calc-val-amount').val(amount);
        $('.calc-val-time').val(time);

        $('.calc-val-payment').val(payment.toFixed());
        $('.calc-val-sum').val(leasing.toFixed());
        $('.calc-val-appreciation').val(appreciation);

    }

    separator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    init() {
        const _this = this;

        _this.initSliders();

        _this.view();

        _this.setValueInInput();
    }
}