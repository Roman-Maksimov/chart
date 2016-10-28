const def = {};

export const user = function(state = def, action) {
    switch(action.type){
        case "USER_SET":
            return Object.assign({}, action.user);
    }
    return state;
};