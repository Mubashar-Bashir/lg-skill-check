import { ChatForm } from "@/components/ChatForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Code, Users } from 'lucide-react';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">LangGraph Level Check</h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            Assess your LangGraph knowledge and get personalized learning recommendations
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800">Start Your Assessment</CardTitle>
              <CardDescription>
                Enter your details to begin the LangGraph level check
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChatForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-800">Why Take the Level Check?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { icon: BookOpen, text: "Assess your current LangGraph knowledge" },
                  { icon: Code, text: "Get personalized learning paths" },
                  { icon: Users, text: "Compare your skills with peers" },
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <item.icon className="h-6 w-6 text-blue-500" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to elevate your LangGraph skills?</h2>
          <p className="text-xl text-blue-700 mb-6">
            Join thousands of students mastering LangGraph and building the future of AI
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="#start-assessment">
              Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <footer className="text-center text-blue-600">
          <p>&copy; {new Date().getFullYear()} LangGraph Level Check. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

