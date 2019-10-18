

export default class Calculator {
    constructor() {
        this.init();
    }

    initSliders() {
        const _this = this;

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

            $this.slider({
                range: "max",
                min: min,
                max: max,
                value: _value,
                slide: function(event, ui) {
                    $out.text( ui.value );
                }
            });
        });

    }



    init() {

        const _this = this;

        _this.initSliders();

    }
}