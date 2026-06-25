# Shadowdark Lights Out Theme — Foundry v14 Test Build

> [!CAUTION]
> This is an unofficial, experimental compatibility build for testing. It is
> not supported by the original author and has not been submitted to Foundry
> VTT's package directory.

This repository updates
[Shadowdark Lights Out Theme](https://github.com/ronijaakkola/foundryvtt-lights-out-theme-shadowdark)
v1.16 for private testing with:

- Foundry Virtual Tabletop v14
- Shadowdark RPG system v4

## Credit

The original module was created by **Roni "Nash" Helppi**. Its design, assets,
templates, translations, and core functionality are Nash's work.

This repository is a compatibility-maintenance build by
[@DpThought0](https://github.com/DpThought0). The changes currently focus on
Foundry v14 UI compatibility and testing fixes.

This is not an official continuation, and no endorsement or support by the
original author is implied.

See [NOTICE.md](NOTICE.md) for additional attribution.

## Current status

This build is under active testing. Expect visual bugs, compatibility issues,
and breaking changes between development versions.

Known v14 changes include:

- Updated Foundry and Shadowdark compatibility metadata.
- Native DOM handling for Foundry v14 applications.
- Updated sidebar and scene-control layouts.
- A movable, per-client macro hotbar.
- Foundry v14 placement fixes for the party and character panels.

See [TESTING.md](TESTING.md) for the current test checklist and
[CHANGELOG.md](CHANGELOG.md) for detailed changes.

## Installation for testing

In Foundry's **Add-on Modules** setup screen, click **Install Module** and
paste this Manifest URL:

```text
https://github.com/DpThought0/lights-out-shadowdark-v14/releases/latest/download/module.json
```

Alternatively, install it manually:

1. Download or clone this repository.
2. Ensure the folder is named `lights-out-shadowdark-v14-dev`.
3. Place it in `<Foundry user data>/Data/modules/`.
4. Restart Foundry.
5. Enable **Shadowdark Lights Out Theme — Foundry v14 Test Build** in a
   disposable test world.

Back up your Foundry user data before testing.

## Reporting problems

Please report compatibility-build problems in this repository rather than in
the original author's issue tracker. Include:

- Foundry build
- Shadowdark system version
- GM or player view
- Browser console errors
- A screenshot

## License

The original project and this compatibility build are distributed under the
MIT License. The original copyright and license notice are preserved in
[LICENSE](LICENSE).
