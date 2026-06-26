# Changelog

## 1.17.0-v14dev.11

- Keep the party character stack from covering Foundry's player list by
  constraining it to the open space above the player widget.
- Use a compact party-card layout when the left-side column is short.
- Anchor Foundry v14's right sidebar tab strip near the top instead of
  vertically centering it into lower UI widgets.
- Brighten muted player-list, sidebar-directory, chat-metadata, and form hint
  text that was too dark on the Lights Out background.

## 1.17.0-v14dev.10

- Correct hotbar dragging coordinates when Foundry's centered/scaled
  `#ui-middle` container is in use.
- Allow the hotbar to be dragged fully to the left and top screen edges while
  keeping the grip under the pointer.

## 1.17.0-v14dev.9

- Add a drag grip to Foundry's macro hotbar.
- Remember the hotbar position per client.
- Double-click or right-click the grip to reset the hotbar.
- Keep restored positions within the visible browser window.

## 1.17.0-v14dev.8

- Position the party panel below the last visible scene-control button rather
  than below v14's full-height scene-control container.

## 1.17.0-v14dev.7

- Correctly identify the left-side character list as the theme's own party
  panel, not a combat carousel.
- Mount the party panel in Foundry v14's left UI region and position it
  directly below the scene-control buttons.
- Remove the ineffective Crawl Helper carousel position overrides.

## 1.17.0-v14dev.6

- Correct the Crawl Helper carousel's ApplicationV2 position state instead of
  only overriding its CSS.
- Support both known carousel root identifiers and reapply alignment after
  Crawl Helper rerenders.

## 1.17.0-v14dev.5

- Enforce the Crawl Helper character carousel's left alignment after render.
- Reapply the alignment if another module restores or changes a saved
  horizontal drag position.

## 1.17.0-v14dev.4

- Align Shadowdark Crawl Helper's Lights Out character carousel with the left
  scene-control column.
- Override stale horizontal drag positions from Shadowdark Extras while
  preserving the carousel's vertical placement.

## 1.17.0-v14dev.3

- Move the macro hotbar below Combat Tracker Dock when its horizontal combat
  carousel is visible.
- Calculate the clearance from the dock's configured portrait size and aspect
  ratio so custom carousel sizing remains supported.

## 1.17.0-v14dev.2

- Restored Foundry v14's horizontal sidebar layout so the vertical tab rail no
  longer pushes chat and other sidebar content downward.

## 1.17.0-v14dev.1

- Created a separately identified local development build.
- Declared Foundry VTT 14 and Shadowdark RPG 4 compatibility.
- Removed public update and download URLs.
- Replaced jQuery-dependent UI hook handling with native DOM APIs.
- Replaced private sidebar state access with the public `expanded` API.
- Added Foundry v14 scene navigation and scene controls styling.
- Kept Shadowdark effect-panel integration optional and guarded.
- Updated ownership checks and added safer HP handling.
- Preserved the original MIT license and author attribution.
