# ஆங்கிலம் படிப்போம் — English Reading & Pronunciation Learning App

A 30-day English reading and pronunciation course for Tamil speakers.
React + Vite, mobile first (tested from 320px phones to desktop).

- 30-day plan with task checklists, progress and streak
- A–Z letter sounds with Tamil guides, short/long sound buttons and consonant + vowel drills
- Tap-to-hear words (with a "say it 5 times" tracker), patterns, sentences and short stories
- Listen and read quizzes with saved best scores
- Slow-speech switch; light and dark themes follow the device

Speech uses the browser's built-in English voice, so quality depends on the device.
Progress is stored in the browser's localStorage (per device).

## Run locally

```bash
npm install
npm run dev      # development server
npm run build    # production build in dist/
```

## Project layout

```
src/
  App.jsx            app shell, header, bottom tab bar, toast
  views/             Home, Plan, Day, Letters, Practice, Read
  components/        WordCard, LetterCard, Reader, SpeakButton, Icons
  data/              letters.js, days.js (30-day content), passages.js
  lib/               speech.js, progress.js (localStorage), router.js, context.js
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
