# Analytics event specification

The measurement contract for this site: what we send, what it's called, what it
carries, and how it maps onto the legacy WordPress site's tracking so before/after
cutover comparisons are possible.

- **GTM container:** `GTM-NDXBWC` (account `31782235`, container `896050`)
- **GA4 property:** `G-7Y4FZLC5MW`
- **Google Ads:** `AW-976365590`

All three are shared with the legacy WordPress site and stay unchanged through
cutover — that continuity is what makes a before/after baseline possible at all.

---

## 1. Naming rules

1. **Use GA4's recommended event name whenever one exists.** `generate_lead`,
   `begin_checkout`, `purchase`, `page_view`, `sign_up`. These populate GA4's
   built-in funnel/ecommerce reports and import cleanly into Google Ads as
   conversions. A custom name populates nothing but a row in the events list.
2. **No brand prefix.** Not `sinclairs_generate_lead`. The property contains only
   Sinclairs data, so the prefix adds no information and forfeits rule 1.
3. **Custom names only where no standard fits** — `payment_failed` is the only
   current example, because GA4 has no recommended event for a failed payment.
   Format: lowercase `snake_case`, `verb_noun` or `noun_verb`, ≤ 40 characters.
   Deliberately *not* how we name payment initiation: that is `add_payment_info`
   (standard), not `initiating_payment` (descriptive but inert). Inventing a
   readable name where a standard exists trades real reporting for cosmetics.
4. **Variation goes in parameters, never in the event name.** One
   `begin_checkout` with `hotel=gangtok`, never `Book_Now_Button_Click_Gangtok`.
   GA4 caps a property at 500 distinct event names, and per-entity names cannot be
   aggregated, sorted or funnelled.
5. **Parameter names** are lowercase `snake_case`; **parameter values** are
   lowercase slugs (`port-blair`, not `Port Blair`), except money and IDs.
6. **A parameter is invisible until registered** as a custom dimension in GA4.
   Registering is part of shipping the event, not a follow-up.

---

## 2. Event dictionary — all implemented in code

### `generate_lead` *(GA4 recommended)*
An enquiry form submission that was accepted and written to the database.

| | |
|---|---|
| Fires | `components/enquiry-form.tsx`, on transition to success state |
| Guard | Only when the server confirms `leadCaptured` — never on validation failure or a spam-guard rejection |
| Key event | Yes — this is the site's primary commercial action |

| Parameter | Type | Values |
|---|---|---|
| `hotel` | string | hotel slug, or empty for a general enquiry |
| `enquiry_type` | string | `GENERAL` \| `HOTEL` \| `WEDDING` \| `MEETINGS` |

### `begin_checkout` *(GA4 recommended)*
A guest clicked through to the STAAH booking engine. **This is a handoff, not a
booking** — reservations complete on `reservation.sinclairshotels.com`, off this
site, so our funnel ends here. Booking completion is STAAH's own tracking.

| | |
|---|---|
| Fires | `components/reservation-link.tsx` (every Book Now / Check Availability CTA) and `components/booking-widget.tsx` |
| Key event | Yes |

| Parameter | Type | Values |
|---|---|---|
| `cta_source` | string | `homepage_widget` \| `nav` \| `hotel_stat_bar` \| `hotel_room_card` |
| `hotel` | string | hotel slug (absent on the nav CTA, which is property-agnostic) |
| `room` | string | room name (only from `hotel_room_card`) |

### `purchase` *(GA4 recommended)*
A successful i-Pay payment, confirmed by ICICI's signed callback. **Not room
bookings** — those happen on STAAH. This covers deposits and payment links only.

| | |
|---|---|
| Fires | `components/ipay-result-tracking.tsx`, on `/ipay/result` when the stored Payment row is `SUCCESS` |
| Key event | Yes |

| Parameter | Type | Values |
|---|---|---|
| `transaction_id` | string | our `orderId` — GA4 deduplicates on this |
| `value` | number | amount, 2dp |
| `currency` | string | `INR` |
| `hotel` | string | hotel slug |

### `payment_failed` *(custom)*
Any non-success terminal payment state. No GA4 standard equivalent exists.

