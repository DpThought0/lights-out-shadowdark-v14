# Testing checklist

Use a disposable Shadowdark world and test as both a GM and a player.

## Startup

- The world loads without a red error notification.
- The browser console contains `Lights Out Theme v14 Dev | Ready`.
- Character and party panels appear without console errors.

## Character panel

- Assigned character name, image, level, class, title, AC, luck, and HP display.
- Clicking **Open Sheet** opens the correct actor or token sheet.
- Entering `-2`, `+2`, or an exact value in current HP updates the actor.
- Luck changes correctly in normal and pulp modes.
- Selecting one linked token as GM updates the character panel.

## Party panel

- Active assigned characters appear.
- Single-clicking a portrait selects an active token.
- Double-clicking a portrait opens its sheet.
- HP visibility respects the module setting for non-GM users.

## Foundry interface

- Hotbar, scene navigation, and player-list visibility settings work.
- Sidebar collapse/expand does not produce console errors.
- Scene controls and Shadowdark's effect panel remain usable.
- Chat, combat tracker, settings, journals, and compendiums remain readable.

## Capture when something fails

Record:

- Foundry build
- Shadowdark system version
- GM or player view
- Browser console error text
- Screenshot of the affected area
