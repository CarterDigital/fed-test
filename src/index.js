import React from 'react'
import ReactDOM from 'react-dom'
import './style-main.css';
import Right from './svg/arrow-right.svg';
import Down from './svg/arrow-down.svg';
import Document from './svg/document.svg';

class Cards extends React.Component {
	constructor(props) {
		super()
		this.state = {
			cards: [],
		};
	}
	
	componentWillMount()
	{
		  fetch('http://prototype.carter-dev.net/fed-test/items.json')
		  .then(values => {
			return values.json();
		  }).then(data => {this.setState({ cards: data.items });})
		  .catch(error => {
			return error;
		  });
	  }
	  
	//after document size is found
	Doc(card){
		return <div className="pdf"><Document /><strong> PDF </strong>({card.documentSize})</div>
		}
		
	//check if document size is found	
	CheckPdf(card){
		
		if (card.documentSize)
		 {
			 return <span>{this.Doc(card)}<span className="arrow"><Down /></span></span>;
			}
		return <span className="arrow"><Right /></span>;
		}	

				
	//create card template for each card
	CardTemplate() 
	{
		const { cards } = this.state;
		console.log(this.state.cards);
		
		const displays=[]
		
		cards.map((card, index) => { 
		var featured=false;
		if (card.featured === 'true') {featured=true;}
		
		const display=<li className={"card " + (featured ? 'mastercard' : ' ')} key={card.id}>
								<a href={card.link} target="_blank">
									<div className="Cat">{card.category}</div>
									<h2>{card.title}</h2>
									<div className="meta"> {(card.description ? card.description : "")}</div>
									{this.CheckPdf(card)}                   
								</a>
					   </li>;
		displays.push(display);} );
	  	
		return (<ul className="cards">{displays}</ul>)			
	}  
	  
	render() 
	{
				
		return <div>{this.CardTemplate()}</div> 
	}
}

ReactDOM.render(<Cards />, document.getElementById('content'))