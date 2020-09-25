# TACC Website EPIC Tables

This project compiles data into templates to create markup for the body of the [EPIC Presenetations & Publications Page][epic-prespub].

[epic-prespub]: https://www.tacc.utexas.edu/epic/research/presentations-and-publications "TACC: EPIC: Research: Presenetations & Publications Page"

## Usage

1. Edit templates and data in:
    - `templates/`
    - `assets/`
2. (If not already done) Install dependencies:
    - `npm ci` (a.k.a. `rm -rf node_modules && npm install`)
3. Run build script:
    - `npm run build`
4. Confirm output in:
    - `dist/`
5. Use output.
