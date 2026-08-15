# Fight Camp 12 — turn this into an Android APK

Everything here is a plain static site. No build step, no dependencies, no server code.
Put these files on GitHub Pages, feed the URL to PWABuilder, and you get a signed
Android package you can install on your phone.

```
index.html              the whole app
manifest.webmanifest    name, icons, colours Android reads at install time
sw.js                   service worker — makes it run with no signal
icons/                  192, 512, maskable and apple-touch icons
.nojekyll               stops GitHub mangling the folder
```

---

## Step 1 — Put it on GitHub Pages (about 5 minutes, free)

1. Sign in at **github.com** and click **New repository**.
2. Name it `fightcamp12`. Set it to **Public**. Click **Create repository**.
3. On the empty repo page, click **uploading an existing file**.
4. Drag in `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, and the whole
   `icons` folder. Keep the folder structure — `icons/icon-192.png` must stay inside
   `icons`. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a
   branch**, **Branch: main**, **Folder: / (root)**. Click **Save**.
6. Wait a minute, then reload that page. It shows your live address:

   `https://YOUR-USERNAME.github.io/fightcamp12/`

Open that on your phone. It already works offline from here — Chrome will offer
**Install app** in the ⋮ menu, which gives you a proper icon with no browser bar.
If all you wanted was the app on your phone, you are done.

## Step 2 — Build the APK with PWABuilder

1. Go to **pwabuilder.com**.
2. Paste your GitHub Pages address and hit **Start**.
3. It scores the site. Manifest and service worker should both pass. Click **Package for
   stores → Android**.
4. Choose the package type:
   - **Signed APK** — pick this. It installs directly on your phone.
   - *Android App Bundle* is only for uploading to the Play Store.
5. Set **Package ID** to something unique, e.g. `com.yourname.fightcamp`. Leave the rest
   as-is unless you want to change the app name.
6. Download the zip. Inside are the APK and a `signing.keystore` with its password in
   `signing-key-info.txt`.

**Keep that keystore file.** If you ever want to update the app, you must sign the new
version with the same key or Android will refuse to install over the old one.

## Step 3 — Install it on your phone

1. Move the `.apk` to your phone (email, USB, Google Drive, whatever is easiest).
2. Open it with the Files app. Android will say installs from this source are blocked —
   tap **Settings**, turn on **Allow from this source**, then go back and tap **Install**.
3. Open Fight Camp. Do the weigh-in screen once. Turn on airplane mode and check it still
   works — it will.

### Worth knowing

- **Your data lives only on the phone.** Nothing is uploaded anywhere. The app has no
  accounts, no analytics and no network calls at all.
- **Back it up.** Tap ⚙ → *Export backup file* every few weeks. If you reinstall or wipe
  the app, *Import backup file* brings your whole camp back.
- **The APK is a wrapper** around the same web app, so an update means: change
  `index.html`, bump `CACHE` in `sw.js` to `fightcamp-v2`, re-upload, and the installed
  app picks it up next time it has signal.
- **Prefer not to bother with GitHub?** The single-file version runs from your Downloads
  folder: open it in Chrome, ⋮ → *Add to Home screen*. Same app, fewer steps, slightly
  less polished icon behaviour.
