# type checking
###############
# Run type checking once (includes React Router type generation)
npm run typecheck
# Run type checking in watch mode (reruns on file changes)
npx tsc --watch
# Run type checking for specific files
npx tsc --noEmit src/features/ideas/api/create-idea.ts

# linting
#########
# Run linting on all files
npm run lint
# Run linting and automatically fix what can be fixed
npm run lint:fix
# Run linting on specific files or directories
npx eslint src/features/ideas/
npx eslint src/components/button.tsx

# pre-commit checks
###################
# Run all pre-commit checks (linting, formatting, type checking)
npm run pre-commit
# Run only lint-staged (checks only changed files)
npm run lint-staged
# Run individual checks
npm run lint
npm run format
npm run typecheck
