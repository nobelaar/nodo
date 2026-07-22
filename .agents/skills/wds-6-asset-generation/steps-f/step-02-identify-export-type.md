---
name: "step-02-identify-export-type"
description: "Determine the code-to-Figma export scenario type for proper ID naming and structure"
nextStepFile: "./step-03-prepare-specifications.md"
---

# Step 2: Identify Code to Figma Type

## STEP GOAL:

Determine which code-to-Figma export scenario applies to the current request — Prototype Page, Design System Component, or Frontend View/Component Block — to ensure proper ID naming and structure.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a technical export specialist classifying the export scenario
- ✅ If you already have been given a name, communication_style and identity, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring export scenario expertise, user brings their specific export needs
- ✅ Maintain a clear, analytical tone

### Step-Specific Rules:

- 🎯 Focus ONLY on identifying the export scenario type
- 🚫 FORBIDDEN to start generating HTML or preparing specifications
- 💬 Confirm scenario type with user before proceeding
- 📋 Document the selected scenario and its ID naming pattern

## EXECUTION PROTOCOLS:

- 🎯 Follow the Sequence of Instructions exactly
- 💾 Document selected scenario type and ID naming pattern
- 📖 Use the decision tree to classify the request
- 🚫 FORBIDDEN to proceed without user confirmation of scenario type

## CONTEXT BOUNDARIES:

- Available context: Verified MCP connection, user's export request
- Focus: Classifying the export into one of three scenario types
- Limits: Do not start HTML generation — just classify and confirm
- Dependencies: Verified connection from Step 1

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Analyze User Request

Examine the user's request and extract: component/page name, scope (full page vs. component vs. block), purpose (design system, prototype, visual adjustment), states/variations mentioned.

### 2. Apply Decision Tree

- Full page/screen, multiple sections, user flow → **Scenario A: Prototype Page Export** (ID: `{page}-{section}-{element}`)
- Component states, design system docs, reusable component → **Scenario B: Design System Component** (ID: `{component}-{variant}-{state}`)
- Visual adjustments, spacing iteration, specific UI block → **Scenario C: Frontend View/Component Block** (ID: `{component}-{element}-{descriptor}`)
- Unclear → Ask user for clarification

### 3. Confirm with User

Present the identified scenario with its description, ID naming pattern, and expected outcome. Ask: **"Proceed with this scenario, or would you like to adjust the scope?"**

Wait for user confirmation.

### 4. Present MENU OPTIONS

Display: **"Select an Option:** [C] Continue"

#### Menu Handling Logic:

- IF C: Save scenario type and ID pattern, then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#4-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'
- User can chat or ask questions — always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and the scenario type is confirmed will you load {nextStepFile} to begin preparing specifications.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Export request analyzed and classified
- Scenario type confirmed with user
- ID naming pattern documented
- Expected outcome communicated

### ❌ SYSTEM FAILURE:

- Starting HTML generation before scenario is confirmed
- Not confirming scenario type with user
- Using wrong ID naming pattern
- Not waiting for user input at menu

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
