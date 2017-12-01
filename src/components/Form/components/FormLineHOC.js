/**
 * Created by Aus on 2017/12/1.
 */
import React from 'react'
import classNames from 'classnames'
import Icon from 'component-font-awesome'
import Tooltip from 'components/DataDisplay/Tooltip/'
import '../style/form.scss'

// 生成表单的HOC
export default function FormLineHOC(WrappedComponent) {
    // 反向继承
    return class FormLine extends WrappedComponent {
        render () {
            const {prefixCls, labelName, errorText, required} = this.props;

            return (
                <div className={classNames([prefixCls, {error: !!errorText}])}>
                    <div className="title">
                        <Icon type="asterisk" className={required ? 'required' : null} />
                        <div className="label-name">{labelName}</div>
                    </div>
                    {errorText ?
                        <Tooltip title={errorText} trigger='click'>{super.render()}</Tooltip>
                        :
                        super.render()
                    }
                </div>
            );
        }
    }
}