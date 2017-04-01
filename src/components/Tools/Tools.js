/**
 * Created by Aus on 2017/4/1.
 */
import { browserHistory } from 'react-router'

const Tool = {
    linkTo (path) {
        browserHistory.push(path);
    }
};

export default Tool