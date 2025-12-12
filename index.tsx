import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Components ---

const AuthScreen = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegistering && !name)) {
      setError("Please fill in all fields");
      return;
    }

    // Mock authentication
    const userData = {
      name: isRegistering ? name : email.split('@')[0], 
      email
    };

    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white rounded-full"></div>
           </div>
          <div className="flex justify-center mb-4 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 2"/><path d="M12 5l2.96-3"/><path d="M12 5v12.5"/><path d="M12 5c-3 0-4.5-1-4.5-3.5"/><path d="M12 5c3 0 4.5-1 4.5-3.5"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide relative z-10">HealthGuard AI</h1>
          <p className="text-blue-100 mt-2 relative z-10">Your Intelligent Medical Companion</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    placeholder="you@example.com"
                  />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    placeholder="••••••••"
                  />
                </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                 <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 hover:scale-[1.02]"
            >
              {isRegistering ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              {isRegistering ? "Already have an account? " : "New to HealthGuard? "}
              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError("");
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                {isRegistering ? "Log In" : "Register Now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Home Tab (Diagnostic Tool) ---
const HomeTab = ({ user, userProfile, onAddToHistory }: { user: any, userProfile: any, onAddToHistory: (entry: any) => void }) => {
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Location access denied or error:", error);
        }
      );
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!symptoms && !image) {
      alert("Please provide symptoms or upload an image.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const parts: any[] = [];
      
      let promptText = `Act as an advanced AI medical assistant for patient ${user.name || 'Unknown'}. 
      
      **Patient Health Profile**:
      - Age: ${userProfile.age || 'Not specified'}
      - Gender: ${userProfile.gender || 'Not specified'}
      - Blood Type: ${userProfile.bloodType || 'Not specified'}
      - Chronic Conditions: ${userProfile.conditions || 'None listed'}
      - Allergies: ${userProfile.allergies || 'None listed'}
      - Past Surgeries/Hazards: ${userProfile.hazards || 'None listed'}
      
      **Current Situation**:
      User Symptoms: "${symptoms}"
      Image Provided: ${image ? "Yes" : "No"}

      Please provide a structured response in Markdown format with the following sections:
      1. **Disclaimer**: Start with a bold disclaimer that you are an AI, this is not a medical diagnosis.
      2. **Potential Analysis**: Based on symptoms, image, and the patient's history (consider their conditions/allergies), what could be the issue?
      3. **Precautionary Advice Module**: 
         - **Immediate Actions**: What to do right now.
         - **What to Avoid**: Activities/foods to avoid (consider allergies).
         - **Doctor Visit Prep**: What to pack/write down.
         - **Questions for the Doctor**: 3-5 relevant questions.
      4. **Specialist Recommendation**: Based on the analysis, recommend what type of doctor the user should see (e.g., Orthopedist, Dermatologist). If location data is enabled, I will search for specific nearby specialists for you.

      Keep the tone professional, calm, and supportive.`;

      parts.push({ text: promptText });

      if (image) {
        const match = image.match(/^data:(.*);base64,(.*)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }

      // Configure tools
      const tools: any[] = [];
      if (location) {
        tools.push({ googleMaps: {} });
        parts[0].text += `\n\nAlso, use the Google Maps tool to find 3 highly-rated ${symptoms.toLowerCase().includes('fracture') || symptoms.toLowerCase().includes('bone') ? 'orthopedic surgeons or hospitals' : 'general practitioners or specialists'} near the user's location (${location.lat}, ${location.lng}) that can treat the potential condition.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts },
        config: {
          tools: tools.length > 0 ? tools : undefined,
          toolConfig: location ? {
            retrievalConfig: {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            }
          } : undefined
        }
      });

      let responseText = response.text || "No response generated.";
      
      // Handle Google Maps Grounding
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks && groundingChunks.length > 0) {
        let mapsSection = "\n\n### Nearby Specialists (Google Maps)\n";
        const uniqueLinks = new Set();
        
        groundingChunks.forEach((chunk: any) => {
           if (chunk.maps && chunk.maps.uri && !uniqueLinks.has(chunk.maps.uri)) {
             uniqueLinks.add(chunk.maps.uri);
             mapsSection += `* [${chunk.maps.title}](${chunk.maps.uri})\n`;
           } else if (chunk.web && chunk.web.uri && !uniqueLinks.has(chunk.web.uri)) {
             // Fallback if web chunks are returned
             uniqueLinks.add(chunk.web.uri);
             mapsSection += `* [${chunk.web.title}](${chunk.web.uri})\n`;
           }
        });
        
        if (uniqueLinks.size > 0) {
          responseText += mapsSection;
        }
      }

      setResult(responseText);
      
      // Save to history
      onAddToHistory({
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        symptoms: symptoms || "Image Analysis Only",
        result: responseText,
        hasImage: !!image
      });

    } catch (error) {
      console.error("Error generating analysis:", error);
      setResult("An error occurred while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Render Markdown Helper with Link Support
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Helper to render inline links
      const renderLineContent = (content: string) => {
        const parts = content.split(/(\[.*?\]\(.*?\))/g);
        return parts.map((part, i) => {
            const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (match) {
                return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold bg-blue-50 px-1 rounded">{match[1]} <svg className="inline w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>;
            }
            return part;
        });
      };

      if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-blue-800 flex items-center gap-2">{renderLineContent(line.replace('### ', ''))}</h3>;
      if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-900 border-b pb-2">{renderLineContent(line.replace('## ', ''))}</h2>;
      
      if (line.startsWith('**') && line.endsWith('**')) return <strong key={index} className="block mt-3 mb-1 text-gray-900">{renderLineContent(line.replace(/\*\*/g, ''))}</strong>;
      
      if (line.startsWith('* ') || line.startsWith('- ')) {
         return (
           <li key={index} className="ml-4 mb-2 text-gray-700 flex items-start gap-2">
             <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
             <span>{renderLineContent(line.replace(/^[*|-]\s/, ''))}</span>
           </li>
         );
      }
      
      if (line.match(/^\d+\./)) return <li key={index} className="ml-4 mb-2 text-gray-700 list-decimal pl-1">{renderLineContent(line.replace(/^\d+\.\s/, ''))}</li>;
      
      if (line.trim() === '') return <br key={index} />;

      return <p key={index} className="mb-2 text-gray-700 leading-relaxed">{renderLineContent(line.replace(/\*\*/g, ''))}</p>;
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 h-full">
      {/* Input Section */}
      <div className="space-y-6 flex flex-col h-full overflow-y-auto pr-2 pb-20">
        
         {/* Disclaimer Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm flex-shrink-0">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-amber-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <p className="text-sm text-amber-800 font-semibold">Medical Disclaimer</p>
              <p className="text-sm text-amber-700">This AI tool is for informational purposes only. It does not provide medical diagnosis. In case of emergency, call 911 immediately.</p>
            </div>
          </div>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-shrink-0 relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Describe Symptoms
          </h2>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none bg-gray-50"
            placeholder="E.g., I have a sharp pain in my left ankle after twisting it..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
           <div className="absolute top-6 right-6">
              {location ? (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Nearby Search Active
                </span>
              ) : (
                 <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500" title="Enable location for nearby doctors">
                  <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                  Locating...
                </span>
              )}
           </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Scan Injury / X-ray
          </h2>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${image ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            {image ? (
              <div className="relative">
                <img src={image} alt="Preview" className="max-h-32 mx-auto rounded-md shadow-sm" />
                <button 
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                  <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p className="text-xs text-gray-600">Upload image/X-ray</p>
              </div>
            )}
          </div>
        </section>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all flex-shrink-0
            ${loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02]'
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : "Analyze & Find Nearby Help"}
        </button>
      </div>

      {/* Result Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full max-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 p-4 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            AI Consultation Results
          </h2>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          {result ? (
            <div className="prose prose-blue max-w-none">
              {renderMarkdown(result)}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
              <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <p className="text-lg">Results will appear here.</p>
              <p className="text-sm mt-2">Enter symptoms to start analysis.</p>
              {location && <p className="text-xs text-green-600 mt-2 font-medium bg-green-50 px-2 py-1 rounded inline-block">Location Active: Nearby doctor search enabled</p>}
            </div>
          )}
        </div>
        {result && (
          <div className="bg-blue-50 p-4 text-xs text-blue-800 text-center border-t border-blue-100 flex-shrink-0">
            Generated by Gemini 2.5 Flash • Verify with a doctor
          </div>
        )}
      </div>
    </div>
  );
};

// --- Profile Tab ---
const ProfileTab = ({ profile, onSave }: { profile: any, onSave: (p: any) => void }) => {
  const [formData, setFormData] = useState(profile || {
    age: "",
    gender: "",
    bloodType: "",
    conditions: "",
    allergies: "",
    hazards: ""
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Personal Health Profile
          </h2>
          <p className="opacity-90 mt-1">This information helps the AI provide more accurate and personalized health advice.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Years"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
             <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               Medical History
             </h3>
             <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chronic Conditions / Past Diseases</label>
              <textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                placeholder="E.g., Diabetes, Hypertension, Asthma..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="E.g., Penicillin, Peanuts, Latex..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Surgeries & Health Hazards</label>
              <textarea
                name="hazards"
                value={formData.hazards}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                placeholder="E.g., Appendectomy (2015), Smoker, Workplace chemical exposure..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
             {isSaved && (
               <span className="text-green-600 font-medium flex items-center animate-pulse">
                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 Profile Saved!
               </span>
             )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md hover:scale-105"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- History Tab ---
const HistoryTab = ({ history }: { history: any[] }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Previous Diagnoses</h2>
      {history.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No history yet</h3>
          <p className="text-gray-500 mt-1">Your consultation history will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.date}</span>
                {item.hasImage && (
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Image included
                  </span>
                )}
              </div>
              <p className="text-gray-800 font-medium mb-2 line-clamp-1">{item.symptoms}</p>
              <p className="text-gray-500 text-sm line-clamp-3">{item.result.substring(0, 150)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// --- Placeholder Tab ---
const PlaceholderTab = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
      {icon}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-gray-500 max-w-md">This module is currently under development. Check back later for updates.</p>
  </div>
);

// --- Sidebar ---
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
    { id: 'profile', label: 'Profile', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
    { id: 'history', label: 'Prev Diagnosis', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
    { id: 'doctors', label: 'Recent Doctors', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
    { id: 'storage', label: 'Storage & Data', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /> },
    { id: 'updates', label: 'App Updates', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 2"/><path d="M12 5l2.96-3"/><path d="M12 5v12.5"/><path d="M12 5c-3 0-4.5-1-4.5-3.5"/><path d="M12 5c3 0 4.5-1 4.5-3.5"/></svg>
        </div>
        <span className="font-bold text-lg text-gray-800 tracking-tight">HealthGuard</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {item.icon}
            </svg>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-2">
         <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'settings' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
            Settings
          </button>
      </div>
    </div>
  );
};

// --- Main Dashboard ---
const Dashboard = ({ user, onLogout }: { user: any, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [history, setHistory] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>({
    age: "",
    gender: "",
    bloodType: "",
    conditions: "",
    allergies: "",
    hazards: ""
  });

  const handleAddToHistory = (entry: any) => {
    setHistory((prev) => [entry, ...prev]);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="hidden md:block h-full">
         <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm flex items-center justify-between flex-shrink-0 z-10">
          <div className="md:hidden flex items-center gap-2">
              {/* Mobile placeholder for sidebar toggle */}
             <div className="bg-blue-600 text-white p-1 rounded">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
             </div>
             <span className="font-bold text-gray-800">HealthGuard</span>
          </div>
          <div className="hidden md:block text-xl font-bold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-gray-800">{user.name}</span>
                <span className="text-xs text-gray-500">{user.email}</span>
             </div>
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {user.name.charAt(0).toUpperCase()}
             </div>
             <button onClick={onLogout} className="text-gray-500 hover:text-red-600 transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
             </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-hidden p-4 md:p-6 bg-gray-50 relative">
          <div className="h-full overflow-y-auto rounded-2xl">
            {activeTab === 'home' && <HomeTab user={user} userProfile={userProfile} onAddToHistory={handleAddToHistory} />}
            {activeTab === 'history' && <HistoryTab history={history} />}
            {activeTab === 'doctors' && <PlaceholderTab title="Recent Doctors" icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />}
            {activeTab === 'profile' && <ProfileTab profile={userProfile} onSave={setUserProfile} />}
            {activeTab === 'storage' && <PlaceholderTab title="Storage & Data" icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>} />}
            {activeTab === 'updates' && <PlaceholderTab title="App Updates" icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>} />}
            {activeTab === 'settings' && <PlaceholderTab title="Settings" icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- App Root ---
const App = () => {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
