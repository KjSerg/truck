import 'jquery.maskedinput/src/jquery.maskedinput';

export const validation = () => {
    $('form').on('submit', function (e) {
        e.preventDefault();
        let ths = $(this),
            test = true,
            thsInputs = ths.find('input');

        const is_modal = ths.hasClass('modal');

        thsInputs.each(function () {
            let thsInput = $(this),
                thsInputType = thsInput.attr('type'),
                thsInputVal =  thsInput.val(),
                inputReg = new RegExp(thsInput.data('reg')),
                inputTest = inputReg.test(thsInputVal);

            const max = thsInput.attr('data-max');
            const min = thsInput.attr('data-min');

            let wrapper = (is_modal) ? thsInput.closest('.modal-group') : thsInput.closest('.banner-form-group');

            if (thsInput.attr('required')) {
                if (thsInputVal.length <= 0) {
                    test = false;
                    wrapper.addClass('error');
                    thsInput.focus();
                } else {
                    wrapper.removeClass('error');
                    if (thsInput.data('reg')) {
                        if ( inputTest == false ) {
                            test = false;
                            wrapper.addClass('error');
                            thsInput.focus();
                        } else {
                            wrapper.removeClass('error');
                        }
                    }
                    if(max && min) {
                        if (thsInputVal.length <= min ) {
                            test = false;
                            wrapper.addClass('error');
                            thsInput.focus();
                        }else {
                            wrapper.removeClass('error');
                        }
                    }
                }
            }
        });
        if ( test ) {
            let form_data = ths.serialize();
            $.ajax({
                url: ths.attr('action'),
                type: 'POST',
                data: form_data,
                success: function(form_data) {
                    $.fancybox.close();
                    $.fancybox.open($('#success'));
                    ths.trigger('reset');
                    setTimeout(()=>{
                        $.fancybox.close();
                    }, 3000);
                },
                error:  function(xhr, str){
                    console.log('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        }

    });
};

export const maxLenghtInput = () =>{
    const $inputs = $('input');

    $inputs.each(function () {

        const $this = $(this);

        const max = Number($this.attr('data-max'));
        const min = $this.attr('data-min');

        if(max) {
            let value = '';
            $this.on('keypress input', function(event){
                const $ths = $(this);
                const val = $ths.val();
                const length = val.length;

                if(length <= max) value = val;

                if(length >= max) {
                    $ths.val(value);
                    event.preventDefault();
                    return false;
                }
            });
        }

    });
};

export const blockCharacters = () => {
    const $inputTel = $('input[type="tel"]');

    $inputTel.each(function () {
        const $this = $(this);
        const mask = $this.attr('data-mask');
        $this.mask(mask);
    });

    $inputTel.on('keypress', e => {
        if (e.keyCode < 48 || e.keyCode > 57) {
            return false;
        }
    });
};



