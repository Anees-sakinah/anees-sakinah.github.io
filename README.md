# Anees & Sakinah — wedding invitation

Complete static website, ready for Netlify or GitHub Pages. No build command,
package installation, API key, database, or server is required.

## Included

- index.html: invitation content, envelope, heart scratch canvas, ceremony cards,
  countdown, calendar controls, and venue map.
- styles.css: the existing colours, layout, animations, fonts, and mobile styles.
- script.js: envelope opening, music controls, scratch interaction and heart pop,
  scroll effects, countdown, and calendar downloads.
- assets/: desktop and mobile curtain artwork, floral decoration, all six fonts,
  and the uploaded Tere Sang Yaara instrumental.
- FONT-LICENSES.txt: the bundled fonts' redistribution notices.
- netlify.toml and .nojekyll: deployment configuration.

## Netlify — easiest option

1. Extract this ZIP into a folder. Open it and check that index.html is directly
   inside, alongside styles.css, script.js, and the assets folder.
2. Sign in at https://app.netlify.com/ and open https://app.netlify.com/drop.
3. Drop the folder containing index.html into the upload area.
4. Open the resulting netlify.app URL. Check the project's visibility and make
   it public so guests can open it, then test the link while signed out.

If connecting a GitHub repository to Netlify instead, leave the build command
empty and use . (the repository root) as the publish directory.

## GitHub Pages

1. Extract the ZIP and create a repository named anees-sakinah. A public
   repository supports GitHub Pages on GitHub Free.
2. Upload the extracted files and assets folder to the repository's root,
   including .nojekyll. Upload the contents, not the ZIP or an extra outer folder.
   Commit them to the main branch.
3. Open Settings > Pages. Under Build and deployment, choose Deploy from a branch.
4. Select main and /(root), then Save. Use the published address shown in Pages.

All asset paths are relative, so the site works under a GitHub repository path
as well as at the root of a Netlify domain.

## Playback and sharing

Open index.html to view locally. Music starts after tapping the envelope seal;
the round music button controls playback. This interaction supports mobile
browsers' audio playback rules. The supplied audio is preserved without a
quality-reducing re-encode.

Google Maps, directions and Google Calendar need an internet connection. The
Apple/Outlook calendar file is generated in the browser. Keep the assets folder
beside index.html when copying or uploading the website.

The export has no dependency on the original hosting address. A new host will
give you its own URL. To ensure a picture appears in social sharing previews,
after deployment change the og:image meta tag in index.html to the full public
URL of assets/palace.png on your new site; you can also add an og:url meta tag
containing your new invitation URL. These tags do not change the page design.

The design, invitation wording, animations, and music match the latest version.
Only the embedded CSS/JavaScript were moved into editable files and the old
host-specific social metadata was removed or made relative.

## Official deployment instructions

- https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
