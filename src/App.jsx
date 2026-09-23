
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [role, setRole] = useState("");
  const [experienceLevel, setLevel] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [evaluation, setEvaluation] = useState("");

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, setLoading] = useState(false);


  // Start interview
  const handleData = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "https://aiinterviewbackend-yawl.onrender.com/interview/start",
        {
          role,
          experienceLevel,
          interviewType
        }
      );

      setQuestion(response.data.question);
      setInterviewStarted(true);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  // Submit answer
  const handleStart = async () => {

    if (!answer.trim()) {
      alert("Please enter your answer");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://aiinterviewbackend-yawl.onrender.com/interview/answer",
        {
          answer
        }
      );

      setEvaluation(response.data.evaluation);
      setQuestion(response.data.nextQuestion);

      setAnswer("");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="page">

      {/* Header */}

      <header className="header">

        <div className="logo">
          <span className="logo-icon">✦</span>
          InterviewAI
        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          AI Coach Online
        </div>

      </header>


      <main className="main">


        {/* START SCREEN */}

        {!interviewStarted && (

          <div className="welcome-section">

            <div className="welcome-content">

              <div className="ai-icon">
                ✦
              </div>

              <p className="small-title">
                AI POWERED INTERVIEW PRACTICE
              </p>

              <h1>
                Prepare for your
                <span> next interview.</span>
              </h1>

              <p className="description">
                Practice with an AI interviewer that asks questions,
                analyzes your answers and gives you useful feedback.
              </p>

            </div>


            <form
              className="setup-card"
              onSubmit={handleData}
            >

              <h2>Set up your interview</h2>

              <p className="card-description">
                Tell us a little about the interview you want to practice.
              </p>


              <label>
                Role
              </label>

              <input
                type="text"
                placeholder="e.g. Backend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />


              <label>
                Experience Level
              </label>

              <select
                value={experienceLevel}
                onChange={(e) => setLevel(e.target.value)}
                required
              >

                <option value="">
                  Select your experience
                </option>

                <option value="Fresher">
                  Fresher
                </option>

                <option value="Junior">
                  Junior
                </option>

                <option value="Mid Level">
                  Mid Level
                </option>

                <option value="Senior">
                  Senior
                </option>

              </select>


              <label>
                Interview Type
              </label>

              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                required
              >

                <option value="">
                  Select interview type
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="Mixed">
                  Mixed
                </option>

              </select>


              <button
                className="start-button"
                type="submit"
              >

                {loading ? (
                  "Preparing your interview..."
                ) : (
                  <>
                    Start Interview
                    <span>→</span>
                  </>
                )}

              </button>

            </form>

          </div>

        )}


        {/* INTERVIEW SCREEN */}

        {interviewStarted && (

          <div className="interview-page">


            {/* Interview Header */}

            <div className="interview-header">

              <div>

                <p className="small-title">
                  CURRENT INTERVIEW
                </p>

                <h1>
                  {role} Interview
                </h1>

              </div>

              <div className="live-badge">
                <span></span>
                LIVE
              </div>

            </div>


            {/* AI QUESTION */}

            <div className="question-card">

              <div className="ai-question-header">

                <div className="ai-avatar">
                  ✦
                </div>

                <div>

                  <strong>
                    AI Interviewer
                  </strong>

                  <p>
                    Take your time and answer naturally.
                  </p>

                </div>

              </div>


              <div className="question-content">

                <span className="question-number">
                  QUESTION
                </span>

                <h2>
                  {question}
                </h2>

              </div>

            </div>


            {/* ANSWER SECTION */}

            <div className="answer-card">

              <div className="answer-header">

                <div>

                  <h2>
                    Your Answer
                  </h2>

                  <p>
                    Explain your answer as you would in a real interview.
                  </p>

                </div>

                <span className="character-count">
                  {answer.length} characters
                </span>

              </div>


              <textarea
                value={answer}
                placeholder="Start typing your answer..."
                onChange={(e) => setAnswer(e.target.value)}
              />


              <div className="answer-footer">

                <span>
                  💡 Be clear and explain your thinking.
                </span>

                <button
                  className="submit-button"
                  onClick={handleStart}
                  disabled={loading}
                >

                  {loading ? (
                    "Analyzing..."
                  ) : (
                    <>
                      Submit Answer
                      <span>→</span>
                    </>
                  )}

                </button>

              </div>

            </div>


            {/* AI FEEDBACK */}

            {evaluation && (

              <div className="feedback-card">

                <div className="feedback-header">

                  <div className="feedback-icon">
                    ✓
                  </div>

                  <div>

                    <h2>
                      AI Feedback
                    </h2>

                    <p>
                      Here's how your answer performed.
                    </p>

                  </div>

                </div>


                <div className="feedback-content">

                  <pre>
                    {evaluation}
                  </pre>

                </div>

              </div>

            )}

          </div>

        )}

      </main>

    </div>

  );
}

export default App;

