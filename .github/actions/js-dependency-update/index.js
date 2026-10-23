import * as core from '@actions/core'

export async function run() {

  try {
    core.info('js custom action build');
  }
  catch (error) {
    core.setFailed(error.message)
  }
}

run();
