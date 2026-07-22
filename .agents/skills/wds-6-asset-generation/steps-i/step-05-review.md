---
name: "step-05-review"
description: "Review the complete icon set for visual consistency, clarity, and completeness"
workflowFile: "../workflow.md"
---

# Step 5: Review and Iterate

## STEP GOAL:

Review the complete icon set for visual consistency, metaphor clarity, and completeness — iterating on any icons that need adjustment and saving the final approved set with size variants.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Role Reinforcement:

- ✅ You are a creative production partner conducting quality review
- ✅ If you already have been given a name, communication_style and identity, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring visual consistency expertise, user brings final approval
- ✅ Maintain a quality-focused, thorough tone

### Step-Specific Rules:

- 🎯 Review as a complete set, not individual icons in isolation
- 🚫 FORBIDDEN to skip consistency or metaphor clarity checks
- 💬 Present icons in grid format at multiple sizes and backgrounds
- 📋 Generate size variants only after approval

## EXECUTION PROTOCOLS:

- 🎯 Follow the Sequence of Instructions exactly
- 💾 Save approved set to `{output_folder}/E-Assets/icons/`
- 📖 Check consistency across: stroke weight, visual weight, corner radius, detail level, padding
- 🚫 FORBIDDEN to save without user approval

## CONTEXT BOUNDARIES:

- Available context: All generated icons from Step 4, style configuration
- Focus: Reviewing the complete set for quality and consistency
- Limits: This is the final step — focus on quality assurance and delivery
- Dependencies: Generated icons from Step 4

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Present Full Icon Set

Display all icons in a grid: organized by category, shown at multiple sizes (sm, md, lg), on dark and light backgrounds.

### 2. Consistency Check

Verify across the full set: uniform stroke weight, balanced visual weight, consistent corner radius, consistent detail level, uniform padding/live area, recognizable at smallest size.

### 3. Metaphor Clarity Check

For each icon: clearly communicates intended meaning, no ambiguity with similar icons, culturally appropriate metaphors.

### 4. User Review

Present options: [A] Approve all, [R] Regenerate specific icons, [W] Weight adjust globally, [S] Size test at minimum size, [C] Context preview in UI mockup.

### 5. Iterate on Flagged Icons

For icons marked for regeneration: capture feedback, adjust prompt, use closest approved match as reference, re-review in set context.

### 6. Generate Size Variants

For approved icons: SVG (scalable, primary format), PNG at 1x, 2x, 3x for each defined size.

### 7. Save Approved Set

Save to `{output_folder}/E-Assets/icons/`: `svg/` folder, `png/` folder organized by size, `icon-set-summary.md` catalog.

### 8. Update Design Log

Record: icons generated count, style used, categories covered, consistency pass/issues.

### 9. Present MENU OPTIONS

Display: **"Select an Option:** [M] Return to Activity Menu"

#### Menu Handling Logic:

- IF M: Save final set, update design log, return to Activity Menu in {workflowFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#9-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- User can chat or ask questions — always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

This is the final step of the Icons workflow. When M is selected and the icon set is saved, return to the Activity Menu.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Full icon set presented for review
- Consistency and metaphor clarity checks completed
- User approved the final set
- Size variants generated
- Set saved to correct output location
- Design log updated

### ❌ SYSTEM FAILURE:

- Saving icons without user approval
- Skipping consistency or clarity checks
- Not generating size variants
- Not updating design log

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.
