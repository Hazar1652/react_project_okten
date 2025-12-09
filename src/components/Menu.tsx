import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <ul>
            <li><Link to={'films'}>films</Link></li>
            <li><Link to={'films/1'}>film 1</Link></li>
        </ul>
    );
};