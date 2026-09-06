# AIESEC in Bern - Website (Jekyll)

## What this is
A static Jekyll site for AIESEC in Bern, built to the "AIESEC in Bern Website Build Specification (Final)".
It is designed to be edited by a **non-technical moderator** through plain Markdown files with front matter -
no coding required for day-to-day content updates.

## Running locally
```
bundle install
bundle exec jekyll serve
```
Then open http://localhost:4000

## Deploying to GitHub Pages
1. Push this repository to GitHub.
2. In the repo's Settings -> Pages, set the source to the `main` branch (or use a GitHub Actions Jekyll
   workflow if you prefer).
3. Add your custom domain under Settings -> Pages -> Custom domain, and update `url:` in `_config.yml`
   to match. Configure your DNS provider with the required CNAME/A records (see GitHub's Pages docs).

## Where to edit content (no coding needed)
- **Events**: add a new `.md` file in `_events/` (copy an existing one as a template). Filename format:
  `YYYY-MM-DD-short-title.md`. Fields: title, date, time, location, image, short_description, description,
  signup_link (optional), related_events (optional list of other event filenames without extension).
  IMPORTANT: short_description must be the literal beginning of description (copy-paste the first part).
- **Opportunities**: add a `.md` file in `_opportunities/`. Fields: name, country, entity (city/local
  committee), responsible_entity, date_start, date_range, price, image, plus the description as page body.
- **Testimonials**: add a `.md` file in `_testimonials/`. Fields: name, project_name, date,
  responsible_entity, quote (one line), images (list, first is the profile photo), related_link (optional),
  plus the full testimony as page body.
- **Members**: add a `.md` file in `_members/`. Fields: name, position, department, photo.
- **Static pages** (About Us, Contact, Participate, etc.): edit the `.html` files directly in the page's
  folder - the text is plain HTML/Markdown inside the front matter block.

## Placeholders to replace before launch
Search the codebase for "PLACEHOLDER" (case-insensitive) to find every value that needs a real
replacement, including:
- Logo file (`assets/images/logo-placeholder.svg`) and brand colors/fonts (`assets/css/main.css` `:root`)
- Office address, Instagram/LinkedIn URLs, external sign-up link (all in `_config.yml`)
- Custom domain (`_config.yml` `url:` + GitHub Pages settings + `CNAME` file, which you'll need to add)
- Real photos throughout (hero carousels, event/opportunity/testimonial/member images, OG share image)
- Real event, opportunity, testimonial, and member entries (the ones included are illustrative samples)

## Site structure
- `_layouts/` - default page shell + templates for event/opportunity/testimonial detail pages
- `_includes/` - header, footer, SEO tags, reusable card components
- `_events/`, `_opportunities/`, `_testimonials/`, `_members/` - content collections
- Top-level `.html` files and `events/`, `exchanges/`, `participate/` folders - static section pages
- `assets/css/main.css` - all styling, including responsive rules
- `assets/js/main.js` - mobile nav, carousels, scroll buttons, event sorting, department lightbox

## Notes on dynamic behavior
Upcoming vs. Past event placement is computed client-side in `main.js` by comparing each event's
`data-date` attribute to the visitor's local browser date - no server or build-time logic needed.
Available Opportunities uses native `<details>/<summary>` elements for the Country -> City/Entity ->
Opportunity accordion, which works out of the box on both desktop and mobile with no extra JS.
