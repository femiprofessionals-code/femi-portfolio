# Archive

## `live-2026-10-15/`
This is the femifalade.com site as it was live on `main` before the redesign: commit `182768d`, "Logo badge for visibility, fixed-pixel headshot, root font scaling". It's an exact copy of every file on `main` at that commit.

- It's kept for reference and rollback only. It isn't built or type-checked (`tsconfig.json` excludes `archive/`), and nothing in the current site imports from it.
- **To run it on its own:** `cd archive/live-2026-10-15 && npm install && npm run dev`.
- **To roll the live site back:** deploy commit `182768d`, or restore `main` to it. Git keeps the full history either way, so this folder is a convenience copy.
