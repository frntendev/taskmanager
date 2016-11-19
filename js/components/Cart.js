var React = require('React');

var CartItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired,
        handleDragStart: React.PropTypes.func.isRequired
    },

    render: function() {
        var item = this.props.item;
        var remaining = this.props.remaining;
            var style;
            if(remaining<40){
                style={
                    width : this.props.width * 100 + "%",
                    background : "#CF000F",
                    color:"#fff"
                };
            }
            else{
                style={
                    width : this.props.width * 100 + "%",
                };
            }
            return <div style={style} className="task-item" data-item={item.itemId} draggable="true" onDragStart={this.props.handleDragStart}>
                <span>{item.id}</span> -
                <span>{item.timetodo} hr</span>
            </div>


    }
});

var Cart = React.createClass({
    propTypes: {
        handleAddToCart: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            items: [],
            capacity : 0
        }
    },
    getInitialState: function() {
        return {
            items: this.props.items,
            capacity : this.props.capacity
        }
    },
    showBlankMessage: function() {
        return <p className="title"> Capacity : {this.props.capacity} hours</p>
    },
    getTotalTime: function() {
        var total = _.reduce(this.props.items, function(accum, item) {
            return accum + (item.timetodo);
        }, 0);

        return total;
    },
    getRemainingCapacity:function (total,capacity) {
        var remaining =  capacity - total;
        if(remaining>=0)
            return remaining;
        else{
            return "You cannot assign another task";
        }
    },
    handleDragStart: function(e) {
        var target = e.target;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', target.dataset.item);
       // e.dataTransfer.setData('text/plain', this.state.items[0].personId)
        //console.log(this.state.items[0].personId);
    },
    renderItems: function() {
        var items = this.state.items;
        var remaining =this.getRemainingCapacity(this.getTotalTime(),this.props.capacity);
        return (
            <div className="task-items">
                <p className="title">Total {this.getTotalTime()} / {this.props.capacity} </p>
                <p className="title">Remaining Capacity : {remaining} </p>
                <div>
                {items.map(function(item) {
                    return <CartItem handleDragStart={this.handleDragStart} key={item.id} item={item} width={item.timetodo/this.props.capacity} remaining ={remaining}/>
                }.bind(this))}
</div>
            </div>
        )
    },
    render: function() {
        var items = this.state.items,
            createItems = this.renderItems();
        return (
            <div>
                  { items.length > 0 ? createItems : this.showBlankMessage() }
            </div>
        )
    }
});

module.exports = Cart;
