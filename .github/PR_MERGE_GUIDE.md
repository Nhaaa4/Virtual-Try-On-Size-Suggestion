# GitHub Pull Request Merge Guide

## Why You Can't See Merge Options

If you're trying to merge a pull request but don't see merge options, here are the most common reasons and solutions:

### 1. **Pull Request is in Draft Mode** ⚠️

**Problem**: Draft pull requests intentionally hide the merge button to prevent accidental merges of work-in-progress code.

**Solution**: 
1. Go to your pull request page
2. Scroll down to find the "Ready for review" button
3. Click "Ready for review" to convert the draft PR to a regular PR
4. The merge options will now appear

### 2. **CI/CD Checks are Failing or Required**

**Problem**: If your repository has required status checks, the merge button will be disabled until all checks pass.

**Solution**:
1. Check the "Checks" tab on your PR
2. Review any failing tests or workflows
3. Fix the issues and push new commits
4. Wait for checks to complete successfully

### 3. **Merge Conflicts Exist**

**Problem**: If your branch conflicts with the base branch, GitHub won't allow the merge.

**Solution**:
```bash
# Update your local branch with latest main
git checkout your-branch-name
git fetch origin
git merge origin/main

# Resolve any conflicts
# Then push the resolved changes
git push origin your-branch-name
```

### 4. **Insufficient Permissions**

**Problem**: You need write access to the repository to merge pull requests.

**Solution**:
- Contact the repository owner to request collaborator access
- Or request that a maintainer merge your PR

### 5. **Branch Protection Rules**

**Problem**: The repository may have branch protection rules requiring:
- Code reviews
- Passing status checks
- Linear history
- Signed commits

**Solution**:
1. Check the repository settings → Branches → Branch protection rules
2. Ensure all requirements are met:
   - Get required reviews
   - Ensure all checks pass
   - Rebase if linear history is required

## How to Merge a Pull Request

Once all requirements are met and the merge button is available:

1. **Choose a merge method**:
   - **Merge commit**: Keeps all commits and creates a merge commit
   - **Squash and merge**: Combines all commits into one
   - **Rebase and merge**: Replays commits on top of base branch

2. **Click the merge button**

3. **Delete the branch** (optional but recommended for cleanliness)

## GitHub Actions and CI/CD

This repository includes automated checks that run on every pull request:

- **PR Checks Workflow**: Validates code quality and builds
  - Python linting with flake8
  - Node.js linting
  - Frontend build verification

## Best Practices

✅ **Do**:
- Convert draft PRs to regular PRs when ready for review
- Ensure all CI checks pass before requesting review
- Resolve merge conflicts promptly
- Follow the pull request template
- Add meaningful commit messages

❌ **Don't**:
- Merge draft PRs
- Bypass failing checks without investigation
- Merge with unresolved conflicts
- Forget to update your branch with latest changes

## Need Help?

If you're still having issues with merge options:
1. Check the [Contributing Guide](.github/CONTRIBUTING.md)
2. Review the PR checklist in the template
3. Ask for help in PR comments
4. Contact repository maintainers

## Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| Draft PR | Click "Ready for review" |
| Failing checks | Fix code and push updates |
| Merge conflicts | Merge main into your branch |
| No permissions | Request collaborator access |
| Missing reviews | Request reviews from maintainers |
