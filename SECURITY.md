# Security policy

## Reporting a vulnerability

Please do not open public issues for security vulnerabilities. Use GitHub's
[private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
("Report a vulnerability" under the Security tab) so the issue can be triaged
before disclosure.

## Notes for apps built from this template

- `EXPO_PUBLIC_*` environment variables are embedded in the shipped JS bundle —
  treat them as public. Keep secrets server-side or in
  [EAS environment variables](https://docs.expo.dev/eas/environment-variables/).
- Never commit `.env`, keystores (`*.jks`), or Apple credentials (`*.p8`,
  `*.p12`, `*.mobileprovision`) — they are gitignored by default.