| Parameter | Type | Values |
|---|---|---|
| `transaction_id` | string | our `orderId` |
| `value` | number | attempted amount |
| `currency` | string | `INR` |
| `hotel` | string | hotel slug |
| `status` | string | `FAILURE` \| `ABORTED` \| `INITIATED` |

### `view_item` *(GA4 recommended)*
A hotel detail page was viewed. Makes per-property demand measurable as a metric
rather than inferred from page paths.

| | |
|---|---|
| Fires | `components/hotel-view-tracking.tsx`, mounted on `/hotels/[slug]` |
| Key event | No — funnel step |

| Parameter | Type | Values |
|---|---|---|
| `item_id` | string | hotel slug |
| `item_name` | string | hotel display name |
| `hotel` | string | hotel slug (duplicated so one dimension works across all events) |

### `form_start` *(GA4 recommended)*
First interaction with the enquiry form, fired once per mount.

| | |
|---|---|
| Fires | `components/enquiry-form.tsx`, `onFocusCapture`, guarded by a ref |
| Key event | No — exists to make abandonment calculable |

| Parameter | Type | Values |
|---|---|---|
| `hotel` | string | hotel slug, or empty |
| `enquiry_type` | string | `GENERAL` \| `HOTEL` \| `WEDDING` \| `MEETINGS` |

### `add_payment_info` *(GA4 recommended)*
The i-Pay form was submitted and the guest is being sent to ICICI.

| | |
|---|---|
| Fires | `components/ipay-form.tsx`, on submit, before redirect |
| Key event | No — funnel step |

| Parameter | Type | Values |
|---|---|---|
| `value` | number | amount entered |
| `currency` | string | `INR` |
| `hotel` | string | hotel slug |

No `transaction_id`: the order id is generated server-side, after this fires.

### `contact_click` *(custom)*
A phone or email link was clicked. **A hotel takes bookings by phone**, and those
guests never touch the enquiry form — without this they look like traffic that did
nothing. No GA4 standard event covers it.

| | |
|---|---|
| Fires | `components/contact-link.tsx`, used on hotel pages, the contact page and the footer |
| Key event | Yes |

| Parameter | Type | Values |
|---|---|---|
| `method` | string | `phone` \| `email` |
| `cta_source` | string | `hotel_page` \| `footer` \| `contact_page_reservations` \| `contact_page_sales` \| `contact_page_property` |
| `hotel` | string | hotel slug, where the link belongs to one |

### `sign_up` *(GA4 recommended)*
Newsletter subscription accepted. Replaces the legacy Ads newsletter conversion.

| | |
|---|---|
| Fires | `components/newsletter-form.tsx`, on success transition |
| Key event | Yes |

| Parameter | Type | Values |
|---|---|---|
| `method` | string | `newsletter` |

### `page_view` *(GA4 automatic — no code)*
Handled entirely by GA4 enhanced measurement, including client-side route changes
via history events. The app's own `PageViewTracker` was deleted on 2026-09-10: it
duplicated this and risked double-counted pageviews.

**Requires** "page changes based on browser history events" to be enabled in the
GA4 property. If it is off, route changes go untracked and only hard loads count.

---

## 3. Parameter registry

Register every one of these as a **custom dimension** (Admin → Custom definitions),
scope Event, or they are collected but unreportable.

| Parameter | Scope | Used by |
|---|---|---|
| `hotel` | Event | generate_lead, begin_checkout, purchase, payment_failed |
| `enquiry_type` | Event | generate_lead |
| `cta_source` | Event | begin_checkout |
| `room` | Event | begin_checkout |
| `status` | Event | payment_failed |
| `method` | Event | contact_click, sign_up |
| `item_id` / `item_name` | Event | view_item |
| `site_version` | Event | all new-site tags — see below |

`transaction_id`, `value` and `currency` are GA4 built-ins and need no registration.

### `site_version`
Set as a **GTM constant** (`nextjs`) on every tag in the `next-site-cutover`
workspace. Legacy WordPress tags don't set it, so absence identifies old data.
This costs no code change and survives cutover as a permanent marker of which
platform produced any given row.

