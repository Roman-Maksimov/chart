import {moment} from 'src/vendor';
import actions from 'src/actions';
import store from 'src/store';
import {request} from 'src/utils';


export const symbols = {
    get: () => {
        request({method: 'get', url: '/results.json'}).end((err, res) => {
            if(err){
                actions.errors.set((res.body && res.body.error) || err);
            } else {
                store.dispatch({
                    type: "SYMBOLS_SET",
                    data: res.body
                });
            }
        });
    }
};
