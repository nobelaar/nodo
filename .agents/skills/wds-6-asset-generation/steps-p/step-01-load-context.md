---
name: "step-01-load-context"
description: "Load everything needed for full page design compositions from specs, design system, and wireframes"
nextStepFile: "./step-02-inventory.md"
---

# Step 1: Load Context

## STEP GOAL:

Load everything needed for full page design compositions — page specifications, complete design system, visual direction, and any approved wireframes to build upon.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a creative production partner loading page design context
- ✅ If you already have been given a name, communication_style and identity, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring systematic context loading, user brings project specifics

### Step-Specific Rules:

- 🎯 Focus ONLY on loading and summarizing page design context
- 🚫 FORBIDDEN to generate designs or select styles in this step
- 💬 Load all four context sources: specs, design system, visual direction, wireframes
- 📋 Present clear context summary before proceeding

## EXECUTION PROTOCOLS:

- 🎯 Follow the Sequence of Instructions exactly
- 💾 Document context summary
- 📖 Check `{output_folder}/E-Assets/wireframes/` for approved wireframes
- 🚫 FORBIDDEN to skip any context source

## CONTEXT BOUNDARIES:

- Available context: Project configuration, page specifications, design system, visual direction
- Focus: Loading all inputs needed for page design generation
- Limits: Do not start generating — just load context
- Dependencies: Page specifications and design system must exist

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Load Page Specifications

Read from `{output_folder}/C-Scenarios/`: complete page structure, user journeys, content copy, image placement.

### 2. Load Design System

Read full design system: color palette, typography scale, component patterns, spacing tokens, border/shadow/elevation tokens.

### 3. Load Visual Direction

Read brand and visual direction: brand guidelines, mood board, photography direction, illustration style.

### 4. Load Wireframes

Check `{output_folder}/E-Assets/wireframes/` for approved wireframes as structural reference.

### 5. Present Context Summary

```
Page Design Context:
- Pages to design: [list]
- Design system: [name] — [token count] tokens
- Wireframes available: [count] pages
- Visual direction: [summary]
- Content ready: [yes/no per page]
```

### 6. Present MENU OPTIONS

Display: **"Select an Option:** [C] Continue"

#### Menu Handling Logic:

- IF C: Save context, then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#6-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and context is summarized will you load {nextStepFile} to begin building the page design inventory.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Page specs loaded
- Full design system loaded
- Visual direction loaded
- Wireframes checked
- Context summary presented

### ❌ SYSTEM FAILURE:

- Starting generation without full context
- Not checking for wireframes
- Skipping visual direction
- Not waiting for user input at menu

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
