import { MyAssistant } from "@/components/MyAssistant";
import { Suspense } from "react";

export default async function ChatPage(props: { params: Promise<{ threadId: string }> }) {
  const params = await props.params;
  const { threadId } = params;
  if (!threadId) {
    return null;
  }
  return (
    <>
    <main className="h-screen overflow-hidden flex">
     {/* Gemini UI Style Sidebar left bar */}
     <div className="w-64 bg-gray-200 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-400">
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="text-xl font-semibold">Gemini</h1>
            <span className="text-sm text-gray-400">1.5 Flash</span>
          </div>
          <button className="flex items-center bg-gray-700 text-white px-4 py-2 rounded mb-4">
            <i className="fas fa-plus mr-2"></i>
            New chat
          </button>
          <div>
            <h2 className="text-gray-400 mb-2">Recent</h2>
            <ul>
              <li className="flex items-center mb-2">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i>
                Quota Exceeded Error
              </li>
              <li className="flex items-center mb-2">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i>
                A Simple Greeting
              </li>
              <li className="flex items-center mb-2">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i>
                Flavor List Correction
              </li>
              <li className="flex items-center mb-2">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i>
                Excise Meeting Minutes
              </li>
              <li className="flex items-center mb-2">
                <i className="fas fa-file-alt text-gray-400 mr-2"></i>
                A Simple Greeting
              </li>
            </ul>
            <button className="text-gray-400">Show more</button>
          </div>
        </div>
        <div>
          <ul>
            <li className="flex items-center mb-2">
              <i className="fas fa-gem text-gray-400 mr-2"></i>
              Gem manager
            </li>
            <li className="flex items-center mb-2">
              <i className="fas fa-question-circle text-gray-400 mr-2"></i>
              Help
            </li>
            <li className="flex items-center mb-2">
              <i className="fas fa-history text-gray-400 mr-2"></i>
              Activity
            </li>
            <li className="flex items-center mb-2">
              <i className="fas fa-cog text-gray-400 mr-2"></i>
              Settings
            </li>
          </ul>
          <div className="text-gray-400 text-sm mt-4">
            <p>Eminabad, Gujranwala, Pakistan</p>
            <p>Based on your places (Home) • <a href="#" className="underline">Update location</a></p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
     {/* Main Content */}
     <div className="flex-1 flex flex-col justify-between p-8">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Hello, Mubashar</h1>
        </div>
        {/* <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded mb-4">
          <i className="fas fa-image mr-2"></i>
          <input type="text" placeholder="Ask Gemini" className="bg-transparent flex-1 outline-none" />
          <i className="fas fa-microphone"></i>
        </div> */}
      
      <Suspense>
        <MyAssistant threadId={threadId} />
      </Suspense>
      </div>
    </main>  

      {/* Gemini UI Style Footer */}
      <footer className="bg-gray-100 p-4">
        <h1>Powerd By GendAI Eng!</h1>
        
      </footer>
      </>
  );
}