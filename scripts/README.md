# `scripts/`

Helper scripts used for demos and release tasks.

## `demo.sh`

A self-contained 50-second walkthrough that:

1. Identifies the authed HubSpot portal
2. **CREATE** — 2 contacts + 1 company + 1 deal (namespaced with a unique timestamp so runs never collide)
3. **READ** — fetches each record by ID
4. **UPDATE** — patches a contact's `lifecyclestage` and closes the deal
5. **DELETE** — archives every record it created
6. **Summary** — confirms the portal is back to its prior state

Run it:

```bash
./scripts/demo.sh
```

Requirements:
- `hscli >= 0.8.1` authed against a HubSpot portal (`hscli auth whoami`).
- `jq` (`brew install jq`).

The script is safe to re-run — a `trap` guarantees every created record is archived even if the script is aborted.

## `demo.tape` → `docs/demo.gif`

[`vhs`](https://github.com/charmbracelet/vhs) tape that screen-records `demo.sh` into a GIF + MP4. To refresh the artifact in `docs/`:

```bash
brew install vhs        # one-time
vhs scripts/demo.tape
```

Output:
- `docs/demo.gif` (≈ 2.6 MB, ~58 s) — embedded in the top-level README
- `docs/demo.mp4` (≈ 1.6 MB) — for longer-form embeds / social

## Tweaking the demo

- Edit `demo.sh` to change what's demonstrated — the tape re-runs whatever it executes.
- Tune `TypingSpeed`, `Width`, `Height`, or `Theme` in `demo.tape` for a different look.
- The HubSpot search index has ~5–30 s lag for newly-created records, so the demo reads by ID (deterministic) rather than by search. Don't replace GET-by-ID with search-by-query.
