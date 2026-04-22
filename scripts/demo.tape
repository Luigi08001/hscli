# vhs tape — renders scripts/demo.sh into docs/demo.gif (and .mp4)
#
# Usage:  vhs scripts/demo.tape
#
# Produces:
#   docs/demo.gif   — for README + social embeds
#   docs/demo.mp4   — for longer-form / landing page
#
# Re-run to refresh when demo.sh changes.

Output docs/demo.gif
Output docs/demo.mp4

Set Shell "bash"
Set FontSize 14
Set Width  1400
Set Height  860
Set Theme "Catppuccin Mocha"
Set Padding 20
Set Margin 0
Set TypingSpeed 30ms
Set PlaybackSpeed 1.0

# Clear the prompt area, then run the demo script directly.
# We avoid Type/Enter for every command because demo.sh is the source of
# truth — vhs just screen-records bash executing it.
Hide
Type "clear"
Enter
Show

Type "./scripts/demo.sh"
Enter

# demo.sh runs ~50s on a warm HubSpot EU1 portal; 60s gives ~10s buffer
# on the final summary frame before the GIF loops.
Sleep 60s
