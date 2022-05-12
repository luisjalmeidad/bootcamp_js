import "./styles.css";
import { useState, useEffect } from "react";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const AddVotes = ({ texto, position, fAddVotes, votes }) => {
  return (
    <>
      {texto !== "Not found" && (
        <>
          <button onClick={fAddVotes}> Vote </button>
          <p>
            {position >= 0 && position ? `Has ${votes} votes` : `Has 0 votes`}{" "}
          </p>
        </>
      )}
    </>
  );
};

export default function App() {
  const [message, setMessage] = useState({
    texto: "Not found",
    position: null
  });

  const [votes, setVotes] = useState([...anecdotes].fill(0));
  const [statictics, setStatictics] = useState({
    maxVote: 0,
    maxPosition: null
  });

  const changeMessage = () => {
    const position = Math.round(Math.random() * (anecdotes.length - 1));
    const texto = anecdotes[position];

    setMessage((prevMessage) => ({ ...prevMessage, texto, position }));
  };

  const addVote = () => {
    const newVotes = votes.map((vote, index) => {
      if (index === message.position) {
        return vote + 1;
      }
      return vote;
    });
    console.log("NewVotes " + newVotes);

    setVotes(newVotes);
  };

  const mostVotes = () => {
    let maxVote = 0;
    let maxPosition;
    votes.forEach((element, index) => {
      if (element > maxVote) {
        maxVote = element;
        maxPosition = index;
      }
    });

    setStatictics({ maxVote, maxPosition });
  };

  useEffect(() => {
    mostVotes();
  }, [votes]);

  useEffect(() => {
    console.log({ message, votes });
  }, [votes]);

  useEffect(() => {
    console.log({ statictics });
  }, [statictics]);

  return (
    <div className="App">
      <h1> Prhase </h1>
      <p> {message.texto} </p>

      <button onClick={changeMessage}> Change Message </button>
      <AddVotes
        texto={message.texto}
        position={message.position}
        fAddVotes={addVote}
        votes={votes[message.position]}
      />

      <h1> Anecdote with most votes </h1>

      {statictics.maxPosition >= 0 && (
        <>
          {console.log("Anecdotes: " + anecdotes[statictics.maxPosition])}
          {console.log("MaxPosition: " + statictics.maxPosition)}
          <p> {anecdotes[statictics.maxPosition]} </p>
          <p>Has {votes[statictics.maxPosition]} votes </p>
        </>
      )}
    </div>
  );
}
