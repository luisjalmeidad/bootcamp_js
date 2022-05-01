import "./styles.css";
import { useState, useEffect } from "react";

const INITIAL_FEEDBACK = {
  bad: 0,
  neutral: 0,
  good: 0
};

const Buttons = ({
  badFeedback,
  neutralFeedback,
  goodFeedback,
  resetFeedback
}) => {
  return (
    <>
      <p>
        <button onClick={badFeedback}> Bad </button>
        <button onClick={neutralFeedback}> Neutral </button>
        <button onClick={goodFeedback}> Good </button>
      </p>

      <button onClick={resetFeedback}> Reset </button>
    </>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <>
      <li>
        {" "}
        {text === "Percent" ? `${text}: ${value}%` : `${text}: ${value}`}{" "}
      </li>
    </>
  );
};

const Statistics = ({ feedback }) => {
  const allFeedback = feedback.good + feedback.neutral + feedback.bad;
  const averageFeedback = (feedback.good - feedback.bad) / allFeedback;
  const percentFeedback = (feedback.good * 100) / allFeedback;

  return (
    <>
      <h1> Statistics </h1>
      {allFeedback !== 0 ? (
        <ul>
          <Statistic text="Bad" value={feedback.bad} />
          <Statistic text="Neutral" value={feedback.neutral} />
          <Statistic text="Good" value={feedback.good} />
          <Statistic text="All" value={allFeedback} />
          <Statistic text="Average" value={averageFeedback} />
          <Statistic text="Percent" value={percentFeedback} />
        </ul>
      ) : (
        "No feedback given"
      )}
    </>
  );
};

export default function App() {
  const [feedback, giveFeedback] = useState(INITIAL_FEEDBACK);
  const methodsFeedback = {
    badFeedback: () => {
      giveFeedback((prevFeedback) => ({
        ...prevFeedback,
        bad: prevFeedback.bad + 1
      }));
    },
    neutralFeedback: () => {
      giveFeedback((prevFeedback) => ({
        ...prevFeedback,
        neutral: prevFeedback.neutral + 1
      }));
    },
    goodFeedback: () => {
      giveFeedback((prevFeedback) => ({
        ...prevFeedback,
        good: prevFeedback.good + 1
      }));
    },
    resetFeedback: () => giveFeedback(INITIAL_FEEDBACK)
  };

  useEffect(() => {
    console.log(feedback);
  }, [feedback]);

  return (
    <div className="App">
      <Buttons action={methodsFeedback} />
      <Statistics feedback={feedback} />
    </div>
  );
}
