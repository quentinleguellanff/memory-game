import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  
  const [cards,setCards] = useState([])
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [nbTurns,setNbTurns] = useState(0)


  const cardImages = [
    {"src" : "/images/18013.png", "found" : false},
    {"src" : "/images/18035.png", "found" : false},
    {"src" : "/images/18047.png", "found" : false},
    {"src" : "/images/18060.png", "found" : false},
    {"src" : "/images/18084.png", "found" : false},
    {"src" : "/images/18051.png", "found" : false},
  ]

  const shuffleCards = () => {
    const unShuffledCards = [...cardImages, ...cardImages]
    const shuffledCards = unShuffledCards
      .sort(() => Math.random() - 0.5)
      .map(value => ({
          ...value, id: Math.random()
      }));
    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setNbTurns(0)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src){
        setCards(cards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, found : true}
            }
            else{
              return card 
            }
          }
        ))
        resetTurn()
      }
      else {
        setTimeout(() => {
          resetTurn()
        }, 750);
      }
      setNbTurns(nbTurns+1)
    }
  },[choiceTwo])

  const handleChoice = (card) => {
    if(choiceOne === null && !card.found){
      setChoiceOne(card)
    }
    else if((choiceTwo === null) && (card.id !== choiceOne.id) && !card.found){
      setChoiceTwo(card)
    }
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  useEffect(() => {
    shuffleCards()
  },[])
  
  return (
    <div className="App">
      <div className='header'>
        <h1>ROMEM</h1>
        <button onClick={() => shuffleCards()}>New game</button>
      </div>
      <div className='board'>
        <div className='cards'>
          {cards.map(card => (
                <Card 
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.found}
                />
            ))}
        </div>
      </div>
      <p>Turns:{nbTurns}</p>
    </div>
  );
}

export default App;
