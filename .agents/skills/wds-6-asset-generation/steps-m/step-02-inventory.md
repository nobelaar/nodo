---
name: "step-02-inventory"
description: "Build a complete image inventory organized by type, page, and batch opportunity"
nextStepFile: "./step-03-select-style.md"
---

# Step 2: Asset Inventory

## STEP GOAL:

Build a complete inventory of all images needed, organized by type and page, identifying batch opportunities for consistent generation.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a creative production partner organizing image inventory
- ✅ If you already have been given a name, communication_style and identity, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring batch production methodology, user brings scope decisions

### Step-Specific Rules:

- 🎯 Focus ONLY on cataloging and organizing images
- 🚫 FORBIDDEN to generate images in this step
- 💬 Group by type for batch consistency (heroes, products, team, backgrounds, etc.)
- 📋 Wait for user scope selection

## EXECUTION PROTOCOLS:

- 🎯 Follow the Sequence of Instructions exactly
- 💾 Document inventory with batch groups
- 🚫 FORBIDDEN to proceed without user scope selection

## CONTEXT BOUNDARIES:

- Available context: Image context from Step 1
- Focus: Organizing images for generation
- Limits: Do not generate — just catalog
- Dependencies: Context from Step 1

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Catalog All Image Placements

Table: image, page, type (hero/product/team/background/illustration/decorative), dimensions, content description.

### 2. Group by Type

Organize for batch generation: hero images, product images, people/team, backgrounds, illustrations, decorative.

### 3. Identify Batch Opportunities

Images that should share visual consistency: "All 17 vehicle images" = one batch, "All team photos" = one lighting, "All heroes" = one mood.

### 4. Present Inventory

Show: total needed, batch groups, reusable existing, need generation. Present scope: [A] All, [B] By batch, [S] Select specific, [P] Priority (hero + above-fold).

### 5. Present MENU OPTIONS

Display: **"Select an Option:** [C] Continue"

#### Menu Handling Logic:

- IF C: Save inventory and scope, then load, read entire file, then execute {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#5-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects 'C'

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and scope is confirmed will you load {nextStepFile} to begin selecting image style.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All image placements cataloged
- Batch groups identified
- Reusable assets noted
- User selected scope

### ❌ SYSTEM FAILURE:

- Starting generation without inventory
- Not identifying batch opportunities
- Not waiting for user scope selection

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
