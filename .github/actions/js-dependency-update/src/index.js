import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from "@actions/github";


const validateBranchName = ({branchName}) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName)
const validateDirectoryName = ({directoryName}) => /^[a-zA-Z0-9_\-\/]+$/.test(directoryName)

async function run() {

  // parse inputs
  const baseBranch = core.getInput('base-branch', {required: true});
  const targetBranch = core.getInput('target-branch', {required: true});
  const githubToken = core.getInput('github-token', {required: true});
  const workingDirectory = core.getInput('working-directory', {required: true});
  const debug = core.getBooleanInput('debug');

  const commenExecOpts = {
    ...commenExecOpts
  }
  core.setSecret(githubToken);

  if(!validateBranchName({branchName: baseBranch})) {
    core.setFailed('Invalid base-branch name');
    return;
  }
  if(!validateBranchName({branchName: targetBranch})) {
    core.setFailed('Invalid target-branch name');
    return;
  }
  if(!validateDirectoryName({directoryName: workingDirectory})) {
    core.setFailed('Invalid working-directory name');
    return;
  }

  core.info(`[js dependency update] : base branch is ${baseBranch}`);
  core.info(`[js dependency update] : target branch is ${targetBranch}`);
  core.info(`[js dependency update] : working directory is ${workingDirectory}`);

  await exec.exec('npm update', [], {
    ...commenExecOpts
  });

  const gitStatus =  await exec.getExecOutput('git status -s package*.json', [], {

  });
  if(gitStatus.stdout.length > 0) {
    core.info('[js dependency update] : There are updates available');
    await exec.exec(`git config --global user.name "github-automation"`);
    await exec.exec(`git config --global user.email "github-automation@email.com"`);
    await exec.exec(`git checkout -b ${targetBranch}`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git add package.json package-lock.json`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git commit -m "core: update dependencies`, [], {
      ...commenExecOpts
    });
    await exec.exec(`git push -u origin ${targetBranch} --force`, [], {
      ...commenExecOpts
    });

    const octokit = github.getOktokit(githubToken);

    try {
      await octokit.rest.pulls.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: `Update NPM dependencies`,
        body: `This pull request updates NPM packages`,
        base: baseBranch,
        head: targetBranch
      })
    } catch (error) {
      core.warning('[js dependency update] : Something went wrong creating the PR.');
      core.warning(error.message);
    }

  } else {
    core.info('[js dependency update] : No updates at this point in time');
  }
}

run();