`hotel` values are the 9 hotel slugs: `burdwan`, `darjeeling`, `dooars`,
`gangtok`, `kalimpong`, `ooty`, `port-blair`, `siliguri`, `udaipur`.

---

## 4. Legacy → new mapping

The WordPress container names events per hotel and sends no parameters, so the two
vocabularies cannot be matched — only mapped. To compare a metric across cutover,
sum the legacy column against the single new event.

| Legacy (WordPress) | New (Next.js) | Notes |
|---|---|---|
| `Reservation_button_Click` + `Book_Now_Button_Click_*` (10 separate event names) | `begin_checkout` | Legacy carries no parameters, so per-hotel comparison is only possible via those 10 names |
| Ads conversion on `/thank-you/?form=inquiry` | `generate_lead` (`enquiry_type=HOTEL`/`GENERAL`) | |
| Ads conversion on `/thank-you/?form=event` | `generate_lead` (`enquiry_type=WEDDING`/`MEETINGS`) | |
| Ads conversion on `/thank-you/?form=contact`, `?form=unit` | `generate_lead` (`enquiry_type=GENERAL`) | |
| Pageview of `pay-success` / `ipay/payment-status` | `purchase` | |
| automatic `page_view` | automatic `page_view` | Unchanged — the cleanest continuous metric across cutover |
| `AdWords Conversion Tracking Newsletter Subscription` (`signup Trigger`) | `sign_up` | |
| `TechSol - GADS - Unit Contact` (`?form=unit`) | `contact_click` / `generate_lead` | Legacy counted a form; we now also count the phone/email path directly |
| `NEW STAAH Booking Confimation` (`/thank-you-booked`) | *(none)* | Bookings complete on STAAH, off-site — not visible in this property |

**Continuity rules**
- Same GA4 property throughout, so sessions/users/engagement form one unbroken
  series and before/after is a date-range comparison.
- Add a GA4 annotation on cutover day so the step-change stays explainable later.
- Anything more granular than the table above has **no pre-cutover baseline** — it
  starts the day we go live. That's a consequence of the legacy tags carrying no
  parameters, and it is not recoverable retrospectively.

---

## 5. Funnels

Four commercial paths. Each is a GA4 funnel exploration, and each has a defined
drop-off metric — an event that exists only so a drop-off is calculable.

### Enquiry funnel *(the site's own commercial function)*

`page_view` → `view_item` → `form_start` → `generate_lead`

- **Abandonment:** `form_start − generate_lead`. Without `form_start`, a guest who
  opens the form and gives up is indistinguishable from one who never looked.
- Break down by `hotel` and `enquiry_type`.

### Booking handoff funnel

`page_view` → `view_item` → `begin_checkout` → *(STAAH, off-site)*

- Our measurement **ends at the handoff**. Reservations complete on
  `reservation.sinclairshotels.com`; booking completion is STAAH's own tracking
  and is not visible in this property.
- `view_item → begin_checkout` per `hotel` is the closest thing we have to
  per-hotel demand-to-intent conversion.

### Payment funnel

`add_payment_info` → `purchase` \| `payment_failed`

- **Abandonment:** `add_payment_info − (purchase + payment_failed)` — guests who
  reached ICICI and never came back. Invisible without the start event.
- `payment_failed` broken down by `status` separates genuine failures from
  guest-cancelled attempts.

### Newsletter

`page_view` → `sign_up`

---

## 6. GA4 configuration required

Events alone measure nothing until this is set up. All of it is Admin-side, one
time.

### Key events (conversions)

Mark as key events: `generate_lead`, `begin_checkout`, `purchase`,
`contact_click`, `sign_up`.

Deliberately **not** key events: `view_item`, `form_start`, `add_payment_info` —
they are funnel steps, and marking steps as conversions inflates the conversion
count and makes Ads bid on the wrong thing.

### Custom dimensions (Admin → Custom definitions, Event scope)

`hotel`, `enquiry_type`, `cta_source`, `room`, `status`, `method`, `site_version`,
`item_id`, `item_name`.

Until registered, these are collected but cannot appear in any report — the single
most common way a setup like this silently half-works.

