import { useState } from 'react';
import { NavbarAura } from './components/aura/NavbarAura';
import { HeroAura } from './components/aura/HeroAura';
import { SocialProof } from './components/aura/SocialProof';
import { ChaosAndOrder } from './components/aura/ChaosAndOrder';
import { InteractiveTabs } from './components/aura/InteractiveTabs';
import { BentoSimulator } from './components/aura/BentoSimulator';
import { CTASection } from './components/aura/CTASection';
import { FooterAura } from './components/aura/FooterAura';
import { FunnelController } from './components/funnel/FunnelController';

function App() {
  const [view, setView] = useState<'landing' | 'funnel'>('landing');
  const [funnelMode, setFunnelMode] = useState<'quiz' | 'report'>('quiz');

  const startFunnel = (mode: 'quiz' | 'report' = 'quiz') => {
    setFunnelMode(mode);
    setView('funnel');
  };

  if (view === 'funnel') {
    return <FunnelController onClose={() => setView('landing')} initialView={funnelMode} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-400 antialiased overflow-x-hidden relative font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-grid-pattern mask-image-gradient pointer-events-none opacity-60"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>

      <NavbarAura onStart={() => startFunnel('quiz')} />
      <HeroAura onStart={() => startFunnel('quiz')} onWaitlist={() => startFunnel('report')} />
      <SocialProof />
      <ChaosAndOrder />
      <InteractiveTabs />
      <BentoSimulator />
      <CTASection onStart={() => startFunnel('quiz')} onWaitlist={() => startFunnel('report')} />
      <FooterAura />
    </div>
  )
}

export default App;
