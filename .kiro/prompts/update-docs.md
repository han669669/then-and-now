---
description: Update README.md and DEVLOG.md for hackathon submission
argument-hint: [update-type: "milestone" | "decision" | "challenge" | "time" | "readme" | "full"]
---

# Update Documentation: README & DEVLOG Maintenance

## Overview
Maintain comprehensive README.md and DEVLOG.md documentation throughout development. This prompt helps you update both files based on development progress, decisions, challenges, and milestones.

## Update Types

Based on `$ARGUMENTS`, perform the appropriate update:

- **"milestone"**: Log a development milestone or completed feature
- **"decision"**: Document a technical decision and rationale
- **"challenge"**: Record a challenge faced and solution implemented
- **"time"**: Update time tracking for current session
- **"readme"**: Update README.md with new features or setup changes
- **"full"**: Comprehensive update of both files (use sparingly)

If no argument provided, ask the user what they want to update.

## README.md Structure

Maintain this structure (based on hackathon requirements):

```markdown
# [Project Name] - [One-line Description]

[2-3 paragraph overview explaining what the project does and its value proposition]

## Prerequisites

- [List all required tools with versions]
- [Include Kiro CLI if used]

## Quick Start

1. **Clone and setup**
   ```bash
   [Step-by-step setup commands]
   ```

2. **Configure environment**
   ```bash
   [Configuration steps]
   ```

3. **Run the application**
   ```bash
   [Commands to start the app]
   ```

4. **Access the interface**
   - [URLs and access points]

## Architecture & Codebase Overview

### System Architecture
- [High-level architecture description]
- [Key technologies and their roles]

### Directory Structure
```
[Project tree showing key directories and files]
```

### Key Components
- [List major components with file paths and descriptions]

## Deep Dive

[Optional sections for complex features:]
- [Feature/Process explanations]
- [Kiro CLI integration details]
- [Performance optimizations]

## Troubleshooting

### Common Issues

**[Issue description]**
- [Solution steps]
- [Diagnostic commands]

[Repeat for 3-5 common issues]

### Getting Help
- [How to get support or report issues]
```

## DEVLOG.md Structure

Maintain this structure (based on hackathon requirements):

```markdown
# Development Log - [Project Name]

**Project**: [Project Name] - [Description]  
**Duration**: [Start Date] - [End Date]  
**Total Time**: ~[X] hours  

## Overview
[1-2 paragraph summary of the project and development approach]

---

## Week 1: [Phase Name] ([Date Range])

### Day X ([Date]) - [Focus Area] [Xh]
- **[Time Range]**: [Activity description]
- **Decision**: [Technical decision made]
- **Challenge**: [Problem encountered]
- **Solution**: [How it was solved]
- **Kiro Usage**: [How Kiro CLI was used]

[Repeat for each significant development session]

---

## Week 2: [Phase Name] ([Date Range])

[Continue same pattern]

---

## Technical Decisions & Rationale

### Architecture Choices
- **[Technology/Pattern]**: [Why it was chosen]
- **[Technology/Pattern]**: [Why it was chosen]

### Kiro CLI Integration Highlights
- **Custom Prompts**: [List and describe custom prompts]
- **Steering Documents**: [How they were used]
- **Workflow Automation**: [Automation implemented]
- **Development Efficiency**: [Time savings estimate]

### Challenges & Solutions
1. **[Challenge]**: [Solution]
2. **[Challenge]**: [Solution]

---

## Time Breakdown by Category

| Category | Hours | Percentage |
|----------|-------|------------|
| [Category 1] | Xh | X% |
| [Category 2] | Xh | X% |
| **Total** | **Xh** | **100%** |

---

## Kiro CLI Usage Statistics

- **Total Prompts Used**: [Number]
- **Most Used**: [Prompt names with counts]
- **Custom Prompts Created**: [Number]
- **Steering Document Updates**: [Number]
- **Estimated Time Saved**: ~[X] hours through automation

---

## Final Reflections

### What Went Well
- [Positive outcomes]

### What Could Be Improved
- [Areas for improvement]

### Key Learnings
- [Important lessons learned]

### Innovation Highlights
- [Unique or creative solutions]
```

