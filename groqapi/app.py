from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq configuration
client = Groq(api_key="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")  # Use env variable in production

# Models
class ChatRequest(BaseModel):
    message: str

class HindiRequest(BaseModel):
    message: str

class AnswerItem(BaseModel):
    question: str
    answer: str

class UrgencyRequest(BaseModel):
    symptom: str
    answers: List[AnswerItem]

@app.post("/doctor/")
async def chat_completion(request: ChatRequest):
    try:
        # prompt = (
        #     f"A user reports the symptom: '{request.message}'.\n"
        #     f"Act as a Professional Senior Doctor and write a small, understandable prescription for the following symptom\n"
        #     f"Response must be in the format:\n"
        #     f"Prescription: [write prescription here in one single paragraph without using any symbols]"
        # )
        prompt = (
            f"A user has reported the following symptom: '{request.message}'.\n\n"
            f"As a highly experienced and professional senior doctor, provide a clear, concise, and understandable prescription based on the symptom.\n"
            f"Make sure the prescription is easy for a layperson to follow, avoiding technical jargon.\n"
            f"Do not include any symbols, bullet points, or lists. Write the entire prescription as a single well-structured paragraph.\n"
            f"\n"
            f"Respond strictly in the following format:\n"
            f"Prescription: [Your paragraph here]"
        )

        print("Symptom received:", request.message)

        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=1,
            max_tokens=512,
            top_p=1,
            stream=True,
            stop=None,
        )

        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""

        print("Prescription generated:\n", response)
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat/")
async def chat_completion(request: ChatRequest):
    try:
        prompt = (
            f"A user reports the symptom: '{request.message}'. "
            f"Ask 3 medically relevant follow-up questions "
            f"to determine the severity and possible causes. "
            f"Format each question as a separate line."
        )
        print("Symptom received:", request.message)

        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=1,
            max_tokens=512,
            top_p=1,
            stream=True,
            stop=None,
        )

        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""

        print("Questions generated:\n", response)
        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/urgency/")
async def evaluate_urgency(request: UrgencyRequest):
    try:
        # Construct a diagnostic prompt
        qa_pairs = "\n".join(
            f"Q: {item.question}\nA: {item.answer}" for item in request.answers
        )

        prompt = (
            f"A user reports the symptom '{request.symptom}'. Based on their answers to follow-up questions, "
            f"determine the urgency of their condition as one of the following levels: low, medium, or high.\n\n"
            f"{qa_pairs}\n\n"
            f"Based on this information:\n"
            f"1. Rate the urgency as LOW, MEDIUM, or HIGH.\n"
            f"2. Give a short, medically appropriate recommendation.\n"
            f"3. Suggest the most suitable type of medical specialist for this case.\n\n"
            f"Respond in the following format:\n"
            f"Urgency: [LOW | MEDIUM | HIGH]\n"
            f"Recommendation: [Your recommendation]\n"
            f"Specialist: [Type of doctor]"
        )
        print("Prompt for urgency evaluation:\n", prompt)

        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=3000,
            top_p=1,
            stream=True,
            stop=None,
        )

        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""

        urgency = response.strip().lower()
        print("Predicted urgency level:", urgency)

        return {"groq_response": urgency}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/urgencyhindi/")
async def evaluate_urgency(request: HindiRequest):
    try:
        # Construct a diagnostic prompt
        # qa_pairs = "\n".join(
        #     f"Q: {item.question}\nA: {item.answer}" for item in request.answers
        # )
        print("request from client",request)
        prompt = (
            f"A user reports the symptom '{request.message}'\n"
            f"Based on this information:\n"
            f"Give a short, medically appropriate recommendation and suggest the most suitable type of medical specialist for this case in hindi, do not use any english word in the response.\n\n"
            f"Respond in the following format:\n"
            f"[Your recommendation in hindi]\n"
        )
        print("Prompt for urgency evaluation:\n", prompt)

        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=3000,
            top_p=1,
            stream=True,
            stop=None,
        )

        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""

        urgency = response.strip().lower()
        print("Predicted urgency level:", urgency)

        return {"groq_response": urgency}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
