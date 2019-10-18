
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

export const blockCharacters = () => {
    const $inputTel = $('input[type="tel"]');

    $inputTel.on('keypress', e => {
        if (e.keyCode < 48 || e.keyCode > 57) {
            return false;
        }
    });
};

