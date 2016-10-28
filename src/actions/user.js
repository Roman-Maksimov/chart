import {moment} from 'src/vendor';
import actions from 'src/actions';
import store from 'src/store';
import {request} from 'src/utils';


export const user = {
    checkAuth: () => {
        request({method: 'get', url: '/api/profile'}).end((err, res) => {
            if(err){
                actions.errors.set((res.body && res.body.error) || err);
                actions.user.setUser({});
            } else {
                actions.user.setUser({user: res.body});
            }
        });
    },

    auth: ({email = null, password = "", remember_me = false}) => {
        const user = email ? {email, password, remember_me} : {};

        const req = request({method: 'post', url: '/api/session'}).send({user});

        req.end((err, res) => {
            if(err){
                actions.errors.set(err);
                actions.user.setUser({});
            } else {
                actions.user.setUser({user: res.body});
            }
        });
    },

    setUser: ({user = {}}) => {
        store.dispatch({
            type: 'USER_SET',
            user
        });
    }
}
