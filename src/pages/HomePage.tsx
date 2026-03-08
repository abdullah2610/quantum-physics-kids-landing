import { useEffect, useState } from 'react';
import { Share2 } from 'lucide-react';
import { CONFIG } from '../config';

const resources = [
  {
    id: 1,
    key: 'flashcards',
    emoji: CONFIG.resources.flashcards.icon,
    title: CONFIG.resources.flashcards.title,
    description: CONFIG.resources.flashcards.description,
    buttonText: CONFIG.resources.flashcards.buttonText,
    url: CONFIG.resources.flashcards.url
  },
  {
    id: 2,
    key: 'videos',
    emoji: CONFIG.resources.videos.icon,
    title: CONFIG.resources.videos.title,
    description: CONFIG.resources.videos.description,
    buttonText: CONFIG.resources.videos.buttonText,
    url: CONFIG.resources.videos.url
  },
  {
    id: 3,
    key: 'infographic',
    emoji: CONFIG.resources.infographic.icon,
    title: CONFIG.resources.infographic.title,
    description: CONFIG.resources.infographic.description,
    buttonText: CONFIG.resources.infographic.buttonText,
    url: CONFIG.resources.infographic.url
  },
  {
    id: 4,
    key: 'presentation',
    emoji: CONFIG.resources.presentation.icon,
    title: CONFIG.resources.presentation.title,
    description: CONFIG.resources.presentation.description,
    buttonText: CONFIG.resources.presentation.buttonText,
    url: CONFIG.resources.presentation.url
  },
  {
    id: 5,
    key: 'scienceLab',
    emoji: CONFIG.resources.scienceLab.icon,
    title: CONFIG.resources.scienceLab.title,
    description: CONFIG.resources.scienceLab.description,
    buttonText: CONFIG.resources.scienceLab.buttonText,
    url: CONFIG.resources.scienceLab.url
  }
];

export default function HomePage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 2000);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    const cards = document.querySelectorAll('.resource-card');
    cards.forEach((card) => observer.observe(card));

    setTimeout(() => setCardsVisible(true), 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quantum Physics for Kids - Free Resources',
          text: 'Check out these amazing free quantum physics resources!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Sharing is not supported on this device. Copy the URL to share!');
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 no-print" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: i % 2 === 0 ? '#000' : '#666',
                borderRadius: '50%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1.5 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none overflow-hidden no-print" aria-hidden="true">
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

        {[...Array(18)].map((_, i) => {
          const size = [4, 6, 8][i % 3];
          const opacity = [0.2, 0.3, 0.4, 0.5, 0.6][i % 5];
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

      <main id="main-content" className="relative z-10 px-5 py-10 max-w-[800px] mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block mb-6 animate-rotate" aria-label="Atom symbol">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="4" fill="#000" />
              <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#000" strokeWidth="2" fill="none" />
              <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#000" strokeWidth="2" fill="none" transform="rotate(60 30 30)" />
              <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#000" strokeWidth="2" fill="none" transform="rotate(120 30 30)" />
            </svg>
          </div>

          <h1 className="text-[32px] md:text-[40px] font-extrabold text-black mb-2 leading-tight">
            Quantum Physics for Kids
          </h1>

          <p className="text-[20px] md:text-[24px] font-bold text-black mb-4 flex items-center justify-center gap-2">
            Free Bonus Resources! <span role="img" aria-label="party popper">🎉</span>
          </p>

          <p className="text-base md:text-lg text-[#666] mb-6 max-w-2xl mx-auto">
            Congratulations! You've unlocked exclusive learning materials
          </p>
        </header>

        <section className="mb-12">
          <div className="text-center mb-8 text-[#666] leading-relaxed max-w-2xl mx-auto">
            <p className="mb-3">
              Thank you for reading <strong className="text-black">Quantum Physics for Kids: The Hidden World</strong>!
            </p>
            <p>
              These free resources are designed to help you explore quantum physics even deeper. Click any card below to access your bonus materials:
            </p>
          </div>

          <div className="space-y-5">
            {resources.map((resource, index) => (
              <a
                key={resource.id}
                href={resource.url}
                className="resource-card block bg-white border-2 border-black rounded-xl p-6 transition-all duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#999] focus:ring-offset-2 opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`${resource.title}: ${resource.description}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl flex-shrink-0" role="img" aria-hidden="true">
                    {resource.emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[24px] font-bold text-black mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-base text-[#666] leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-2 bg-black text-white px-5 py-2 rounded-lg font-semibold text-sm transition-transform hover:scale-105">
                    {resource.buttonText}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="text-center mb-8 no-print">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black rounded-lg font-semibold text-black hover:bg-[#F5F5F5] transition-colors focus:outline-none focus:ring-4 focus:ring-[#999] focus:ring-offset-2"
            aria-label="Share these resources"
          >
            <Share2 size={20} />
            Share These Resources
          </button>
        </div>

        <footer className="border-t-2 border-[#E5E5E5] pt-8 text-center">
          <div className="space-y-6 mb-6">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-lg blur-sm opacity-75 animate-pulse"></div>
              <div className="relative bg-white border-2 border-amber-400 rounded-lg p-6 shadow-lg">
                <p className="text-lg text-black mb-3 font-bold">
                  ⭐ Loved the book? Your review means the world! ⭐
                </p>
                <a
                  href={CONFIG.amazonReviewUrl}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold px-8 py-3 rounded-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 text-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leave a Review on Amazon
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4L14 10L7 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-sm text-[#666] mt-3">
                  It only takes 30 seconds and helps other families discover the magic of quantum physics!
                </p>
              </div>
            </div>

            <p className="text-black font-semibold text-lg">
              Coming Soon: <span className="italic">Quantum Superpowers</span> - Book 2
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-6 no-print" aria-hidden="true">
            {[4, 6, 5].map((size, i) => (
              <div
                key={i}
                className="rounded-full bg-black opacity-20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`
                }}
              />
            ))}
          </div>

          <p className="text-sm text-[#999]">
            © 2026 A. L. Umari. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
