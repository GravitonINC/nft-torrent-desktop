## Prerequisites

- Xcode 10 or later installed on your Mac.

- An Apple Developer account.

- An app-specific password for your ADC account’s Apple ID.

- Developer ID Application. After you get the certificates, and open each so that they are installed in your keychain. It's recommended to install them in login.keychain so electron-osx-sign and electron-osx-flat could recognize them automatically for ease of looking them up.

- bin/secrets.js file

  The file includes some credentials and it is not in the source code. `bin/secrets.example` is an example of this file. In includes these parameters:

  - appleId: The username of your apple developer account.

  - appleIdPassword: The app-specific password (not your Apple ID password). How to generate a password? https://support.apple.com/en-us/HT204397

  - teamId: The team ID you want to notarize under.

## Release Process

### 1. Create a new version

- Update `AUTHORS`

  ```
  npm run update-authors
  ```

  Commit if necessary. The commit message should be "authors".

- Write the changelog

  You can use `git log --oneline <last version tag>..HEAD` to get a list of changes.

  Summarize them concisely in `CHANGELOG.md`. The commit  message should be "changelog".

- Update the version

  ```
  npm version [major|minor|patch]
  ```

  This creates both a commit and a git tag.

- Make a PR

  Once the PR is reviewed, merge it:

  ```
  git push origin <branch-name>:master
  ```

  This makes it so that the commit hash on master matches the commit hash of the version tag.

  Finally, run:

  ```
  git push --tags
  ```

### 2. Create the release binaries

- On a Mac:

  ```
  npm run package -- darwin --sign
  ```

  Move the `.zip` and `.dmg` file somewhere because the next step wipes the `dist/` folder away.

  ```
  npm run package -- linux --sign
  ```

- On Windows, or in a Windows VM:

  ```
  npm run package -- win32 --sign
  ```

- Then, upload the release binaries to Github:

  ```
  npm run gh-release
  ```

  Follow the URL to a newly created Github release page. Manually upload the binaries from
  `nft-torrent-desktop/dist/`. Open the previous release in another tab, and make sure that you
  are uploading the same set of files, no more, no less.

### 3. Test it

**This is the most important part.**

- Manually download the binaries for each platform from Github.

  **Do not use your locally built binaries.** Modern OSs treat executables differently if they've
  been downloaded, even though the files are byte for byte identical. This ensures that the
  codesigning worked and is valid.

- Smoke test NFTTorrent Desktop on each platform. Before a release, check that the following basic use cases work correctly:

  1. Click "Play" to stream a built-in torrent (e.g. Sintel)
    - Ensure that seeking to undownloaded region works and plays immediately.
    - Ensure that sintel.mp4 gets downloaded to `~/Downloads`.

  2. Check that the auto-updater works
    - Open the console and check for the line "No update available" to indicate that the auto-updater is working. (If the auto updater does not run, users will successfully auto update to this new version, and then be stuck there forever.)

  3. Add a new .torrent file via drag-and-drop.
    - Ensure that it gets added to the list and starts downloading.

  4. Remove a torrent from the client
    - Ensure that the file is removed from `~/Downloads`

  5. Create and seed a new a torrent via drag-and-drop.
    - Ensure that the torrent gets created and seeding begins.

### 4. Ship it (TBD)

- Update the current version

  TODO: Update the current version in the DB

  TODO: Endpoint to expose the v information

  TODO: Use the endpoint in the desktop app
