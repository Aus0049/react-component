/**
 * Created by Aus on 2017/7/19.
 */
import React from 'react'
import Picker from '../../DataEntry/Picker/'
import List from '../../DataDisplay/List/'
import classNames from 'classnames'
import '../style/form.scss'

const Select = (props) => {
    const {required, labelName, value, data, readOnly, error, onChange} = props;

    function handleChange (value) {
        onChange({value: value[0]});
    }

    const valueText = function () {
        let result;
        for (let i of data) {
            if (i.value === value) {
                result = i.label;
            }
        }

        return result;
    }();

    return (
        <div className="zby-form-line-box select">
            <div className="title">
                <i className={classNames(['fa', 'fa-asterisk', {required: required}])} />
                <div className="label-name">{labelName}</div>
            </div>
            <div className="content">
                {readOnly ?
                    <p className="input-readonly">{value}</p>
                    :
                    <Picker
                        data={data}
                        cols={1}
                        title="请选择"
                        value={[value]}
                        onChange={handleChange}
                    >
                        <List.Item icon="down">{valueText}</List.Item>
                    </Picker>}
            </div>
        </div>
    );
};

function empty() {}

Select.PropTypes = {
    required: React.PropTypes.bool,
    labelName: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    value: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func
};

Select.defaultProps = {
    required: false,
    value: [],
    readOnly: false,
    onChange: empty
};

export default Select;