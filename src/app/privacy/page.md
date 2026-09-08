---
title: "Privacy Policy"
description: "How gofr.dev handles visitor data: what Google Tag Manager and Google Analytics collect, what is never collected, and how to opt out."
nextjs:
  metadata:
    title: "Privacy Policy"
    description: "How gofr.dev handles visitor data: what Google Tag Manager and Google Analytics collect, what is never collected, and how to opt out."
---

# Privacy Policy

_Last updated: September 2026_

gofr.dev is the documentation site for [GoFr](https://github.com/gofr-dev/gofr), an
open-source Go framework published under the Apache 2.0 licence. This page describes
what happens to your data when you read it.

The short version: there is no account, no login, and no form on this site. We collect
aggregate analytics about which pages get read, and nothing else.

## What we collect

**Analytics.** Every page loads Google Tag Manager, which in turn loads Google
Analytics. That records the page you viewed, the referring page, an approximate
location derived from your IP address, and your browser and device type. It sets
cookies in your browser to recognise a returning visit. We use it for one thing:
knowing which documentation people actually read, so we know what to improve.

**Server logs.** Requests are served from our infrastructure, which keeps standard
access logs — IP address, timestamp, requested path, user agent — for operational
troubleshooting and abuse handling.

**Error reports.** Front-end errors may be reported so we can fix broken pages. These
contain the failing page and a JavaScript stack trace, not page content you typed.

## What we do not collect

- No accounts, passwords, or authentication of any kind. There is nothing to sign in to.
- No payment information. GoFr is free and there is nothing to buy.
- No contact forms, newsletter sign-ups, or lead capture on this site.
- No advertising networks, retargeting pixels, or data brokers.
- We do not sell, rent, or share your data with third parties for their own purposes.

If you email us, or open an issue on GitHub, that correspondence is handled by the
relevant provider (our mail host, or GitHub) under their terms — not by this site.

## Cookies and how to opt out

Cookies on gofr.dev come from Google Analytics only. You can refuse them without
losing anything: the documentation is fully static and works identically with
analytics blocked.

- Enable "Do Not Track" or a tracking blocker in your browser.
- Install Google's [official opt-out add-on](https://tools.google.com/dlpage/gaoptout).
- Block cookies for `gofr.dev` in your browser's site settings.

Automated clients and AI agents fetching `.md`, `llms.txt`, or `llms-full.txt` do not
execute JavaScript, so no analytics or cookies are involved in those requests at all.

## Legal basis and your rights

If you are in the EEA or UK, our legal basis for analytics is legitimate interest in
understanding documentation usage. You have the right to access, correct, or erase
personal data we hold, and to object to processing. Because we hold no account data,
in practice this means server logs and analytics records — write to us and we will
locate and remove what we can identify.

Data is processed in the United States by Google as part of Google Analytics. Server
logs are retained for a limited operational period and then discarded.

## Children

This site is technical documentation aimed at professional software developers. It is
not directed at children, and we do not knowingly collect data from them.

## Changes to this policy

We will update this page and change the date at the top when this changes. Material
changes will be noted in the [changelog](/changelog).

## Contact

Questions about this policy, or a data request: **connect@gofr.dev**, or see the
[contact page](/contact). Security issues should follow
[our security policy](/.well-known/security.txt) instead.
