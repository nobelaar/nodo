<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# TDD — mandatory

Test-driven development is REQUIRED for all implementation work. Before writing any implementation code, write a failing test first. Then write the minimal code to make it pass. Never write implementation before tests.

- Vitest + Testing Library for all tests
- Tests must pass (`pnpm test`) before claiming work is done
- Server actions: test the logic in isolation (mock Supabase)
- Components: test rendering and user interactions
- Hooks/helpers: test all branches and edge cases

# BMad Method — mandatory

The BMad Method skills in `.claude/skills/` are MANDATORY for all workflow decisions. Never skip the process.

## Entry points by context

| When you need to...                    | Use skill                                         |
| -------------------------------------- | ------------------------------------------------- |
| Start ANY new feature or creative work | `bmad-brainstorming`                              |
| Create/review product requirements     | `bmad-create-prd` or `bmad-prd`                   |
| Create epics and user stories          | `bmad-create-epics-and-stories`                   |
| Plan a sprint                          | `bmad-sprint-planning`                            |
| Develop a story (implementation)       | `bmad-dev-story`                                  |
| Code review                            | `bmad-code-review`                                |
| Define architecture                    | `bmad-architecture` or `bmad-create-architecture` |
| Test architecture / ATDD               | `bmad-testarch-framework` / `bmad-testarch-atdd`  |
| Run a retrospective                    | `bmad-retrospective`                              |
| Not sure what to do next               | `bmad-help`                                       |
| Validate PRD completeness              | `bmad-validate-prd`                               |
| Quick dev without full ceremony        | `bmad-quick-dev`                                  |

## Rules

- **Never skip the process** — even for "simple" changes, run `bmad-help` if unsure
- **PRD before code** — features need requirements, even if lightweight
- **TDD within BMad** — `bmad-dev-story` works with the TDD cycle
- **Fresh context** — run each BMad skill in a fresh conversation window as recommended
