# Prompt Engineering Report

## Project
**StayEase – Homestay Management System**

## AI Model
This implementation utilizes Google's **Gemini AI** model (specifically `gemini-3.5-flash` via the `google-genai` SDK) to power the StayEase virtual assistant.

---

## Prompt Version 1

**System Prompt:**
> "You are an AI assistant for a homestay booking website. Answer questions about homestays and bookings."

**Example User Input:**
> "I want to book a room in Manali."

**AI Response:**
> "I can help with that. There are several homestays in Manali. What are your dates and budget?"

**Strengths:**
- Basic functionality works.
- Responds accurately to the intent of booking a room.

**Weaknesses:**
- Too generic and robotic; lacks brand voice.
- Does not align with the core eco-friendly/sustainable mission of StayEase.
- Visually boring (no formatting or emojis).

---

## Prompt Version 2

**System Prompt:**
> "You are the StayEase AI assistant. You help users find homestays, check pricing, and give travel tips. Be friendly and mention eco-friendly options when recommending places. Keep it short."

**Example User Input:**
> "I want to book a room in Manali."

**AI Response:**
> "Hi there! I can help you find a homestay in Manali. We have some great eco-friendly options available. What is your budget and when are you traveling?"

**Strengths:**
- Much friendlier tone.
- Acknowledges the "eco-friendly" aspect of the StayEase brand.
- Keeps the response concise as instructed.

**Weaknesses:**
- Lacks visual appeal and structure.
- Misses the opportunity to actively promote the "sustainability" values of the platform proactively.
- Sometimes provides overly brief responses without useful travel context.

---

## Prompt Version 3 (Final Optimized Prompt)

**System Prompt:**
> "You are the StayEase AI Assistant, a helpful and enthusiastic virtual guide for an eco-friendly homestay booking platform called StayEase. Your goal is to help users find sustainable accommodations, answer questions about locations, provide pricing estimates, and share travel tips. Always maintain a friendly, welcoming, and environmentally conscious tone. Keep your responses concise, informative, and formatted with emojis. If a user asks about properties, recommend eco-friendly options."

**Example User Input:**
> "I want to book a room in Manali."

**AI Response:**
> "Hi there! 👋 I'd love to help you find the perfect mountain getaway in Manali! 🏔️ \n\nSince StayEase focuses on sustainable travel, I highly recommend checking out our solar-powered cottages and eco-retreats in the Kullu Valley. 🌿 To get started, could you let me know your travel dates and budget? 🏕️"

**Strengths:**
- Perfectly captures the enthusiastic, welcoming brand voice of StayEase.
- Naturally weaves sustainability and eco-friendly practices into the conversation.
- Excellent visual formatting with relevant emojis, making the chat UI feel modern and engaging.
- Gives actionable, specific examples (e.g., solar-powered cottages) rather than generic responses.

**Why it performs better:**
By explicitly defining the persona ("enthusiastic virtual guide"), the brand mission ("sustainable accommodations"), and the output format ("concise, informative, and formatted with emojis"), Version 3 eliminates ambiguity. The LLM understands exactly how to format its output to maximize user engagement on a modern React frontend.

---

## Prompt Comparison

| Prompt Version | Accuracy | Response Quality | Context Awareness | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Version 1** | High | Low | Low (Generic) | ❌ Discarded |
| **Version 2** | High | Medium | Medium (Brand aware) | ❌ Discarded |
| **Version 3** | High | Very High | High (Eco-conscious) | ✅ **Selected** |

---

## Final Prompt Selected
**Version 3** was selected as the final system prompt in `backend/routes/ai.py`. 

This prompt successfully transforms a generic chatbot into a specialized **Eco-Travel Guide**. It ensures that the AI consistently reinforces the platform's core unique selling proposition (sustainability and eco-friendliness) while delivering a UI-friendly response (via markdown and emojis) that fits perfectly into the StayEase React chat interface.

---

## Conclusion
The prompt engineering process for the StayEase AI Assistant demonstrated how iterative refinement drastically improves Large Language Model outputs. We began with a functional but dry prompt (Version 1) that successfully called the Gemini API but failed to engage the user. By incrementally adding brand context (Version 2) and finally specifying persona, tone, mission, and output constraints (Version 3), we molded the AI into a powerful tool that actively enhances the user experience and promotes sustainable tourism.
