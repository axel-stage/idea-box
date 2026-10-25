import * as core from "@actions/core";
import * as github from "@actions/github";
import * as exec from "@actions/exec";


const validateBranchName = ({branchName}) => /^[a-zA-Z0-9_\-\.\/]+$/.test(branchName)
const validateDirectoryName = ({directoryName}) => /^[a-zA-Z0-9_\-\/]+$/.test(directoryName)

async function run() {

  // parse inputs
  const baseBranch = core.getInput('base-branch')
  const targetBranch = core.getInput('target-branch')
  const githubToken = core.getInput('github-token')
  const workingDirectory = core.getInput('working-directory')
  const debug = core.getBooleanInput('debug')

  core.setSecret(githubToken)

  if(!validateBranchName({branchName: baseBranch})) {
    core.setFailed('Invalid base-branch name')
    return;
  }
  if(!validateBranchName({branchName: targetBranch})) {
    core.setFailed('Invalid target-branch name')
    return;
  }
  if(!validateDirectoryName({directoryName: workingDirectory})) {
    core.setFailed('Invalid working-directory name')
    return;
  }

  core.info(`[js dependency update] : base branch is ${baseBranch}`);
  core.info(`[js dependency update] : target branch is ${targetBranch}`);
  core.info(`[js dependency update] : working directory is ${workingDirectory}`);

  await exec.exec('npm update', [], {
    cwd: workingDirectory
  });

  const gitStatus =  await exec.getExecOutput('git status -s package*.json', [], {
    cwd: workingDirectory
  });
  if(gitStatus.stdout.length > 0) {
    core.info('[js dependency update] : There are updates available');
  } else {
    core.info('[js dependency update] : No updates at this point in time');
  }
}

run();
