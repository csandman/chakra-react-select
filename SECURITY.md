# Security Policy

## Supported Versions

`chakra-react-select` major versions track the major version of its peer
dependency, [`@chakra-ui/react`](https://github.com/chakra-ui/chakra-ui). The
two most recent majors receive security fixes; earlier majors are no longer
maintained.

| Version | Chakra UI peer | Supported          |
| ------- | -------------- | ------------------ |
| 6.x     | 3.x            | :white_check_mark: |
| 5.x     | 2.x            | :white_check_mark: |
| 4.x     | 2.x            | :x:                |
| < 4     | 1.x            | :x:                |

If you need a fix on an older line, please open a discussion describing the
constraint that prevents upgrading.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Report privately via
[GitHub Security Advisories](https://github.com/csandman/chakra-react-select/security/advisories/new).

Include as much of the following as you can:

- Affected version(s) of `chakra-react-select`
- A description of the issue and its impact
- Steps to reproduce, ideally with a minimal repro
- Any known mitigations or workarounds

You can expect an initial acknowledgement within a few days. Once the report
is triaged, we'll keep you updated as a fix is developed and coordinate a
disclosure timeline with you before publishing the advisory and patched
release.

### Out of scope

This package is a thin wrapper around
[`react-select`](https://github.com/JedWatson/react-select) styled with
[`@chakra-ui/react`](https://github.com/chakra-ui/chakra-ui). Issues that
originate in those upstream projects should be reported to them directly:

- react-select — https://github.com/JedWatson/react-select/security
- Chakra UI — https://github.com/chakra-ui/chakra-ui/security
