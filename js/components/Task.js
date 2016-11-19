var React = require('react');
var Task = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        handleDragStart: React.PropTypes.func.isRequired
    },
    render: function() {
        var item = this.props.item;
        return (
            <li className='task'
                data-item={item.id}
                draggable="true"
                onDragStart={this.props.handleDragStart}

            >
                <span>Task no{item.id}</span> /
                <span> {item.timetodo} hr </span>
            </li>
        )
    }
});

module.exports = Task;
