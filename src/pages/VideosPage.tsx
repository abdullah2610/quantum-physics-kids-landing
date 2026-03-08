import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const videos = [
  {
    id: 1,
    title: "Light's Dual Identity",
    description: "Explore the fascinating dual nature of light as both a wave and a particle. Discover how this quantum phenomenon shapes our understanding of the universe.",
    embedUrl: "https://drive.google.com/file/d/1yYnkEfF1cE3pINbF_l0Dv-iag1vCoHnx/preview",
    duration: "Educational Animation"
  },
  {
    id: 2,
    title: "Quantum World On Phone",
    description: "Journey into the quantum realm and discover how quantum mechanics powers the technology in your pocket. See quantum physics in action!",
    embedUrl: "https://drive.google.com/file/d/1RYKxTciHIWPxJa3hfcclhvRy1NGUvP1s/preview",
    duration: "Educational Animation"
  },
  {
    id: 3,
    title: "The Quantum Coin and The Cat",
    description: "Dive into the mind-bending world of quantum superposition! Learn how things can be in multiple states at once, just like Schrödinger's famous cat.",
    embedUrl: "https://drive.google.com/file/d/1H7mUC-FZettYy1cHSD4NioqJm3s24pch/preview",
    duration: "Educational Animation"
  }
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.05]" preserveAspectRatio="none">
          <pattern id="wave-pattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0,10 Q25,5 50,10 T100,10"
              stroke="#000"
              fill="none"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>

        {[...Array(12)].map((_, i) => {
          const size = [4, 6, 8][i % 3];
          const opacity = [0.2, 0.3, 0.4][i % 3];
          const animationClass = ['animate-float', 'animate-float-slow', 'animate-float-medium'][i % 3];

          return (
            <div
              key={i}
              className={`absolute rounded-full bg-black ${animationClass}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          );
        })}
      </div>

      <main className="relative z-10 px-5 py-10 max-w-[1200px] mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black hover:text-[#666] transition-colors font-semibold focus:outline-none focus:ring-4 focus:ring-[#999] focus:ring-offset-2 rounded-lg px-2 py-1"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </Link>
        </div>

        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
            <Play size={32} className="text-white ml-1" />
          </div>

          <h1 className="text-[32px] md:text-[40px] font-extrabold text-black mb-4 leading-tight">
            Animated Video Lessons
          </h1>

          <p className="text-base md:text-lg text-[#666] max-w-2xl mx-auto">
            Watch quantum physics come alive with these beautifully animated explainer videos. Complex ideas made simple and engaging!
          </p>
        </header>

        <section className="space-y-12">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="bg-white border-2 border-black rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
              style={{
                animation: 'fadeInUp 0.6s ease-out',
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="aspect-video w-full bg-[#F5F5F5] relative">
                <iframe
                  src={video.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                  title={video.title}
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-[24px] md:text-[28px] font-bold text-black">
                    {video.title}
                  </h2>
                  <span className="text-sm text-[#666] whitespace-nowrap mt-1">
                    {video.duration}
                  </span>
                </div>
                <p className="text-base text-[#666] leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <div className="mt-12 text-center">
          <p className="text-[#666] mb-6">
            Want more quantum physics content? Check out our other resources!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-[#333] transition-colors focus:outline-none focus:ring-4 focus:ring-[#999] focus:ring-offset-2"
          >
            Explore All Resources
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
