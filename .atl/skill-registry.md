# Skill Registry — phonix-learning-control-web

**Last updated**: 2026-05-14
**Project**: phonix-learning-control-web

---

## SDD Workflow Skills

| Skill | Trigger | Phase |
|-------|---------|-------|
| sdd-init | `sdd init`, `iniciar sdd`, `openspec init` | Initialize SDD context |
| sdd-explore | Explore SDD ideas, requirement clarification | Explore |
| sdd-propose | Create change proposal | Propose |
| sdd-spec | Write delta specs with requirements/scenarios | Spec |
| sdd-design | Create technical design and architecture | Design |
| sdd-tasks | Break change into implementation tasks | Tasks |
| sdd-apply | Implement SDD tasks from specs/design | Apply |
| sdd-verify | Execute tests, prove implementation matches specs | Verify |
| sdd-archive | Sync delta specs after implementation/verification | Archive |
| sdd-onboard | Walk through full SDD cycle on real codebase | Onboard |

## Collaboration Skills

| Skill | Trigger |
|-------|---------|
| branch-pr | Creating, opening, or preparing PRs for review |
| chained-pr | PRs over 400 lines, stacked PRs, review slices |
| comment-writer | PR feedback, issue replies, reviews, Slack messages |
| issue-creation | Creating GitHub issues, bug reports, feature requests |
| judgment-day | Judgment day, dual review, adversarial review |
| cognitive-doc-design | Writing guides, READMEs, RFCs, onboarding docs |

## Skill Registry Maintenance

- Scanned paths: `~/.config/opencode/skills/`, project `.atl/` skills
- Deduplication: project-level skills take precedence over user-level
- Format: name, trigger text, full path, compact rules (5-15 actionable lines)
- Excluded from scan: `sdd-*`, `_shared`, `skill-registry`

## Project Conventions

- Path aliases: `@/*` → `./src/*`
- Strict TypeScript: `strict: true` in tsconfig
- Linting: ESLint + Prettier (via `next lint`)
- Testing: `jest --ci` (unit only, no coverage)
- State: Redux Toolkit + RTK Query
- Auth: Next-Auth 4 with JWT
- RBAC: useRBAC hook, RouteGuard, RoleGuard (3 roles)
- Styling: Tailwind CSS 4 + Radix UI + class-variance-authority
- Forms: react-hook-form + Zod 4