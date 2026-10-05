# Wallet connection feedback

## What will change
- Keep the selected wallet popup open and replace its list with a connection-in-progress view.
- Show a rotating loading indicator for five seconds with the selected wallet name.
- After five seconds, show “Error Initiating Connection,” explain that the selected wallet could not connect, and offer a “Connect Manually” button.
- Apply the same flow to every wallet in both the Connect and Validate lists.
- Allow closing the popup at any stage and safely cancel the timer.

## Verification
- Test one XRP Ledger wallet, one TX wallet, and one Validate wallet through the complete five-second flow.
- Check the phone-sized preview and confirm the page remains error-free.
