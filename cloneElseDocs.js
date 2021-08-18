const fs = require('fs-extra')
const shell = require('shelljs')
const path = require('path')
const os = require('os')

const DEPLOY_ENV = process.env.DEPLOY_ENV || 'staging'
const DEPLOYMENT_BRANCH = `docs-${DEPLOY_ENV}`
const REMOTE_BRANCH_PREFIX = 'git@github.com:LISTENAI/'
const ELSE_DOCS_LIST = [
    {
        projectName: 'lisa-core',
        targetDir: './docs/tools/LISA_LPM/development/API'
    }
]

function shellExecLog(cmd) {
    try {
        const result = shell.exec(cmd)
        console.log(
            `'CMD: ${cmd} (code: ${result.code})`,
        )
        return result
    } catch (e) {
        console.log(
            `'CMD: ${cmd} (code: ${result.code})`,
        )
        throw e
    }
}

(async () => {
    const basePath = path.resolve('.')
    for (let i = 0; i <= ELSE_DOCS_LIST.length - 1; i++) {
        const {projectName, targetDir} = ELSE_DOCS_LIST[i]
        const toPath = path.resolve(targetDir)
        const REMOTE_BRANCH = `${REMOTE_BRANCH_PREFIX}${projectName}.git`

        console.log(`REMOTE_BRANCH: ${REMOTE_BRANCH}`)
        console.log(`DEPLOYMENT_BRANCH: ${DEPLOYMENT_BRANCH}`)
        console.log(`toPath: ${toPath}`)

        await fs.remove(toPath)
        await fs.mkdirp(toPath)
        if (shellExecLog(`git clone ${REMOTE_BRANCH} ${toPath}`).code !== 0) {
            throw new Error(`Running "git clone" command in "${toPath}" failed.`);
        }
        shell.cd(toPath);
        const defaultBranch = shell
            .exec('git rev-parse --abbrev-ref HEAD')
            .stdout.trim();

        if (defaultBranch !== DEPLOYMENT_BRANCH) {
            if (shellExecLog(`git checkout origin/${DEPLOYMENT_BRANCH}`).code !== 0) {
                if (
                    shellExecLog(`git checkout --orphan ${DEPLOYMENT_BRANCH}`).code !== 0
                ) {
                    throw new Error(
                        `Running "git checkout ${DEPLOYMENT_BRANCH}" command failed.`,
                    );
                }
            } else if (
                shellExecLog(`git checkout -b ${DEPLOYMENT_BRANCH}`).code +
                shellExecLog(
                    `git branch --set-upstream-to=origin/${DEPLOYMENT_BRANCH}`,
                ).code !== 0
            ) {
                throw new Error(
                    `Running "git checkout ${DEPLOYMENT_BRANCH}" command failed.`,
                );
            }
        }
    }
})()
