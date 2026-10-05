import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Globe,
  Menu,
  Moon,
  Sun,
  Wallet,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import txLogo from "@/assets/tx-logo.png.asset.json";
import soloLogo from "@/assets/sologenic-logo.png.asset.json";
import coreLogo from "@/assets/core-logo.png.asset.json";
import xrpLedgerLogo from "@/assets/xrp-ledger-logo.png.asset.json";
import xrpLogo from "@/assets/xrp-logo.png";
import ledgerLogo from "@/assets/ledger-logo.png.asset.json";
import dcentLogo from "@/assets/dcent-logo.png.asset.json";
import xamanLogo from "@/assets/xaman-logo.png.asset.json";
import crossmarkLogo from "@/assets/crossmark-logo.png.asset.json";
import keplrReal from "@/assets/keplr-real.png.asset.json";
import cosmostationReal from "@/assets/cosmostation-real.png.asset.json";
import leapLogo from "@/assets/leap-logo.png.asset.json";
import vwSologenic from "@/assets/vw-sologenic.png";
import vwXrp from "@/assets/vw-xrp.png";
import vwMetamask from "@/assets/vw-metamask.png";
import coinbaseReal from "@/assets/coinbase-real.png.asset.json";
import rabbyReal from "@/assets/rabby-real.png.asset.json";
import safepalReal from "@/assets/safepal-logo.png.asset.json";
import trustWalletLogo from "@/assets/trustwallet-logo.png.asset.json";
import walletConnectLogo from "@/assets/walletconnect-logo.svg.asset.json";
import zerionReal from "@/assets/zerion-real.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Convert to TX | Sologenic DEX" },
      { name: "description", content: "Convert existing tokens from XRP Ledger to the upgraded TX chain." },
      { property: "og:title", content: "Convert to TX | Sologenic DEX" },
      { property: "og:description", content: "Convert existing tokens from XRP Ledger to the upgraded TX chain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type WalletSide = "origin" | "destination";

function BrandMark() {
  return (
    <span className="flex shrink-0 items-center gap-2.5 font-semibold text-foreground">
      <img src={soloLogo.url} alt="Sologenic" className="size-6 rounded-full" />
      <span className="whitespace-nowrap">sologenic <span className="font-normal text-primary">DEX</span></span>
    </span>
  );
}

function ChainIcon({ tx = false }: { tx?: boolean }) {
  return tx ? (
    <img src={txLogo.url} alt="TX" className="size-14 rounded-xl object-cover" />
  ) : (
    <img src={xrpLedgerLogo.url} alt="XRP Ledger" className="size-14 rounded-xl object-cover" />
  );
}

function Index() {
  const [connected, setConnected] = useState<Record<WalletSide, boolean>>({ origin: false, destination: false });
  const [walletPicker, setWalletPicker] = useState<WalletSide | null>(null);
  const [validatePicker, setValidatePicker] = useState<WalletSide | null>(null);
  const [validated, setValidated] = useState<Record<WalletSide, boolean>>({ origin: false, destination: false });
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Trade", href: "#trade" },
    { label: "NFTs", href: "#nfts" },
    { label: "Bridge", href: "#bridge", active: true },
    { label: "Token Hub", href: "#tokens", dropdown: true },
    { label: "Swap", href: "#swap", dropdown: true },
    { label: "Fiat", href: "#fiat", dropdown: true },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  const connect = (side: WalletSide) => setWalletPicker(side);
  const chooseWallet = () => {
    if (walletPicker) setConnected((state) => ({ ...state, [walletPicker]: true }));
    setWalletPicker(null);
  };
  const validate = (side: WalletSide) => setValidatePicker(side);
  const chooseValidateWallet = () => {
    if (validatePicker) setValidated((state) => ({ ...state, [validatePicker]: true }));
    setValidatePicker(null);
  };

  const validateWallets = [
    { name: "Sologenic Wallet", desc: "Connect using the Sologenic wallet", icon: vwSologenic },
    { name: "XRP Wallet", desc: "Connect with an XRP Ledger wallet", icon: vwXrp },
    { name: "Keplr", desc: "Connect using the Keplr browser wallet", icon: keplrReal.url },
    { name: "Cosmostation", desc: "Connect using Cosmostation", icon: cosmostationReal.url },
    { name: "Ledger", desc: "Connect your Ledger hardware wallet", icon: ledgerLogo.url },
    { name: "MetaMask", desc: "Connect using the MetaMask EVM wallet", icon: vwMetamask },
    { name: "Coinbase Wallet", desc: "Connect using Coinbase Wallet", icon: coinbaseReal.url },
    { name: "Rabby Wallet", desc: "Connect using the Rabby EVM wallet", icon: rabbyReal.url },
    { name: "Zerion Wallet", desc: "Connect using Zerion Wallet", icon: zerionReal.url },
    { name: "SafePal Wallet", desc: "Connect using the SafePal wallet", icon: safepalReal.url },
    { name: "Trust Wallet", desc: "Connect using the Trust Wallet wallet", icon: trustWalletLogo.url },
    { name: "WalletConnect", desc: "Connect using the WalletConnect bridge", icon: walletConnectLogo.url },
  ];

  const walletOptions = walletPicker === "destination" ? [
    { name: "Cosmostation", icon: <img src={cosmostationReal.url} alt="Cosmostation" className="size-10 rounded-lg object-cover" /> },
    { name: "Keplr", icon: <img src={keplrReal.url} alt="Keplr" className="size-10 rounded-lg object-cover" /> },
    { name: "Leap", icon: <img src={leapLogo.url} alt="Leap" className="size-10 rounded-lg object-cover" /> },
  ] : [
    { name: "SOLO DEX", icon: <img src={soloLogo.url} alt="SOLO DEX" className="size-10 rounded-lg object-cover" /> },
    { name: "Ledger Device", icon: <img src={ledgerLogo.url} alt="Ledger Device" className="size-10 rounded-lg object-cover" /> },
    { name: "D'CENT", icon: <img src={dcentLogo.url} alt="D'CENT" className="size-10 rounded-lg object-cover" /> },
    { name: "Xaman App", icon: <img src={xamanLogo.url} alt="Xaman App" className="size-10 rounded-lg object-cover" /> },
    { name: "Crossmark", icon: <img src={crossmarkLogo.url} alt="Crossmark" className="size-10 rounded-lg object-cover" /> },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-5 sm:px-4 lg:px-8">
          <BrandMark />
          <nav className="ml-3 hidden items-center gap-2 text-xs text-muted-foreground sm:flex lg:ml-8 lg:gap-7 lg:text-sm xl:ml-10 xl:gap-8">
            {navItems.map((item) => (
              <a key={item.label} className={`flex shrink-0 items-center gap-1 whitespace-nowrap transition-colors hover:text-foreground ${item.active ? "text-foreground" : ""}`} href={item.href}>{item.label}{item.dropdown && <ChevronDown className="size-3" />}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1.5 lg:gap-3">
            <Button variant="outline" className="hidden rounded-full px-2.5 text-[13px] sm:inline-flex lg:px-4 lg:text-sm xl:px-5">Mainnet <Wifi className="ml-1.5 size-3.5 rotate-45 text-success lg:ml-2" /><ChevronDown className="ml-1 hidden size-3 lg:block" /></Button>
            <Button variant="ghost" className="hidden size-8 px-0 sm:inline-flex lg:size-10" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((d) => !d)}>{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>
            <Button onClick={() => connect("origin")} className="h-10 px-2.5 text-sm sm:h-11 lg:px-4 xl:px-5"><span className="whitespace-nowrap">Connect Wallet</span></Button>
            <div className="relative hidden lg:block">
              <Button variant="ghost" className="size-9 px-0 lg:size-10" aria-label="Language" onClick={() => setLangOpen((open) => !open)}><Globe className="size-5" /></Button>
              {langOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-40 overflow-hidden rounded-xl border border-border bg-card py-2 shadow-2xl shadow-background/60">
                  {["English", "Español", "Deutsch", "Français"].map((lang) => (
                    <button key={lang} onClick={() => { setLanguage(lang); setLangOpen(false); }} className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-secondary/60 ${language === lang ? "rounded-lg bg-secondary/60 text-foreground" : "text-muted-foreground"}`}>
                      {lang}
                      {language === lang && <span className="text-success"><Check className="size-4" /></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" className="size-10 px-0 text-primary sm:hidden" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}</Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="absolute inset-x-0 top-full z-40 border-b border-border bg-card px-5 py-3 shadow-2xl shadow-background/60 sm:hidden">
            {navItems.map((item) => (
              <a key={item.label} onClick={() => setMenuOpen(false)} className={`flex items-center justify-between border-b border-border/50 py-3 text-base last:border-0 ${item.active ? "text-foreground" : "text-muted-foreground"}`} href={item.href}>{item.label}{item.dropdown && <ChevronDown className="size-4" />}</a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <Button variant="outline" className="rounded-full px-5">Mainnet <Wifi className="ml-2 size-3.5 rotate-45 text-success" /></Button>
              <Button variant="ghost" className="size-10 px-0" aria-label="Toggle theme" onClick={() => setDark((d) => !d)}>{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>
            </div>
          </nav>
        )}
      </header>

      <div className="relative mx-auto grid max-w-[1220px] gap-12 px-5 pb-16 pt-10 md:grid-cols-[0.78fr_1.22fr] md:px-8 md:pt-12">
        <div className="pointer-events-none absolute -bottom-48 -left-56 h-[520px] w-[700px] opacity-60 bridge-mesh" />
        <section className="relative z-10 min-w-0 pt-1">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-[54px]">Convert to TX</h1>
          <p className="mt-7 max-w-sm text-sm leading-6 text-muted-foreground">Convert your existing tokens to the new upgraded chain in one simple step</p>
          <div className="mt-3 flex flex-col items-start gap-2 text-sm">
            <a href="https://tx.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline"><ArrowUpRight className="size-4" />Learn more about TX</a>
            <a href="https://medium.com/@txEcosystem/sologenic-to-join-tx-token-generation-migration-and-proof-of-support-emissions-a64668add381" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline"><ArrowUpRight className="size-4" />Read conversion details</a>
          </div>
        </section>

        <section id="bridge" className="relative z-10 min-w-0 rounded-lg border border-border bg-card p-5 shadow-2xl shadow-background/40 sm:p-7">
          <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <Chain side="origin" label="Origin" name="XRP Ledger" connected={connected.origin} validated={validated.origin} onConnect={connect} onValidate={validate} />
            <div className="relative mx-auto h-16 w-10 sm:hidden">
              <svg viewBox="0 0 40 64" fill="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="zig-v" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="0.5" stopColor="var(--primary)" stopOpacity="1" />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path d="M20 0 L6 16 L34 32 L6 48 L20 64" stroke="var(--primary)" strokeOpacity="0.22" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="blur-[3px]" />
                <path d="M20 0 L6 16 L34 32 L6 48 L20 64" stroke="url(#zig-v)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {[0, 0.8, 1.6].map((d) => (
                <span key={d} className="bridge-travel" style={{ offsetPath: 'path("M20 0 L6 16 L34 32 L6 48 L20 64")', animationDelay: `${d}s` }}>
                  <span className="block size-3 rounded-full bg-primary shadow-[0_0_16px_6px] shadow-primary/90" />
                </span>
              ))}
            </div>
            <div className="relative mt-1 hidden h-8 w-36 sm:block">
              <svg viewBox="0 0 144 32" fill="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="zig-h" x1="0" y1="0" x2="144" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="0.5" stopColor="var(--primary)" stopOpacity="1" />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path d="M0 16 L24 4 L48 28 L72 4 L96 28 L120 4 L144 16" stroke="var(--primary)" strokeOpacity="0.22" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="blur-[3px]" />
                <path d="M0 16 L24 4 L48 28 L72 4 L96 28 L120 4 L144 16" stroke="url(#zig-h)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {[0, 0.8, 1.6].map((d) => (
                <span key={d} className="bridge-travel" style={{ offsetPath: 'path("M0 16 L24 4 L48 28 L72 4 L96 28 L120 4 L144 16")', animationDelay: `${d}s` }}>
                  <span className="block size-3 rounded-full bg-primary shadow-[0_0_16px_6px] shadow-primary/90" />
                </span>
              ))}
            </div>
            <Chain side="destination" label="Destination" name="TX" tx connected={connected.destination} validated={validated.destination} onConnect={connect} onValidate={validate} />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {["SOLO", "XRP", "CORE"].map((token, index) => (
              <div key={token} className="h-24 rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">{index === 0 ? <img src={soloLogo.url} alt="SOLO" className="size-7 rounded-full" /> : index === 1 ? <img src={xrpLogo} alt="XRP" className="size-7 rounded-full" /> : <img src={coreLogo.url} alt="CORE" className="size-7 rounded-full" />}<span className="text-xs text-primary/65">Max</span></div>
                <div className="mt-4 text-sm text-muted-foreground">--</div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-xs text-muted-foreground">Destination Address</label>
            <div className="flex min-h-16 flex-col items-center justify-center gap-3 rounded-md border border-border bg-secondary/45 px-4 py-5 sm:flex-row sm:py-0">
              <img src={txLogo.url} alt="TX" className="size-9 shrink-0 rounded-md object-cover sm:mr-4 sm:size-7" />
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">Destination wallet address</span>
              <Button variant="secondary" className="shrink-0 sm:ml-3" onClick={() => connect("destination")}>{connected.destination ? "Connected" : "Connect Wallet"}</Button>
            </div>
          </div>

          <dl className="mt-8 space-y-3 text-sm">
            <InfoRow label="Estimated Time" value="2–3 minutes" />
            <InfoRow label="Min Amount" value="1 TX" />
            <InfoRow label="You Will Receive" value="0 TX" />
          </dl>
          <Button className="mt-8 h-12 w-full" onClick={() => connect("origin")}><Wallet className="mr-2 size-4" />{connected.origin ? "Wallet Connected" : "Connect Wallet"}</Button>
        </section>
      </div>

      {validatePicker && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/75 p-4" onClick={() => setValidatePicker(null)}>
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">Validate a Wallet</h2>
              <button aria-label="Close" className="-mr-1 -mt-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground" onClick={() => setValidatePicker(null)}>
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Choose a wallet to validate your {validatePicker === "destination" ? "TX" : "XRP Ledger"} address:</p>
            <div className="mt-6 flex flex-col gap-3">
              {validateWallets.map((option) => (
                <button key={option.name} onClick={chooseValidateWallet} className="flex w-full items-center gap-4 rounded-lg border border-border/60 bg-secondary/40 px-4 py-3.5 text-left transition-colors hover:bg-secondary">
                  <img src={option.icon} alt={option.name} className="size-12 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{option.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">{option.desc}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {walletPicker && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/75 p-4" onClick={() => setWalletPicker(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">Connect a Wallet</h2>
              <button aria-label="Close" className="-mr-1 -mt-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground" onClick={() => setWalletPicker(null)}>
                <X className="size-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Connect to your wallet using one of the following methods:</p>
            <div className="mt-6 flex flex-col gap-4">
              {walletOptions.map((option) => (
                <button key={option.name} onClick={chooseWallet} className="flex w-full items-center rounded-lg bg-secondary/60 px-4 py-3 transition-colors hover:bg-secondary">
                  {option.icon}
                  <span className="flex-1 text-center text-sm">{option.name}</span>
                  <span className="size-10 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Chain({ side, label, name, tx = false, connected, validated, onConnect, onValidate }: { side: WalletSide; label: string; name: string; tx?: boolean; connected: boolean; validated: boolean; onConnect: (side: WalletSide) => void; onValidate: (side: WalletSide) => void }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <span className="mb-6 text-xs text-muted-foreground">{label}</span>
      <ChainIcon tx={tx} />
      <strong className="mt-4 text-sm font-medium">{name}</strong>
      <div className="mt-4 flex w-full flex-col items-center gap-1.5">
        <Button variant="secondary" size="sm" className="w-full max-w-56 text-xs sm:text-sm" onClick={() => onConnect(side)}>{connected ? "Connected" : "Connect Wallet"}</Button>
        <Button variant="outline" size="sm" className="w-full max-w-56 text-xs sm:text-sm" onClick={() => onValidate(side)}>{validated ? "Validated" : "Validate"}</Button>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><dt className="flex items-center gap-1.5 text-muted-foreground">{label}<CircleHelp className="size-3.5" /></dt><dd className="font-medium text-foreground">{value}</dd></div>;
}
