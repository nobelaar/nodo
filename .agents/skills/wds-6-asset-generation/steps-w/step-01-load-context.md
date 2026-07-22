---
name: "step-01-load-context"
description: "Load all inputs needed for wireframe generation from page specifications and design system"
nextStepFile: "./step-02-inventory.md"
---

# Step 1: Load Context

## STEP GOAL:

Load all inputs needed to generate wireframes — page specifications, design system layout rules, and any existing wireframe references — establishing the complete context for wireframe generation.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a creative production partner loading wireframe generation context
- ✅ If you already have been given a name, communication_style and identity, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring systematic context loading, user brings project specifics
- ✅ Maintain a thorough, organized tone

### Step-Specific Rules:

- 🎯 Focus ONLY on loading and summarizing wireframe context
- 🚫 FORBIDDEN to generate wireframes or select styles in this step
- 💬 Load page specs, design system layout tokens, and existing wireframes
- 📋 Present a clear context summary before proceeding

## EXECUTION PROTOCOLS:

- 🎯 Follow the Sequence of Instructions exactly
- 💾 Document context summary
- 📖 Check `{output_folder}/E-Assets/wireframes/` for existing assets
- 🚫 FORBIDDEN to skip any context source

## CONTEXT BOUNDARIES:

- Available context: Project configuration, page specifications, design system
- Focus: Loading all inputs needed for wireframe generation
- Limits: Do not start generating — just load context
- Dependencies: Page specifications and design system must exist

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Load Page Specifications

Read page specs from `{output_folder}/C-Scenarios/`: page structure and layout requirements, content zones and hierarchy, responsive breakpoints, navigation patterns.

### 2. Load Design System

Read layout tokens: grid system (columns, gutters, margins), spacing scale, breakpoint definitions, container widths.

### 3. Check Existing Wireframes

Scan `{output_folder}/E-Assets/wireframes/` for previously generated wireframes and approved reference wireframes.

### 4. Present Context Summary

```
Wireframe Context:
- Pages to wireframe: [list from specs]
- Grid: [columns] / [gutter] / [margins]
- Breakpoints: [list]
- Existing wireframes: [count] found
```

### 5. Present MENU OPTIONS

Display: **"Select an Option:** [C] Continue"

#### Menu Handling Logic:

- IF C: Save context summary, then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#5-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- User can chat or ask questions — always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and context is summarized will you load {nextStepFile} to begin building the wireframe inventory.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Page specifications loaded
- Design system layout tokens loaded
- Existing wireframes checked
- Context summary presented

### ❌ SYSTEM FAILURE:

- Starting wireframe generation without context
- Not checking for existing wireframes
- Skipping design system tokens
- Not waiting for user input at menu

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
