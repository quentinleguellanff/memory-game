import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Particles from "react-tsparticles"


function App() {
  
  const [cards,setCards] = useState([])
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [nbTurns,setNbTurns] = useState(0)
  const [time,setTime] = useState(0)
  const [timeFormatted,setTimeFormatted] = useState('00:00')


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
    setTimeFormatted('00:00')
    setTime(0)
  }

  function getTimeElapsedFormatted(timeElapsed){
    let min = Math.floor(timeElapsed%3600/60)
    let sec = timeElapsed%3600%60
    if(min < 10){
      min = '0'+min
    }
    if(sec < 10){
      sec = '0'+sec
    }
    setTimeFormatted(min+':'+sec)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time+1)
      getTimeElapsedFormatted(time)
    }, 1000);
    return () => clearTimeout(timer);
},[time]);

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
      <Particles />
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
      <p>{timeFormatted}</p>
    </div>
  );
}

export default App;