### Audiences (for remarketing)

| Audience | Definition | Use |
|---|---|---|
| Property viewers, no enquiry | `view_item` and not `generate_lead`, 30 days | Remarketing to warm interest |
| Payment abandoners | `add_payment_info` and not `purchase`, 7 days | Recovery |
| Enquired | `generate_lead`, 90 days | **Exclusion** list, so paid spend stops chasing people who already converted |
| High-intent by property | `view_item` with `property = X` | Per-property campaigns |

### Reports worth building once

1. **Per-property performance** — `view_item`, `begin_checkout`, `generate_lead`,
   `contact_click` by `hotel`. Answers "which hotels convert attention into
   demand" — unanswerable on the legacy site.
2. **Enquiry type mix** — `generate_lead` by `enquiry_type` (weddings vs meetings
   vs rooms), the split the business plans capacity around.
3. **CTA effectiveness** — `begin_checkout` by `cta_source`, i.e. whether the homepage
   widget, the nav, the stat bar or the room cards actually drive bookings.
4. **Contact method split** — `contact_click` by `method`, phone vs email, and by
   `cta_source`. Phone is a real booking path for a hotel and is otherwise invisible.
5. **Payment health** — the payment funnel above, with `payment_failed` by
   `status`.

### Also switch on

- Enhanced measurement, specifically **page changes based on browser history
  events** — this is what replaced the app's deleted PageViewTracker.
- A **GA4 annotation** on cutover day, so the step-change stays explainable.
- **Google Ads link** to the property, so the key events above import as
  conversions.

---

## 7. Per-property reporting

Every event except `sign_up` carries `hotel`, and every form and link sends
`hotel.slug` — verified, not assumed (`enquiry-form.tsx`, `booking-widget.tsx`,
`ReservationLink`, `ContactLink`). One consistent dimension value across all nine
events is what makes the table below work at all.

| Question | Event |
|---|---|
| Attention a property gets | `view_item` |
| Enquiries started for it | `form_start` |
| Enquiries completed | `generate_lead` |
| Booking click-throughs (also by `room`, by `cta_source`) | `begin_checkout` |
| Calls and emails (by `method`) | `contact_click` |
| Money collected via i-Pay | `purchase`, `payment_failed` |

The useful ratios: **views → enquiries** and **views → booking clicks**, per
property. Which properties convert attention into demand, versus which are merely
browsed. Neither is answerable on the legacy site.

### Deliberate exclusions

- **Footer contact clicks** carry no `hotel` — a toll-free number belongs to no
  single hotel. Per-property phone intent comes from hotel-page and contact-page
  clicks only.
- **`sign_up`** carries no `hotel` — the newsletter form is global.

### Comparison rules across cutover

- **Udaipur:** the legacy container treats *Udaipur* and *Udaipur Palace* as two
  properties (10 Ads tags, 9 GA4 tags — Udaipur Palace has an Ads tag but no GA4
  one). This site has a single `udaipur` slug, so any before/after comparison for
  Udaipur must **sum both legacy events**.
- **Sinclairs Yangang** appears in 1,043 migrated legacy enquiries but is not a
  property in `content/hotels`, so it will never appear in new analytics. Same
  open decision as in the data migration.
- **No per-property enquiry baseline exists.** Legacy enquiry conversions fired on
  `/thank-you/?form=…` URLs with no property parameter, so "enquiries by hotel,
  before vs after" cannot be built — that series starts at go-live. Per-property
  *Book Now* clicks do have a legacy baseline, via the ten separate event names.

---

## 8. Deliberately not tracked

Judgement calls, recorded so they aren't re-litigated:

- **Voucher views** (`/v/[token]`) — staff-issued and already visible in the admin
  dashboard. No marketing decision depends on it.
- **Gallery, lightbox, menu interactions** — the legacy container tracks these
  (11-year-old UA tags) and no one has ever acted on the data.
- **Scroll depth, outbound clicks, file downloads** — GA4 enhanced measurement
  covers these automatically. Don't hand-build them.
- **Admin/staff activity** — `staff.*` is a separate hostname with no GTM.

---

## 9. Adding a new event

