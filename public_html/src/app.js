/*
# Basic React component to load JSON from the specified endpoint
# and return each item as a card in an unordered list
#
# Class Cards:
# Loads the JSON
# Sets the state
# Instantiates a Card for each item in the JSON data
#
# Class Card:
# Accepts the cardData as a prop
# Renders a card with the values from the supplied cardData
#
#
# DOM Render: Wrap the returned li elements in a ul into the #app element
#
# @author Andy Gargan
*/
class Cards extends React.Component {

    constructor(props) {
        super(props);
        const dataSrc = 'http://prototype.carter-dev.net/fed-test/items.json';
        // create data as a state value
        this.state = { data:[] };
        // load the data from the src endpoint
        this.loadData(dataSrc);
    }

    loadData(dataSrc){
        fetch(dataSrc)
            .then(response => response.json())
            .then(data => this.setState({ data: data.items }));
    }

    render() {
        console.log(this.state.data);
        return (
            this.state.data.map(item => (
                <Card cardData={item} />
                ))
        )
    }
}

class Card extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
        <li key={this.props.cardData.id} data-category={this.props.cardData.category} className={"card" + (this.props.cardData.featured == 'true' ? ' featured' : '')} >
            <a title={this.props.cardData.link} href={this.props.cardData.link} />
            <h2>{this.props.cardData.title}</h2>
            { typeof this.props.cardData.description != 'undefined'
                ? <p>{this.props.cardData.description}</p>
                : ''
            }
            { typeof this.props.cardData.documentSize != 'undefined'
                ? <div className="card-document">PDF {this.props.cardData.documentSize}</div>
                : ''
            }
            { typeof this.props.cardData.documentSize != 'undefined'
                ? <img className="card-cta" src="assets/svg/arrow-down.svg" />
                : <img className="card-cta" src="assets/svg/arrow-right.svg" />
            }
        </li>
        )
    }
}

ReactDOM.render(
    <div className="o_cards"><ul><Cards /></ul></div>,
    document.getElementById('app')
);