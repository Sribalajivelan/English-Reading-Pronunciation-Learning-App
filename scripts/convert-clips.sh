#!/usr/bin/env bash
# Turn the recorder's download into app-ready clips.
#   1. Unzip letter-sound-clips.zip into a folder, e.g. ~/clips
#   2. ./scripts/convert-clips.sh ~/clips
# Result: public/audio/<id>.mp3 for every recording, plus public/audio/manifest.json.
# Needs ffmpeg. Trims leading/trailing silence and evens out the loudness so every sound is equally clear.
set -euo pipefail
src="${1:?usage: $0 <folder with recorded clips>}"
out="$(cd "$(dirname "$0")/.." && pwd)/public/audio"
mkdir -p "$out"
shopt -s nullglob
ids=()
for f in "$src"/*.webm "$src"/*.m4a "$src"/*.ogg "$src"/*.mp4 "$src"/*.wav "$src"/*.mp3; do
  id="$(basename "${f%.*}")"
  ffmpeg -y -loglevel error -i "$f" \
    -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,loudnorm=I=-18:TP=-2" \
    -ac 1 -ar 44100 -b:a 64k "$out/$id.mp3"
  ids+=("$id")
  echo "converted $id"
done
[ ${#ids[@]} -gt 0 ] || { echo "no audio files found in $src" >&2; exit 1; }
{
  echo '{ "clips": {'
  for i in "${!ids[@]}"; do
    sep=","; [ "$i" -eq $((${#ids[@]}-1)) ] && sep=""
    echo "  \"${ids[$i]}\": \"${ids[$i]}.mp3\"$sep"
  done
  echo '} }'
} > "$out/manifest.json"
echo "wrote $out/manifest.json (${#ids[@]} clips)"
