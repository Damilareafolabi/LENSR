import React, { useState } from 'react';
import { sounds } from '../../services/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Key, 
  Mail, 
  Server, 
  Cpu,
  Wifi,
  Eye,
  Check
} from 'lucide-react';

interface SecuritySandboxProps {
  onBackToUniversity?: () => void;
}

export const SecuritySandbox: React.FC<SecuritySandboxProps> = ({
  onBackToUniversity
}) => {
  const [activeTab, setActiveTab] = useState<'network' | 'phishing' | 'passwords'>('network');
  
  // Network simulation state
  const [ports, setPorts] = useState<Record<number, boolean>>({
    22: true,   // SSH (Open)
    80: true,   // HTTP (Open)
    443: true,  // HTTPS (Open)
    3306: true, // MySQL Database (Open, vulnerable!)
    8080: true  // Dev Proxy (Open)
  });
  const [firewallActive, setFirewallActive] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Network defense simulator initialized.',
    '[SCAN] Scanning external IP range 192.168.1.0/24...',
    '[ALERT] Port 3306 (MySQL) is exposed to public internet! Recommend blocking via firewall.'
  ]);

  // Phishing audit state
  const [phishingFlagged, setPhishingFlagged] = useState<Record<number, boolean>>({});

  // Password entropy test state
  const [testPassword, setTestPassword] = useState<string>('Sunshine2026!');

  const handleTogglePort = (portNum: number) => {
    sounds.playDialTick();
    setPorts(prev => {
      const next = { ...prev, [portNum]: !prev[portNum] };
      const action = next[portNum] ? 'OPENED' : 'CLOSED';
      setLogs(l => [`[FIREWALL] Port ${portNum} ${action} by administrator.`, ...l]);
      return next;
    });
  };

  const handleEnableFirewall = () => {
    sounds.playSuccessChime();
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    setFirewallActive(true);
    setPorts({
      22: false, // Closed
      80: true,  // Web
      443: true, // Secure Web
      3306: false, // Protected DB!
      8080: false
    });
    setLogs(l => [
      '[SECURITY SUCCESS] Automated firewall active! Internal DB Port 3306 shielded from attacks.',
      ...l
    ]);
  };

  const sampleEmails = [
    {
      id: 1,
      sender: 'service@paypa1-security-verification.com',
      subject: 'URGENT: Your account will be locked in 15 minutes!',
      body: 'Dear customer, suspicious login detected from Moscow. Click here immediately to verify your identity.',
      isPhishing: true,
      indicators: 'Fake domain with digit "1" instead of "l", artificial urgency, unverified sender.'
    },
    {
      id: 2,
      sender: 'noreply@github.com',
      subject: 'Security alert: New SSH key added to your account',
      body: 'A new personal access token was generated from your IP. If this was you, no action is needed.',
      isPhishing: false,
      indicators: 'Legitimate domain, informational, no demands for passwords.'
    },
    {
      id: 3,
      sender: 'post-office-parcel-dispatch@track-my-package99.net',
      subject: 'Your postal package delivery failed: $1.25 custom duty required',
      body: 'Your package is awaiting release at local dispatch. Enter your credit card to authorize delivery.',
      isPhishing: true,
      indicators: 'Unsolicited delivery alert, odd tracking domain, asking for credit card for tiny fee.'
    }
  ];

  return (
    <div className="bg-[#18181B] text-zinc-200 rounded-3xl border-4 border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-extrabold text-xl text-white">
                Network & Cyber Defense Practice Room
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Live Interactive Lab
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Test ports, audit phishing scams, and calculate password crack resistance in plain English.
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('network'); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'network' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Firewall & Ports
          </button>
          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('phishing'); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'phishing' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Phishing Detective
          </button>
          <button
            onClick={() => { sounds.playDialTick(); setActiveTab('passwords'); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'passwords' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Password Strength
          </button>
        </div>
      </div>

      {/* TAB 1: FIREWALL & NETWORK PORTS */}
      {activeTab === 'network' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white uppercase tracking-wider">
                  Server Port Configuration
                </span>
                <button
                  onClick={handleEnableFirewall}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  Apply Safe Firewall Rules 🛡️
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { port: 22, name: 'SSH (Remote Server Access)', risk: 'Medium if password based' },
                  { port: 80, name: 'HTTP (Web Traffic)', risk: 'Unencrypted web' },
                  { port: 443, name: 'HTTPS (Encrypted SSL Web)', risk: 'Safe standard' },
                  { port: 3306, name: 'MySQL Database', risk: 'CRITICAL: Should never be public!' },
                  { port: 8080, name: 'Dev Test Proxy', risk: 'Internal only' }
                ].map(p => {
                  const isOpen = ports[p.port];
                  return (
                    <div
                      key={p.port}
                      className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-400">Port {p.port}</span>
                          <span className="text-xs font-semibold text-zinc-200">{p.name}</span>
                        </div>
                        <span className={`text-[10px] ${p.port === 3306 && isOpen ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                          {p.risk}
                        </span>
                      </div>

                      <button
                        onClick={() => handleTogglePort(p.port)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          isOpen ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {isOpen ? 'OPEN' : 'LOCKED'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="lg:col-span-6 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 font-mono text-xs text-zinc-300 flex flex-col justify-between">
            <div className="space-y-1 overflow-y-auto max-h-64">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-sans font-bold">
                Live Terminal Audit Stream:
              </span>
              {logs.map((log, idx) => (
                <p key={idx} className={log.includes('CRITICAL') || log.includes('ALERT') ? 'text-rose-400' : log.includes('SUCCESS') ? 'text-emerald-400' : 'text-zinc-400'}>
                  {log}
                </p>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Status: {firewallActive ? '🛡️ Hardened Enterprise Shield' : '⚠️ Unprotected Default Configuration'}</span>
              <button
                onClick={() => {
                  setPorts({ 22: true, 80: true, 443: true, 3306: true, 8080: true });
                  setFirewallActive(false);
                  setLogs(['[RESET] Network configuration reverted to default.']);
                }}
                className="text-zinc-400 hover:text-white"
              >
                Reset Lab ↻
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PHISHING DETECTIVE */}
      {activeTab === 'phishing' && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-400">
            Real phishing relies on psychological tricks rather than code. Inspect the emails below and flag which ones are scams!
          </p>

          <div className="space-y-3">
            {sampleEmails.map(email => {
              const isFlagged = phishingFlagged[email.id];
              return (
                <div
                  key={email.id}
                  className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-zinc-400 block">From: <strong className="text-zinc-200 font-mono">{email.sender}</strong></span>
                      <h4 className="font-bold text-sm text-white mt-0.5">{email.subject}</h4>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playDialTick();
                        setPhishingFlagged(prev => ({ ...prev, [email.id]: !isFlagged }));
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isFlagged ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {isFlagged ? 'Flagged as Scam 🚩' : 'Audit Email'}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-300 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800/80">
                    "{email.body}"
                  </p>

                  {isFlagged && (
                    <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                      <span>{email.isPhishing ? '✓ Correct! This is indeed a scam.' : 'Note: This email is actually legitimate.'} {email.indicators}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD ENTROPY CALCULATOR */}
      {activeTab === 'passwords' && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-xl mx-auto">
          <h4 className="font-heading font-bold text-base text-white">
            Plain English Password Entropy Simulator
          </h4>
          <p className="text-xs text-zinc-400">
            Type any sample password to see how many seconds an attacker's graphics card (GPU) would take to crack it:
          </p>

          <div>
            <input
              type="text"
              value={testPassword}
              onChange={e => setTestPassword(e.target.value)}
              className="w-full bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-700 text-white font-mono text-sm focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Length:</span>
              <strong className="text-white">{testPassword.length} characters</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Estimated Crack Time:</span>
              <strong className="text-emerald-400">
                {testPassword.length < 8 ? 'Instant (< 0.01 seconds)' : testPassword.length < 12 ? '3 hours (Weak)' : '420 Million Years (Ultra Secure!)'}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Plain English Rule:</span>
              <span className="text-zinc-300">Length beats complexity. A 4-word passphrase is 100x stronger than a short symbol string.</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Return */}
      {onBackToUniversity && (
        <div className="pt-2 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onBackToUniversity}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            ← Back to All-Access Catalog
          </button>
        </div>
      )}

    </div>
  );
};
