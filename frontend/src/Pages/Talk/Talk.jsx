import React, { useState,useRef } from "react";
import axios from "axios";
import "./Talk.css";

const Talk = () => {
    const [isloading,setisloading]=useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [recording, setRecording] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = useRef(null);

  const speakHindi = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "hi-IN";
    // msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
    const voices = window.speechSynthesis.getVoices();
    console.log(voices);
  };

  const startRecording = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
  
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
  
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
  
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        setisloading(true)
        try{ 
            const res = await axios.post("http://localhost:8001/transcribe/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Transcribed text: ",res.data.translated_text);
            const symptom=res.data.translated_text;
            const final = await fetch('http://localhost:8000/urgencyhindi/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: symptom }),
            });
            const info= await final.json();
            console.log("final text: ",info.groq_response);
            setResponseText(info.groq_response);
            setisloading(false)
        }catch(error){
            console.log("Transcribed Error: ",error);
            setisloading(false)
        };
  
      };
  
      mediaRecorderRef.current.start();
      setRecording(true);
    };
     const stopRecording = () => {
      mediaRecorderRef.current.stop();
      setRecording(false);
    };

  const handleTalkClick = () => {
    speakHindi("कहिए, आपको क्या बीमारी है?");
  };
  const handlePlay=()=>{
    console.log(responseText);
    speakHindi(responseText || "कहिए, आपको क्या बीमारी है?");
  }

  return (
    <div className="talk-container">
      <h2>🩺 Voice Health Assistant</h2>
      <p className="sub-text">Click to speak your symptom in Hindi</p>

      <p className='text-black' onClick={handleTalkClick}>
        {/* 🗣️ बात करें मेरे साथ  */}कहिए, आपको क्या बीमारी है?
      </p>

      <div className="flex justify-center items-center gap-6">
            {!recording ? (
              <button
                onClick={startRecording}
                className="talk-button"
              >
                🎙 Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="talk-button"
              >
                ⏹ Stop Recording
              </button>
            )}
          </div>
          {audioURL && (
            <div className="mt-6 text-center">
              <audio controls src={audioURL} className="mx-auto mb-4" />
              {/* <h3 className="text-xl text-pink-400 font-semibold m-2">Transcription:</h3>
              <p className="text-gray-200 mt-2">{transcript}</p>
              <h3 className="text-xl text-pink-400 font-semibold m-2">Prediction:</h3>
              <p className="text-gray-200 mt-2">{prediction}</p> */}
            </div>
          )}

      {isloading? 
      <p className="text-black">Loading...</p>
      :<>
      {responseText && (
        <div className="result-box fade-in text-black">
          <h3>📊 Result</h3>
          <p><strong></strong> {responseText}</p>
          <button className="specialbtn" onClick={handlePlay}>
            🎙
          </button>
        </div>
      )}</>}
    </div>
  );
};

export default Talk;
