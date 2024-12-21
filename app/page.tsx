import { ChatForm } from "@/components/ChatForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin } from 'lucide-react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LangGraph Proficiency Check | Panaversity',
  description: 'Assess your LangGraph skills with our AI-powered proficiency check. Get personalized insights and improve your expertise.',
};

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundBeams />

      <div className="p-4 max-w-4xl mx-auto relative z-10 w-full py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-8">
          LangGraph Proficiency <br /> Check
        </h1>

        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">
              Start AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChatForm />
          </CardContent>
        </Card>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Optimize Your LangGraph Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Quantify Skills", description: "Precise evaluation of your LangGraph proficiency." },
              { title: "Adaptive Learning", description: "AI-driven recommendations for skill enhancement." },
              { title: "Peer Benchmarking", description: "Compare your expertise with the LangGraph community." },
            ].map((item, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <footer className="w-full text-center text-neutral-400 py-6 flex flex-col items-center mt-auto">
        <p className="mb-4">
          &copy; {new Date().getFullYear()} LangGraph Proficiency Analysis. All rights reserved by Panaversity.
        </p>
        <p className="mb-0.5 text-xs font-medium">Builders:</p>
        <div className="flex flex-wrap justify-center gap-4 mb-4 relative z-10">
          {[
            { name: "Saqib Imran", url: "https://www.linkedin.com/in/saqib-imran-537759230/" },
            { name: "Zeeshan Aziz", url: "https://www.linkedin.com/in/zeeshanazizz/" },
            { name: "Muhammad Junaid", url: "https://www.linkedin.com/in/mrjunaid/" },
          ].map((profile, index) => (
            <a key={index} href={profile.url} target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-sm hover:text-blue-400 transition-colors">
              <Linkedin className="w-4 h-4 mr-1" aria-hidden="true" />
              <span className="text-xs">{profile.name}</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-neutral-500 max-w-md text-center">
          Note: This is a pilot test and should not be used for production evaluations. Results may not reflect actual proficiency levels.
        </p>
      </footer>
    </main>
  );
}
