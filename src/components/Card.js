import React from "react";

export default function Card({card, handleChoice, flipped}){
	
	const handleClick = () => {
		handleChoice(card)
	}

	return (
		<div className={flipped ? "flipped" : ""}>
			<div className='card' onClick={handleClick}>
				<img className="cardImage" src={card.src}/>
				<img className="cover" src="/images/23002.png"/>
			</div>
		</div>
	)
}