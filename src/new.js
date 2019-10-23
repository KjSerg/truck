
var priceSlider;
var advanceSlider;
var lastPaymentSlider;
var monthSlider;
var calcApp = new Vue({
    el: '#appCalc',
    data: {
        transport_type: 1,
        price: 500000,
        rate: 0.1985,
        rate_with_edo: 0.1935,
        rate_without_edo: 0.1985,
        edo: false,
        calcParams: {
            1: {
                min_advance: 10,
                advance_percent: 49,
                last_payment_percent: 0,
                month: 48,
                max_month: 48,
                min_month: 12,
                min_price: 270000,
                max_price: 50000000,
            },
            2: {
                min_advance: 10,
                advance_percent: 49,
                last_payment_percent: 0,
                month: 36,
                max_month: 36,
                min_month: 12,
                min_price: 270000,
                max_price: 50000000,
            },
            3: {
                min_advance: 10,
                advance_percent: 49,
                last_payment_percent: 0,
                month: 48,
                max_month: 48,
                min_month: 12,
                min_price: 270000,
                max_price: 50000000,
            },
            4: {
                min_advance: 15,
                advance_percent: 49,
                last_payment_percent: 0,
                month: 36,
                max_month: 36,
                min_month: 12,
                min_price: 1000000,
                max_price: 50000000,
            },
        },
        pay_type: 1
    },
    computed: {
        advance: function () {
            return this.price * this.calcParams[this.transport_type].advance_percent / 100;
        },
        last_payment: function () {
            if (this.calcParams[this.transport_type].last_payment_percent > 0) {
                return this.price * this.calcParams[this.transport_type].last_payment_percent / 100;
            } else {
                return 1000;
            }
        },
        summary: function () {
            return this.price - this.advance
        },
        leasing: function () {
            return this.calcParams[this.transport_type].month * this.payment + this.last_payment + this.advance
        },
        payment: function () {
            let a = this.rate / 12 * (this.summary * Math.pow(1 + this.rate / 12, this.calcParams[this.transport_type].month) - this.last_payment);
            let b = Math.pow(1 + this.rate / 12, this.calcParams[this.transport_type].month) - 1;
            return a / b;
        },
        appreciation: function () {
            let appreciation;
            appreciation = (this.leasing - this.price) / this.price * 100 / (this.calcParams[this.transport_type].month / 12);
            return appreciation.toFixed(2);
        },
        summary_final: function () {
            return this.price - this.advance - this.last_payment;
        }
    },
    methods: {
        updatePriceSlider: function () {
            priceSlider.set(this.price);
        },
        insertCalcToForm: function () {
            let calcStr =
                'Тип транспорта: ' + $('input[name=transport_type]:checked ~ div').text() + '. ' +
                'Стоимость имущества: ' + this.price + '₽. ' +
                'Размер аванса: ' + this.calcParams[this.transport_type].advance_percent + '%. ' +
                'Размер последнего платежа: ' + this.calcParams[this.transport_type].last_payment_percent + '%. ' +
                'Срок договора: ' + this.calcParams[this.transport_type].month + ' месяцев. ' +
                'Ежемесячный платеж от: ' + parseInt(this.payment) + '₽. ' +
                'Сумма договора: ' + parseInt(this.leasing) + '₽.';
            $('input[name=form_text_840]').val(calcStr);

            let calcJson = {
                SblMonthlyPaymentStock: parseInt(this.payment),
                SblLOCostStock: parseInt(this.price),
                SblTermStock: parseInt(this.calcParams[this.transport_type].month),
                SblPrepaidExpenseStock: parseInt(this.calcParams[this.transport_type].advance_percent),
                SblLeasingCostStock: parseInt(this.leasing),
                SblLastPaymentAmountStock: parseInt(this.calcParams[this.transport_type].last_payment_percent),
            };
            $('input[name=form_text_848]').val(JSON.stringify(calcJson));
        }
    },
    watch: {
        edo: function(){
            if(this.edo){
                this.rate = this.rate_with_edo;
            }else{
                this.rate = this.rate_without_edo;
            }
        },
    },
    mounted: function () {

        //Слдайдер стоимость имущества
        priceSlider = noUiSlider.create(this.$refs.priceSlider, {
            start: [500000],
            step: 1000,
            connect: [true, false],
            range: {
                'min': this.calcParams[this.transport_type].min_price,
                'max': this.calcParams[this.transport_type].max_price
            }
        });


        //Слдайдер размер аванса
        advanceSlider = noUiSlider.create(this.$refs.advanceSlider, {
            start: [49],
            step: 1,
            connect: [true, false],
            range: {
                'min': this.calcParams[this.transport_type].min_advance,
                'max': 49
            }
        });


        //Слдайдер размер последнего платежа
        lastPaymentSlider = noUiSlider.create(this.$refs.lastPaymentSlider, {
            start: [0],
            step: 1,
            connect: [true, false],
            range: {
                'min': 0,
                'max': 40
            }
        });


        //Слдайдер срок договора
        monthSlider = noUiSlider.create(this.$refs.monthSlider, {
            start: [48],
            step: 1,
            connect: [true, false],
            range: {
                'min': this.calcParams[this.transport_type].min_month,
                'max': this.calcParams[this.transport_type].max_month
            }
        });
    },
    updated: function () {
        priceSlider.updateOptions({
            range: {
                'min': this.calcParams[this.transport_type].min_price,
                'max': this.calcParams[this.transport_type].max_price
            }
        });

        monthSlider.updateOptions({
            range: {
                'min': this.calcParams[this.transport_type].min_month,
                'max': this.calcParams[this.transport_type].max_month
            },
            start: this.calcParams[this.transport_type].month
        });

        lastPaymentSlider.updateOptions({
            start: this.calcParams[this.transport_type].last_payment_percent
        });

        advanceSlider.updateOptions({
            range: {
                'min': this.calcParams[this.transport_type].min_advance,
                'max': 49
            },
            start: this.calcParams[this.transport_type].advance_percent
        });
    }
});

calcApp.$refs.priceSlider.noUiSlider.on('update', function (values, handle) {
    calcApp.$data.price = parseInt(values[handle]);
});

calcApp.$refs.advanceSlider.noUiSlider.on('update', function (values, handle) {
    calcApp.$data.calcParams[calcApp.$data.transport_type].advance_percent = parseInt(values[handle]);
});

calcApp.$refs.lastPaymentSlider.noUiSlider.on('update', function (values, handle) {
    calcApp.$data.calcParams[calcApp.$data.transport_type].last_payment_percent = parseInt(values[handle]);
});

calcApp.$refs.monthSlider.noUiSlider.on('update', function (values, handle) {
    calcApp.$data.calcParams[calcApp.$data.transport_type].month = parseInt(values[handle]);
});