1. Check GA4's recommended events list first; use that name if one fits.
2. If not, `snake_case`, no brand prefix, variation in parameters.
3. Add it to the dictionary above **before** writing the code.
4. Register any new parameter as a custom dimension in GA4.
5. Build the trigger + tag in a named GTM workspace, verify in Preview against a
   deploy, then publish.

## 10. Anti-patterns — all of these exist in the legacy container

- One event name per hotel (`Book_Now_Button_Click_Ooty` × 10) instead of one event
  with a `hotel` parameter.
- Mixed-case, inconsistent names (`Reservation_button_Click`).
- Events with no parameters, so nothing can be segmented after the fact.
- Conversions keyed to URL patterns (`/thank-you/?form=inquiry`) rather than to
  application events — the reason every legacy conversion breaks at cutover.

---

## 11. GTM asset naming convention

Two different naming problems, often confused:

- **Event names** (section 2) live in the *data*. Short, standard, few. Detail
  belongs in parameters. Rule 2's "no brand prefix" applies here and only here.
- **GTM asset names** (this section) live in the *UI*, where a human scans 50+
  rows alongside 12 years of WordPress tags. A prefix is information, not noise.

The legacy container gets this backwards: over-detailed event names, and tag names
that are inconsistent (`GA4- Reservation Button Click` vs
`GA4_Book_Now_Button_Click_Burdwan`) and entirely unfiled.

**Rules**
1. Everything we create is prefixed `SNCL - ` and filed in the GTM folder
   **`Sinclairs - New Website`**. Legacy items stay unfiled, so the Folder column
   separates the two systems at a glance and searching `SNCL` isolates ours.
2. Second segment names the asset type: `DLV -`, `CONST -`, `Trigger -`, `GA4 -`,
   `Ads -`.
3. Third segment is the machine name — the dataLayer key or the GA4 event name.
   Asset name and payload stay greppable against each other; no translation table.
4. Never encode a hotel, room or form type in an asset name. That's a parameter.

### Variables

| Name | Type | Data layer key / value |
|---|---|---|
| `SNCL - DLV - hotel` | Data Layer Variable | `hotel` |
| `SNCL - DLV - enquiry_type` | Data Layer Variable | `enquiry_type` |
| `SNCL - DLV - cta_source` | Data Layer Variable | `cta_source` |
| `SNCL - DLV - room` | Data Layer Variable | `room` |
| `SNCL - DLV - status` | Data Layer Variable | `status` |
| `SNCL - DLV - method` | Data Layer Variable | `method` |
| `SNCL - DLV - transaction_id` | Data Layer Variable | `transaction_id` |
| `SNCL - DLV - value` | Data Layer Variable | `value` |
| `SNCL - DLV - currency` | Data Layer Variable | `currency` |
| `SNCL - CONST - site_version` | Constant | `nextjs` — **not yet built** |

No `DLV - item_id` / `DLV - item_name`. The four ecommerce tags set **Send
Ecommerce data → Data Layer**, which maps the whole `ecommerce.items` array
natively; hand-mapping those fields would duplicate it and break the Item reports.

### Triggers

One Custom Event trigger per event, named for the event it matches:

`SNCL - Trigger - view_item`, `- begin_checkout`, `- add_payment_info`,
`- purchase`, `- payment_failed`, `- generate_lead`, `- form_start`, `- sign_up`,
`- contact_click`.

### Tags

One GA4 Event tag per event, `SNCL - GA4 - <event>`, firing on the matching
trigger, all with Measurement ID `G-7Y4FZLC5MW`.

| Tag | Ecommerce | Event parameters |
|---|---|---|
| `SNCL - GA4 - view_item` | Data Layer | `hotel` |
| `SNCL - GA4 - begin_checkout` | Data Layer | `hotel`, `cta_source`, `room` |
| `SNCL - GA4 - add_payment_info` | Data Layer | `hotel` |
| `SNCL - GA4 - purchase` | Data Layer | `hotel` |
| `SNCL - GA4 - payment_failed` | off | `hotel`, `transaction_id`, `value`, `currency`, `status` |
| `SNCL - GA4 - generate_lead` | off | `hotel`, `enquiry_type` |
| `SNCL - GA4 - form_start` | off | `hotel`, `enquiry_type` |
| `SNCL - GA4 - sign_up` | off | `method` |
| `SNCL - GA4 - contact_click` | off | `hotel`, `cta_source`, `method` |

