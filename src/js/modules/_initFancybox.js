export const initFancybox = (open, close) => {

    if(open) {
        const openButtons = $(open);
        openButtons.fancybox();
    }

    if(close) {
        const closeButtons = $(close);
        closeButtons.on('click', e => {
            e.preventDefault();
            $.fancybox.close();
        });
    }
};