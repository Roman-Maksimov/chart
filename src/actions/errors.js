import store from 'src/store';

export const errors = {
    set: (e) => {
        console.warn(e);

        // if error text was received
        if(typeof e === "string"){
            store.dispatch({
                type: 'ERROR_SET',
                errors: e
            });

            return;
        }

        // else count it as Error object
        const {errors, response} = e;

        store.dispatch({
            type: 'ERROR_SET',
            errors: errors || e.response.body.errors
        });
    }
}
