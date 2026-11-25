---
title: "Usable Auth Bench"
summary: "Empirical evaluation harness for studying friction, recovery mental models, and real-world security of modern authentication flows."
date: "Apr 10 2024"
status: "research"
role: "Lead Researcher · PhD Dissertation"
tags:
  - Usable Security
  - Authentication
  - Passkeys
  - Research
repoUrl: "https://github.com/anujgtm1"
featured: true
---

## Context

Strong cryptographic primitives routinely fail in practice when account recovery, multi-device onboarding, or error prompts push real people toward insecure workarounds.

## What it explores

Built out of my PhD research in usable security and secure authentication systems at the University of Tennessee, **Usable Auth Bench** pairs structured user-study scenarios with instrumentation to evaluate:

- Task completion friction across passwordless, passkey, and MFA enrollment flows.
- User mental models during lost-device recovery and cross-device sign-in.
- Failure-mode diagnostics where well-meaning UI copy accidentally nudges users into weaker fallback methods.

## Outcome

Demonstrated how small, clear defaults and transparent recovery affordances improve both completion rates and security posture without forcing users to read security manuals.
