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
import xrpLogo from "@/assets/xrp-logo.png";
import ledgerLogo from "@/assets/ledger-logo.png.asset.json";
import dcentLogo from "@/assets/dcent-logo.png.asset.json";
import xamanLogo from "@/assets/xaman-logo.png.asset.json";
import crossmarkLogo from "@/assets/crossmark-logo.png.asset.json";
import cosmostationReal from "@/assets/cosmostation-real.png.asset.json";
import leapLogo from "@/assets/leap-logo.png.asset.json";
import vwSologenic from "@/assets/vw-sologenic.png";
import vwXrp from "@/assets/vw-xrp.png";
import keplrReal from "@/assets/keplr-real.png.asset.json";
import vwCosmostation from "@/assets/vw-cosmostation.png";
import vwMetamask from "@/assets/vw-metamask.png";
import vwCoinbase from "@/assets/vw-coinbase.png";
import vwRabby from "@/assets/vw-rabby.png";
import vwZerion from "@/assets/vw-zerion.png";

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
    <span className="flex items-center gap-2.5 font-semibold text-foreground">
      <img src={soloLogo.url} alt="Sologenic" className="size-6 rounded-full" />
      <span>sologenic <span className="font-normal text-primary">DEX</span></span>
    </span>
  );
}

function XrpMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38.28 39.16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M34.12 2.62h6.15L26.19 16.79a8.71 8.71 0 0 1-12.31 0L-.19 2.62H5.96L17.1 13.79a4.36 4.36 0 0 0 6.16 0z" />
      <path d="M5.91 36.53H-.24L13.88 22.4a8.71 8.71 0 0 1 12.31 0l14.12 14.13h-6.15L22.97 25.36a4.36 4.36 0 0 0-6.15 0z" />
    </svg>
  );
}

function ChainIcon({ tx = false }: { tx?: boolean }) {
  return tx ? (
    <img src={txLogo.url} alt="TX" className="size-14 rounded-xl object-cover" />
  ) : (
    <span className="grid size-14 place-items-center rounded-xl bg-foreground">
      <XrpMark className="size-8 text-background" />
    </span>
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
    { name: "Cosmostation", desc: "Connect using Cosmostation", icon: vwCosmostation },
    { name: "Ledger", desc: "Connect your Ledger hardware wallet", icon: ledgerLogo.url },
    { name: "MetaMask", desc: "Connect using the MetaMask EVM wallet", icon: vwMetamask },
    { name: "Coinbase Wallet", desc: "Connect using Coinbase Wallet", icon: vwCoinbase },
    { name: "Rabby Wallet", desc: "Connect using the Rabby EVM wallet", icon: vwRabby },
    { name: "Zerion Wallet", desc: "Connect using Zerion Wallet", icon: vwZerion },
  ];

  const walletOptions = walletPicker === "destination" ? [
    { name: "Cosmostation", icon: <img src={cosmostationLogo.url} alt="Cosmostation" className="size-10 rounded-lg object-cover" /> },
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
      <header className="border-b border-border/60 bg-background/95">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-5 lg:px-8">
          <BrandMark />
          <nav className="ml-12 hidden items-center gap-10 text-sm text-muted-foreground lg:flex">
            <a className="transition-colors hover:text-foreground" href="#trade">Trade</a>
            <a className="transition-colors hover:text-foreground" href="#nfts">NFTs</a>
            <a className="text-foreground" href="#bridge">Bridge</a>
            <a className="flex items-center gap-1 transition-colors hover:text-foreground" href="#tokens">Token Hub <ChevronDown className="size-3" /></a>
            <a className="flex items-center gap-1 transition-colors hover:text-foreground" href="#swap">Swap <ChevronDown className="size-3" /></a>
            <a className="flex items-center gap-1 transition-colors hover:text-foreground" href="#fiat">Fiat <ChevronDown className="size-3" /></a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" className="hidden rounded-full px-5 sm:inline-flex">Mainnet <Wifi className="ml-2 size-3.5 rotate-45 text-success" /><ChevronDown className="ml-1 size-3" /></Button>
            <Button variant="ghost" className="hidden size-10 px-0 sm:inline-flex" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((d) => !d)}>{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>
            <Button onClick={() => connect("origin")} className="h-10 px-4 text-sm sm:h-11 sm:px-5">Connect Wallet</Button>
            <div className="relative hidden sm:block">
              <Button variant="ghost" className="size-10 px-0" aria-label="Language" onClick={() => setLangOpen((open) => !open)}><Globe className="size-5" /></Button>
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
            <Button variant="ghost" className="size-10 px-0 text-primary sm:hidden" aria-label="Menu"><Menu className="size-6" /></Button>
          </div>
        </div>
      </header>

      <div className="relative mx-auto grid max-w-[1220px] gap-12 px-5 pb-16 pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:px-8 lg:pt-12">
        <div className="pointer-events-none absolute -bottom-48 -left-56 h-[520px] w-[700px] opacity-60 bridge-mesh" />
        <section className="relative z-10 min-w-0 pt-1">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-[54px]">Convert to TX</h1>
          <p className="mt-7 max-w-sm text-sm leading-6 text-muted-foreground">Convert your existing tokens to the new upgraded chain in one simple step</p>
          <div className="mt-3 flex flex-col items-start gap-2 text-sm">
            <a href="https://tx.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline"><ArrowUpRight className="size-4" />Learn more about TX</a>
            <a href="https://medium.com/@txEcosystem/sologenic-to-join-tx-token-generation-migration-and-proof-of-support-emissions-a64668add381" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline"><ArrowUpRight className="size-4" />Read conversion details</a>
          </div>
        </section>

        <section id="bridge" className="relative z-10 min-w-0 rounded-lg border border-border bg-card p-5 shadow-2xl shadow-background/40 sm:p-7">
          <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <Chain side="origin" label="Origin" name="XRP Ledger" connected={connected.origin} validated={validated.origin} onConnect={connect} onValidate={validate} />
            <div className="mt-1 hidden w-36 items-center sm:flex">
              <span className="h-px flex-1 bg-primary/45" /><span className="mx-1 h-3 w-10 rounded-[50%] border-t border-primary/70" /><span className="h-px flex-1 bg-primary/45" />
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