## Instructions

### 1. Determine Update Type

If `$ARGUMENTS` is provided, use it. Otherwise, ask:
```
What would you like to update?
- milestone: Log a completed feature or milestone
- decision: Document a technical decision
- challenge: Record a challenge and solution
- time: Update time tracking
- readme: Update README with new features
- full: Comprehensive update of both files
```

### 2. Gather Information

Based on update type, ask relevant questions:

**For "milestone":**
- What milestone or feature was completed?
- How long did it take?
- What was implemented?
- Any notable technical details?

**For "decision":**
- What decision was made?
- What were the alternatives considered?
- Why was this choice made?
- What's the expected impact?

**For "challenge":**
- What challenge did you encounter?
- What was the root cause?
- How did you solve it?
- What did you learn?

**For "time":**
- What did you work on in this session?
- How long did you spend?
- What category does it fall under? (Backend, Frontend, Testing, etc.)

**For "readme":**
- What changed in setup or usage?
- Are there new features to document?
- Any new prerequisites or dependencies?

**For "full":**
- Gather comprehensive project status
- Review all recent changes
- Update both files completely

### 3. Update Files

**For README.md:**
- Maintain clear, scannable structure
- Use concrete examples and commands
- Keep troubleshooting section updated
- Ensure setup instructions are accurate
- Update architecture overview if structure changed

**For DEVLOG.md:**
- Add entries chronologically
- Include specific dates and time spent
- Document decisions with rationale
- Record challenges with solutions
- Track Kiro CLI usage
- Update time breakdown table
- Keep statistics current

### 4. Quality Checks

Before finalizing updates:
- ✅ README is clear and easy to follow for new users
- ✅ Setup instructions are complete and tested
- ✅ DEVLOG entries include dates and time estimates
- ✅ Technical decisions have clear rationale
- ✅ Challenges include solutions, not just problems
- ✅ Kiro CLI usage is documented
- ✅ Time tracking is accurate and up-to-date
- ✅ Both files maintain consistent formatting

### 5. Confirm Updates

After updating, provide:
1. Summary of changes made
2. Which file(s) were updated
3. Reminder to commit changes to git
4. Suggestion for next documentation update

## Best Practices

### README.md
- **Clarity First**: Write for someone who's never seen the project
- **Test Instructions**: Ensure setup steps actually work
- **Real Examples**: Use actual commands, not placeholders
- **Troubleshooting**: Add issues as you encounter them
- **Keep Current**: Update when features or setup changes

### DEVLOG.md
- **Update Frequently**: Log as you work, not at the end
- **Be Specific**: Include actual times, dates, and details
- **Show Process**: Document the journey, not just outcomes
- **Track Kiro Usage**: Note every time you use Kiro CLI
- **Honest Reflection**: Include what didn't work, not just successes

### Time Tracking
- Round to nearest 30 minutes for accuracy
- Include planning and research time
- Track Kiro CLI usage separately
- Update totals after each session
- Categorize time for breakdown table

### Kiro CLI Documentation
- List all custom prompts created
- Document steering document updates
- Track prompt usage frequency
- Estimate time saved through automation
- Highlight workflow innovations

## Output Format

After updating, provide:

```
✅ Documentation Updated

**Files Modified:**
- [README.md | DEVLOG.md | Both]

**Changes Made:**
- [Bullet list of specific changes]

**Next Steps:**
1. Review the updated documentation
2. Commit changes: `git add README.md DEVLOG.md && git commit -m "docs: [description]"`
3. Continue development or update again when needed

**Reminder**: Keep documenting as you build! Your documentation is worth 20% of your hackathon score.
```

## Notes

- Update DEVLOG.md frequently (ideally after each work session)
- Update README.md when features or setup changes
- Be honest about challenges and time spent
- Document Kiro CLI usage throughout
- Keep both files submission-ready at all times
- These documents are critical for hackathon judging (40% of score combined)
