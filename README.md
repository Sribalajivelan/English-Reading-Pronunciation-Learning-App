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

## Cloud sync (Firebase, optional)

Without any setup the app saves progress in the browser and offers a backup code.
To let learners sign in with Google and continue on any phone:

1. In the [Firebase console](https://console.firebase.google.com) create a project and add a **Web app**. Copy its `apiKey`, `authDomain`, `projectId` and `appId`.
2. **Authentication → Sign-in method**: enable **Google**.
3. **Authentication → Settings → Authorized domains**: add `sribalajivelan.github.io`.
4. **Firestore Database**: create a database, then paste the contents of `firestore.rules` into **Rules** and publish.
5. In this GitHub repo: **Settings → Secrets and variables → Actions → Variables**, add these four *variables*
   (they are public web settings, not secrets): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`,
   `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`.
6. Re-run the **Deploy to GitHub Pages** workflow. A "Cloud sync" card appears on the Home screen.

For local development copy `.env.example` to `.env.local` and fill in the same values.

How it works: progress is merged item by item and the newest change wins, so un-ticking a task or
resetting also carries over. Only the progress (days, tasks, ratings, quiz scores) is stored, under
`users/{uid}`; voice settings stay on each device. Rules allow a user to touch only their own document.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
