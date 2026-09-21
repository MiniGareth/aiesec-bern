# AIESEC in Bern - Website (Jekyll)

## What this is
A static Jekyll site for AIESEC in Bern: www.aiesecbern.ch
It is designed to be edited by a **non-technical moderator** through plain Markdown files with front matter -
no coding required for day-to-day content updates.

## Running locally
```
bundle install
bundle exec jekyll serve
```
Then open http://localhost:4000

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

## Site structure
- `_layouts/` - default page shell + templates for event/opportunity/testimonial detail pages
- `_includes/` - header, footer, SEO tags, reusable card components
- `_events/`, `_opportunities/`, `_testimonials/`, `_members/` - content collections
- Top-level `.html` files and `events/`, `exchanges/`, `participate/` folders - static section pages
- `assets/css/main.css` - all styling, including responsive rules
- `assets/js/main.js` - mobile nav, carousels, scroll buttons, event sorting, department lightbox
