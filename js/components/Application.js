var React = require('react'),
    DropZone = require('./DropZone'),
    Task = require('./Task'),
    Cart = require('./Cart');
var App = React.createClass({
    propTypes: {
        products: React.PropTypes.array.isRequired
    },
    getDefaultProps: function() {
        return {
            products: []
        }
    },
    getInitialState: function() {
        return {
            Persons: [
                {
                    name :"Sepehr",
                    personId : ".0.2.0.1.0",
                    tasks :[],
                    capacity:200
                },
                 {
                     name:"Ali",
                personId : ".0.2.1.1.0",
                     tasks :[],
                capacity:100
                 },
                  {
                      name:"Reza",
                    personId : ".0.2.2.1.0",
                      tasks :[],
                           capacity:300,
                 },
                {
                    name:"Milad",
                    personId : ".0.2.3.1.0",
                    tasks :[],
                    capacity:400
                },
                {
                    name:"Arman",
                    personId : ".0.2.4.1.0",
                    tasks :[],
                    capacity:400
                },
                {
                    Name:"Hamid",
                    personId : ".0.2.5.1.0",
                    tasks :[],
                    capacity:400
                },

            ],
        }
    },
    handleDrop: function(e) {
        e.target.style.background = "rgba(0, 0, 0, 0.1)";
        e.stopPropagation();

        var products = this.props.products,
            item = null,
            itemId = e.dataTransfer.getData('text/plain'),
            personId = e.dispatchMarker;
        console.log(personId);

        // retrieve the item from products
        for (var i = 0; i < products.length; i++) {
            if (products[i].id == itemId) {
                item = products[i];
                // products.splice(i,1);
            }
        }
        //console.log("itemId="+itemId+"item="+JSON.stringify(item)+"personId="+personId);
        this.addItemToCart(personId,item,itemId);
    },
    addItemToCart: function(personId,item,itemId) {
        var person = this.state.Persons.find(s=>s.personId == personId);
        var totalTasks=0;
        person.tasks.forEach(function (task) {
            totalTasks+=task.timetodo;
        });
        if(totalTasks+item.timetodo<=person.capacity){
            person.tasks.push({
                personId:personId,
                title: item.title,
                itemId :itemId,
                qty: 1,
                timetodo: item.timetodo,
                id: item.id
            });
            this.updateCart();
        }
        else{
            alert("this task is too long for this person");
        }
        totalTasks=0;

       // console.log(items);

    },
    updateCart: function() {
        var Persons = this.state.Persons;
        this.setState({ Persons: Persons })
    },
    handleDragStart: function(e) {
        var target = e.target;
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', target.dataset.item);
       // console.log(target.dataset.item);

    },
    render: function() {
        var tasks = this.props.products;
        var cartItems = this.state.Persons.map(
            function iterator(item) {
                return(
                    <div className="six columns person-task">
                        <small>Name : {item.name}</small>
                        <div className="task-container">
                        <DropZone handleDrop={this.handleDrop}/>
                        <Cart key={item.personId + "01"}  items={item.tasks} capacity={item.capacity} />
                        </div>
                    </div>

                );

            },
            this
        );
        return (
            <div className="row">
                <span className="appTitle">Drag an element to add task to person</span>

                <div className="requests four columns">
                    <div className="header"><span>Requests</span></div>
                    <div>
                    <ul>{
                        tasks.map(function(item) {
                                return <Task key={item.id}
                                    item={item}
                                    handleDragStart={this.handleDragStart} />}.bind(this))
                      }</ul>
                        </div>
                </div>
                <div className="eight columns ">
                {cartItems}
                </div>

            </div>
        )
    }
});

module.exports = App;
