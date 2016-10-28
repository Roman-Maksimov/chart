import {React, ReactRouter} from 'src/vendor';


export default class extends React.Component {
    render() {
        let {pathname} = this.props.location;

        if(pathname.endsWith(".html"))
            return null;

        pathname += (pathname.endsWith("/") ? "" : "/") + "index.html";

        //ReactRouter.browserHistory.replace(pathname);
        location.href = pathname;

        return null;
    }
};
