import React, { useState } from 'react';
import './Analysis.css'; // Assume CSS from your existing styles

const Analysis = () => {
  const [symptom, setSymptom] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [urgency, setUrgency] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [specialist, setSpecialist] = useState('');


  const handleSymptomChange = (e) => setSymptom(e.target.value);

  const getQuestions = async () => {
    setQuestions([]);
    setAnswers({});
    setUrgency('');
    setError('');
    
    if (!symptom.trim()) {
      setQuestions(['Please enter a symptom.']);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: symptom }),
      });

      const data = await res.json();

      // Split the response string into an array of questions by line breaks
      const questionArray = data.response
        .split('\n')
        .map(q => q.trim())
        .filter(q => q !== '');

      setQuestions(
        questionArray.length > 0
          ? questionArray
          : ['No further questions for this symptom.']
      );
    } catch (err) {
      console.error(err);
      setError('Sorry, there was an error. Please try again later.');
    } finally {
      setLoading(false);
    }

  };

  const handleAnswerChange = (i, value) => {
    setAnswers(prev => ({ ...prev, [i]: value }));
  };

  const checkUrgency = async () => {
  setAnalysisLoading(true);
  setUrgency('');
  setRecommendation('');
  setSpecialist('');
  setError('');

  try {
    const answerPayload = questions.map((q, i) => ({
      question: q,
      answer: answers[i] || ''
    }));

    const res = await fetch('http://localhost:8000/urgency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptom, answers: answerPayload })
    });

    const data = await res.json();
    const rawResponse = data.groq_response || '';

    // Parse the string response into separate fields
    const lines = rawResponse.split('\n').map(line => line.trim());

    for (let line of lines) {
      if (line.toLowerCase().startsWith('urgency:')) {
        setUrgency(line.split(':')[1].trim());
      } else if (line.toLowerCase().startsWith('recommendation:')) {
        setRecommendation(line.split(':')[1].trim());
      } else if (line.toLowerCase().startsWith('specialist:')) {
        setSpecialist(line.split(':')[1].trim());
      }
    }
  } catch {
    setError('Sorry, there was an error determining urgency.');
  } finally {
    setAnalysisLoading(false);
  }
};


  const getNeedleRotation = () => {
    if (urgency.includes('low')) return '-60deg';
    if (urgency.includes('medium')) return '0deg';
    if (urgency.includes('high')) return '60deg';
    return '0deg';
  };

  return (
    <div className="app-container">
      <h2>Health Checker</h2>

      <div className="input-group">
        <input
          id="symptom"
          placeholder="Enter your symptom (e.g., headache)"
          value={symptom}
          onChange={handleSymptomChange}
        />
      </div>

      <button className={`btnal ${loading ? 'pulse-animation' : ''}`} onClick={getQuestions}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a7 7 0 1 0 0 14A7 7 0 0 0 9 2zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
          <path d="M9 6a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9z"/>
          <path d="M9 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
        {loading ? 'Loading...' : 'This is the issue'}
      </button>

      <a href="/talk" style={{ display: 'block', width: '100%' }}>
        <button className="btnal btn-hindi">🗣️ बात करें मेरे साथ</button>
      </a>

      {questions.length > 0 && (
        <div id="questions" className="questions-container visible">
          {questions.map((q, i) => (
            <div key={i} className="question-item" style={{ animationDelay: `${i * 0.15}s` }}>
              {i!==0 && <>
              <p className="question-text">{q}</p>
              {!q.toLowerCase().includes('no further') && (
                <input
                  className="input-answer"
                  value={answers[i] || ''}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                />
              )}
              </>}
            </div>
          ))}

          {!questions[0]?.toLowerCase().includes('no further') && (
            <button
              className={`btnal btn-secondary ${analysisLoading ? 'pulse-animation' : ''}`}
              style={{ animationDelay: `${questions.length * 0.15}s` }}
              onClick={checkUrgency}
            >
              {analysisLoading ? 'Analyzing...' : 'Check Urgency'}
            </button>
          )}
        </div>
      )}

      {(urgency || error) && (
        <div id="urgency-indicator" className="visible">
          <h3>Urgency Level</h3>
          <div className="speedometer-container">
            <div className="speedometer">
              <div
                id="needle"
                className="needle-container"
                style={{ transform: `translateX(-50%) rotate(${getNeedleRotation()})` }}
              ></div>
            </div>
            <div className="urgency-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
            <div
              id="result"
              className={
                urgency.includes('low') ? 'urgency-level-low' :
                urgency.includes('medium') ? 'urgency-level-medium' :
                urgency.includes('high') ? 'urgency-level-high' : ''
              }
            >
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  <p><strong>Urgency:</strong> {urgency.charAt(0).toUpperCase() + urgency.slice(1)}</p>
                  <p><strong>Recommendation:</strong> {recommendation}</p>
                  <p><strong>Specialist:</strong> {specialist}</p>
                </>
              )}
            </div>

        </div>
      )}
    </div>
  );
};

export default Analysis;
