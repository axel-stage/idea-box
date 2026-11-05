import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";

const setupGit = async () => {
  await exec.exec(`git config --global user.name "github-automation"`);
  await exec.exec(`git config --global user.email "github-automation@email.com"`);
}

const validateBranchName = ({branchName}) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName)
const validateDirectoryName = ({directoryName}) => /^[a-zA-Z0-9_\-\/]+$/.test(directoryName)

const setupLogger = ({debug, prefix} = {debug: false, prefix: ''}) => ({
  debug: (message) => {
    if(debug) {
      core.info(`Debug ${prefix}${prefix ? ' : ' : ''}${message}`)
    }
  },
  info: (message) => {
    core.info(`${prefix}${prefix ? ' : ' : ''}${message}`)
  },
  error: (message) => {
    if(debug) {
      core.error(`Debug ${prefix}${prefix ? ' : ' : ''}${message}`)
    }
  }
})

async function run() {
  // parse inputs
  const baseBranch = core.getInput('base-branch', {required: true});
  const headBranch = core.getInput('head-branch', {required: true});
  const githubToken = core.getInput('github-token', {required: true});
  const workingDirectory = core.getInput('working-directory', {required: true});
  const debug = core.getBooleanInput('debug');
  const logger = setupLogger({debug, prefix: '[js dependency update]'})

  const commenExecOpts = {
    ...commenExecOpts
  }
  core.setSecret(githubToken);

  logger.debug('Validating inputs base-branch head-branch working-directory')

  if(!validateBranchName({branchName: baseBranch})) {
    core.setFailed('Invalid base-branch name');
    return;
  }
  if(!validateBranchName({branchName: headBranch})) {
    core.setFailed('Invalid head-branch name');
    return;
  }
  if(!validateDirectoryName({directoryName: workingDirectory})) {
    core.setFailed('Invalid working-directory name');
    return;
  }

  logger.debug(`[js dependency update] : base branch is ${baseBranch}`);
  logger.debug(`[js dependency update] : head branch is ${headBranch}`);
  logger.debug(`[js dependency update] : working directory is ${workingDirectory}`);

  await exec.exec('npm update', [], {
    ...commenExecOpts
  });

  const gitStatus =  await exec.getExecOutput('git status -s package*.json', [], {

  });
  if(gitStatus.stdout.length > 0) {
    logger.debug('There are updates available');
    logger.debug('Setting up git');
    await setupGit();
    logger.debug('Committing and pushing package*.json changes');
    await exec.exec(`git checkout -b ${headBranch}`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git add package.json package-lock.json`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git commit -m "core: update dependencies`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git push -u origin ${headBranch} --force`, [], {
      ...commenExecOpts
    });

    logger.debug('Fetching Octokit API')
    const octokit = github.getOctokit(githubToken);

    try {
      logger.debug(`Creating PR using head branch ${headBranch}`);
      await octokit.rest.pulls.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: `Update NPM dependencies`,
        body: `This pull request updates NPM packages`,
        base: baseBranch,
        head: headBranch
      })
    } catch (error) {
      logger.error('Something went wrong creating the PR.');
      core.setFailed(error.message);
      logger.error(error.message);
    }

  } else {
    logger.info('[js dependency update] : No updates at this point in time');
  }
}

run();
