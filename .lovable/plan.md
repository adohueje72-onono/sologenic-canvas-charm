# Manual wallet connection form

## Goal
When **Connect Manually** is clicked after a wallet connection fails, replace the error view with the manual connection form shown in the reference.

## Changes
- Preserve the selected wallet and current popup while moving from the error state to a manual form state.
- Add a back control that returns to the wallet choices.
- Add an **Issue type** selector, defaulting to **Phrase**.
- Add a **Description** field with a live `0/2000` character counter and supporting instruction.
- Add a full-width red **Connect** button with a send icon.
- Match the screenshot’s dark card, red focus treatment, spacing, and typography while retaining the existing light theme and phone/tablet behavior.
- Keep this as interface-only behavior; the form will not transmit wallet credentials or recovery phrases.

## Verification
- Test: wallet choice → 5-second connection attempt → error → Connect Manually → manual form.
- Check back navigation, selector, character limit/counter, button rendering, mobile layout, and current build diagnostics.
