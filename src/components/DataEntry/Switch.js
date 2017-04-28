/**
 * Created by Aus on 2017/4/11.
 */
import React from 'react'
import classNames from 'classnames'
import Touchable from 'rc-touchable'

// 滑动开关组件
class Switch extends React.Component {
    constructor (props) {
        super(props);

        let checked = true;

        // 如果传入checked 说明是受控组件
        if('checked' in props){
            checked = !!props.checked;
        } else {
            // 否则不受控
            checked = !!props.defaultChecked;
        }

        this.state = {
            checked: checked
        }
    }
    toggle () {
        const checked = !(this.props.checked != undefined ? this.props.checked : this.state.checked);
        this.setChecked(checked);
    }
    setChecked (checked) {
        if (!('checked' in this.props)) {
            this.setState({
                checked,
            });
        }
        this.props.onChange(checked);
    }
    getClassName () {
        const checked = this.props.checked != undefined ? this.props.checked : this.state.checked;

        return classNames(['zby-switch-box', {
            'on' : checked,
            'off' : !checked
        }]);
    }
    render () {
        const className = this.getClassName();

        return (
            <Touchable
                onPress={this.toggle.bind(this)}
                disabled={this.props.disabled}>
                <div className={className}></div>
            </Touchable>
        )
    }
}

Switch.propTypes = {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
};

Switch.defaultProps = {
    defaultChecked: true,
    onChange: empty,
};

function empty() {}

export default Switch