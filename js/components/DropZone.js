var React = require('react');

var DropZone = React.createClass({
    propTypes: {
        handleDrop: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            background: "rgba(0, 0, 0, 0.1)"
        }
    },
    handleDragEnter: function(e) {
        this.setState({ background: "rgba(22, 169, 193, 0.15)" });
    },
    handleDragLeave: function(e) {
        this.setState({ background: "rgba(0, 0, 0, 0.1)" });
    },
    handleDragOver: function(e) {
        if (e.preventDefault) {
            e.preventDefault(); // allows us to drop
        }
        e.dataTransfer.dropEffect = 'copy';
    },
    handleDrop:function (e) {
        this.setState({ background: "rgba(0, 0, 0, 0.1)" });
        this.props.handleDrop;
    },
    render: function() {
        var style = {
            background : this.state.background + "",
        };
        return <div style={style} className='drop-zone'
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.props.handleDrop}>
            <img src='./data/download.svg' />
        </div>
    }
});

module.exports = DropZone;