`payment_failed` deliberately keeps ecommerce **off** — a failed payment must never
reach the Monetization reports.

**Outstanding:** no `Ads -` tags yet, and `site_version` is not yet on any tag. See
section 12.

### Why one tag per hotel is not needed

The ten legacy `Book Now` tags exist because the event name encoded the hotel. With
`hotel` as a parameter, one tag covers all nine properties, per-hotel breakdown
is a GA4 dimension, and adding a tenth property needs no GTM change at all.

---

## 12. Build runbook

Container edit access was granted on 2026-09-12 and steps 1-3 are done. The
workspace holds **28 changes and is deliberately unsubmitted** — the live site is
still served by container version 74.

- [x] **Container built** — 9 variables, 9 triggers, 9 GA4 tags, all filed in
      `Sinclairs - New Website`. Legacy items untouched: the import ran in Merge
      mode and reported `0 Deleted`.
- [x] **Code shipped to the repo** — events, the `ecommerce.items` payloads, and
      the `property` → `hotel` / `source` → `cta_source` rename.
- [ ] **Deploy the code** to `sinclairs-hotels.vercel.app`. Must happen *before*
      the container is published: production currently still sends the old
      `property` / `source` keys, so publishing first gives empty parameters.
- [ ] **Add `SNCL - CONST - site_version` = `nextjs`** and set it on all 9 GA4
      tags. Legacy WordPress tags don't set it, so its absence identifies old
      data — this is the mechanism that makes cutover comparison possible at all,
      and it is currently the one gap in the build.
- [ ] **GA4 admin** — register the custom dimensions (§3), mark the key events,
      confirm enhanced measurement's history-change tracking is on. Do this before
      verifying, or parameters won't appear and it looks like the tags are broken.
- [ ] **Verify in GTM Preview** against the deploy: view a hotel page, click a
      Book Now, submit a test enquiry (writes a real database row — use an obvious
      test name), click a phone link, subscribe to the newsletter. Confirm each
      event in Preview *and* in GA4 DebugView with its parameters.
- [ ] **Google Ads** — decide between importing GA4 key events into Ads
      (recommended, one source of truth) or building native `Ads -` conversion
      tags, which needs the conversion labels from the Ads account.
- [ ] **Publish the workspace.** This touches the container serving the live
      WordPress site, so it needs explicit sign-off, not an assumption.
- [ ] **Watch for 24-48h** that the legacy site's own conversions still report.
- [ ] **At cutover** — annotate the date in GA4, retire the legacy URL-based
      triggers that can no longer fire, and confirm conversions continue on the
      new domain.

### Known-dead legacy triggers on the new site

Recorded here because they look healthy in GTM and silently never fire, which is
easy to misdiagnose as a tracking bug:

| Legacy trigger | Why it cannot fire |
|---|---|
| `pay success Trigger` | matches `ipay/payment-status`; the route is `/ipay/result` |
| `Room Enquiry Trigger`, `Room Enquiries Thanks` | match `/thanks`; no such route |
| `New Enquiry -Thankyou-Loded`, TechSol `Event/Wedding`, `Unit Contact`, `CONTACT 84764` | hardcode `www.sinclairshotels.com/thank-you/...`; the enquiry form never navigates |
| `NEW STAAH Booking Confirmation` | matches `sinclairshotels.com/thank-you-booked` |
| 10x `Book Now Button Click - <city>`, `Reservation Button Click` | match Elementor classes `bebtn_*` / `begroup_but_reservation` |
| `accomodationbook`, `menubutton`, `reservationform`, `submenuclicks` | custom events the new site never pushes |

Two legacy tags do still fire on the new site and are pure overhead: the
Universal Analytics tag (UA is sunset) and the two jQuery Custom HTML tags, which
throw `ReferenceError: jQuery is not defined` on every page load.
