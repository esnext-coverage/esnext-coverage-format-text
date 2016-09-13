/**
 * Report summary.
 * @module reporters/report-summary
 */

import {optimal, failed} from '../colors';

/**
 * Generates the overall report summary.
 * @param {Object} environment - The environment where the test was run.
 * @param {Boolean} isGlobalSuccess - Indicator of coverage matching global (project-wide) threshold limits.
 * @param {Boolean} isLocalSuccess - Indicator of coverage matching local (per file) threshold limits.
 * @returns {String} Report summary.
 * @example
 *  Failed test coverage on Node v5.4.0
 */
export default function createReportSummary(environment, isGlobalSuccess, isLocalSuccess) {
  const envName = environment.name || `Node ${process.version}`;

  if (typeof isGlobalSuccess !== 'boolean' && typeof isLocalSuccess !== 'boolean') {
    return `Test coverage on ${envName}`;
  }
  if (isGlobalSuccess === false) {
    return `${failed('Failed')} global test coverage on ${envName}`;
  }
  if (isLocalSuccess === false) {
    return `${failed('Failed')} local test coverage on ${envName}`;
  }
  if (isGlobalSuccess === false && isLocalSuccess === false) {
    return `${failed('Failed')} test coverage on ${envName}`;
  }

  return `${optimal('Passed')} test coverage on ${envName}`;
}
