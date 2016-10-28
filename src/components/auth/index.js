import {React, CComponent} from 'src/vendor';
import actions from 'src/actions';
import {setFieldValue} from 'src/utils';

export default class extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            remember_me: false
        };
    }

    setField = (field, e) => {
        this.setState(setFieldValue(field, e));
    };

    onSubmit = (e) => {
        e.preventDefault();
        actions.user.auth(this.state);
    };

    render() {
        const {email, password, remember_me} = this.state;

        return <div className="auth">
            <h1>Log in</h1>
            <form className="login-form" method="post" onSubmit={this.onSubmit}>
                <div className="control-group">
                    <label htmlFor="user_email">E-mail Address</label>
                    <input type="email" value={email} onChange={this.setField.bind(this, 'email')} />
                </div>

                <div className="control-group">
                    <label htmlFor="user_password">Password</label>
                    <input type="password" value={password} onChange={this.setField.bind(this, 'password')} />
                </div>

                <input type="checkbox" checked={remember_me} onChange={this.setField.bind(this, 'remember_me')} />
                <label>Keep me logged in</label>

                <input type="submit" className="button" value="Log In" />
            </form>
        </div>;
    }
}