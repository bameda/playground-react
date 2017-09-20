import React from 'react';

import classnames from 'classnames';


const Editable = ({editing, value, onEdit, className, ...props}) => {
    if(editing) {
        return <Editable.Edit className={className}
                              value={value}
                              onEdit={onEdit} />;
    }

    return <Editable.Value  value={value} className={className} />;
}

Editable.Value = ({value, className, ...props}) => <span className={classnames('value', className)} {...props}>{value}</span>


class Edit extends React.Component {
    render() {
        const {className, value, onEdit, ...props} = this.props;

        return <input type="text"
                      className={classnames('edit', className)}
                      autoFocus={true}
                      defaultValue={value}
                      placeholder="Type the task name"
                      onBlur={this.finishEdit}
                      onKeyPress={this.checkEnter}
                      {...props} />;
    }
    checkEnter = (e) => {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    }
    finishEdit = (e) => {
        const value = e.target.value;

        if(this.props.onEdit) {
            this.props.onEdit(value);
        }
    }
}

Editable.Edit = Edit;


export default Editable;
