/*
# Basic React component to load JSON from the specified endpoint
# and return each item as a card in an unordered list
#
# Constructor: Load the data and call setState to update the data value and re-render the component
# Render: Log the data and return the li elements from the array map with values
# DOM Render: Wrap the returned li elements in a ul into the #app element
#
# Improve: Abstract the card to a separate component and pass the item as a prop to the card
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
                    <li key={item.id} data-category={item.category} className={"card" + (item.featured == 'true' ? ' featured' : '')} >
                        <a title={item.link} href={item.link} />
                        <h2>{item.title}</h2>
                        { typeof item.description != 'undefined'
                            ? <p>{item.description}</p>
                            : ''
                        }
                        { typeof item.documentSize != 'undefined'
                            ? <div className="card-document">PDF {item.documentSize}</div>
                            : ''
                        }
                        { typeof item.documentSize != 'undefined'
                            ? <img className="card-cta" src="assets/svg/arrow-down.svg" />
                            : <img className="card-cta" src="assets/svg/arrow-right.svg" />
                        }
                    </li>
                ))
        )
    }
}

ReactDOM.render(
    <div className="o_cards"><ul><Cards /></ul></div>,
    document.getElementById('app')
);