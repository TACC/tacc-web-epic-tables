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

## Frequently Asked Questions

### Where do I put the CSV file?

Replace the appropriate CSV file in https://github.com/tacc-wbomar/tacc-web-epic-tables/tree/master/assets with the new one. Use the existing names.

### Where is the mapping from CSV to JSON?

Two build commands within https://github.com/tacc-wbomar/tacc-web-epic-tables/blob/master/package-scripts.yml.

### How do I manipulate the data from the CSV?

With functions in https://github.com/tacc-wbomar/tacc-web-epic-tables/blob/master/bin/manipulate-json.js.

## Reference

- [How To - Legacy TACC - Markup Generation Utility](https://confluence.tacc.utexas.edu/x/AYGDC)
