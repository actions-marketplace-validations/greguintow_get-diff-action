import path from 'path';
import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { isTargetEvent } from '@technote-space/filter-github-action';
import { Logger, ContextHelper } from '@technote-space/github-action-helper';
import { getGitDiff } from './utils/command';
import { dumpOutput, setResult } from './utils/misc';
import { TARGET_EVENTS } from './constant';

/**
 * run
 */
async function run(): Promise<void> {
	const logger = new Logger();
	ContextHelper.showActionInfo(path.resolve(__dirname, '..'), logger, context);

	if (!isTargetEvent(TARGET_EVENTS, context)) {
		logger.info('This is not target event.');
		setResult([]);
		return;
	}

	const diff = await getGitDiff();
	dumpOutput(diff, logger);
	setResult(diff);
}

run().catch(error => setFailed(error.message));