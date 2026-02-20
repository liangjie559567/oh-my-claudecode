---
name: superpowered
description: Use when user says "superpowered", "quality-gated", or wants full quality-gated pipeline with Iron Laws enforced at every stage
---

# Superpowered Development Pipeline

Full quality-gated pipeline combining oh-my-claudecode orchestration with superpowers Iron Laws.

**Announce:** "I'm using the superpowered pipeline — all Iron Laws enforced."

## Pipeline

1. **[HARD-GATE]** superpowers:brainstorming — design approved → setBrainstormingApproved()
2. **[REQUIRED]** superpowers:using-git-worktrees — `.worktrees/` directory
3. **[REQUIRED]** superpowers:writing-plans — 2-5 min tasks, complete code
4. **[EXECUTE]** superpowers:subagent-driven-development — per-task: implementer → spec-reviewer → quality-reviewer
5. **[PER TASK]** superpowers:requesting-code-review — mandatory after each task
6. **[FINISH]** superpowers:finishing-a-development-branch — default: Push + PR

## Iron Laws Active

- TDD: no production code without failing test (executor, deep-executor)
- Verification: no completion claims without fresh evidence (verifier)
- Debugging: no fixes without root cause (debugger) — 3 failures → architect → user

## Disable

Set `OMC_SKIP_IRON_LAWS=1` to bypass Iron Laws (not recommended).
