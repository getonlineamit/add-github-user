import React from 'react';
import {render} from 'react-dom';

const Card = (props) => {
  return (
    <li className="clearfix mar-bottom-10 list-unstyled">
      <div className= "pull-left">
        <img src={props.avatar_url} width="100" height="100" />
      </div>
      <div className= "pull-left col-xs-10">
		<h4 className="text-capitalize">{props.name}</h4>
        <p className="text-capitalize">
          <mark>{props.company}</mark>
        </p>
      </div>
    </li>
  );
};

const CardList = (props) => {
	return(
		<ul style={{paddingLeft:'0'}}>
			{props.cards.map(card => <Card key={card.id} {...card}/>)}
		</ul>
	)

}

class Form extends React.Component {
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			userName: ''
		}
	}

	handleSubmit(event){
		event.preventDefault();
		console.log(this.state.userName);
		var self = this;
		fetch('https://api.github.com/users/'+ this.state.userName).then((resp) => resp.json())
			.then(function(data) {
				console.log(data);
				self.props.onSubmit(data);
			});
	};

	render() {
		return(
			<form className="form-inline mar-bottom-40" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input type="text" value={this.state.userName} className="form-control" onChange={(event)=>this.setState({userName: event.target.value})}
					placeholder="Github Username" required />
				</div>
				<button type="submit" className="btn btn-primary">Add Card</button>
			</form>
		)
	}
}

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			cards: []
		}
		this.addCard = this.addCard.bind(this);
	}
	
	addCard(eachData){
		console.log(eachData);
		this.setState((prevState, props) => {
 			return {cards: prevState.cards.concat(eachData)};
		});
	};
	
	render(){
		return(
			<div className="pad-30">
				<Form onSubmit={this.addCard} />
				<CardList cards={this.state.cards} />
			</div>
		)
	}
}

render(<App />, document.getElementById('container'));




















