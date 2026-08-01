import os
import asyncio
import logging
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import google.generativeai as genai
from utils.rate_limit import limiter

logger = logging.getLogger("stayease.ai")

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

SYSTEM_PROMPT = """You are the StayEase AI Assistant, a helpful and enthusiastic virtual guide for an eco-friendly homestay booking platform called StayEase. 
Your goal is to help users find sustainable accommodations, answer questions about locations, provide pricing estimates, and share travel tips. 
Always maintain a friendly, welcoming, and environmentally conscious tone. Keep your responses concise, informative, and formatted with emojis.
If a user asks about properties, recommend eco-friendly options."""

@router.post("/chat", response_model=ChatResponse)
@limiter.limit("10/minute")
async def chat_with_ai(request: Request, chat_request: ChatRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY is not configured on the server.")
        raise HTTPException(status_code=500, detail="AI service is not configured. Please contact the administrator.")
    
    genai.configure(api_key=api_key)
    
    user_message = chat_request.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    try:
        model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    system_instruction=SYSTEM_PROMPT
)
        
        # Use asyncio.to_thread for synchronous SDK call to avoid blocking the event loop
        # We also implement a timeout of 10 seconds.
        async def call_gemini():
            return await asyncio.to_thread(
                model.generate_content,
                user_message
            )
        
        response = await asyncio.wait_for(call_gemini(), timeout=10.0)
        
        if not response.text:
            raise ValueError("Empty response from Gemini")
            
        return ChatResponse(response=response.text)

    except asyncio.TimeoutError:
        logger.warning("Gemini API request timed out for message: %.50s", user_message)
        raise HTTPException(status_code=504, detail="The AI service took too long to respond. Please try again.")
    except Exception as e:
        logger.error("Gemini API error: %s", str(e))
        raise HTTPException(status_code=502, detail="Failed to get a response from the AI service. Please try again later.")

