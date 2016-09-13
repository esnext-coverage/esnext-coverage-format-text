/**
 * Text reporter.
 * @module text-reporter
 */

import createReportSummary from './reporters/report-summary';
import createGlobalReport from './reporters/report-global';
import createLocalFilesReport from './reporters/report-local-files';
import reportWrap from './reporters/report-wrap';
import computeMetrics from './services/compute-metrics';
import {
  areMetricsAboveThresholds,
  areFilesMetricsAboveThresholds
} from './services/check-against-thresholds';

/**
 * Determines validity of the given thresholds configuration.
 * @param {*} thresholds - Thresholds configuration to validate.
 * @return {Boolean} True if valid, false otherwise.
 */
function isValidThresholdsConfig(thresholds) {
  return thresholds &&
    typeof thresholds === 'object' &&
    Object.keys(thresholds).length > 0;
}

/**
 * Text reporter for esnext-coverage-compatible results.
 * @param {Object} coverage - esnext-coverage-compatible code coverage.
 * @param {Object} options - Options.
 * @param {Object} options.environment - Environment where the tests were run.
 * @param {Object} options.thresholds - Thresholds for comparison with coverage metrics.
 * @return {String} Report ready to be written to stdout.
 */
module.exports = function textReporter(coverage, options = {}) {
  const {environment = {}, thresholds = {}} = options;
  const {projectMetrics, filesMetrics} = computeMetrics(coverage);

  const isGlobalSuccess = isValidThresholdsConfig(thresholds.global) ?
    areMetricsAboveThresholds(projectMetrics, thresholds.global) :
    null;
  const isLocalSuccess = isValidThresholdsConfig(thresholds.local) ?
    areFilesMetricsAboveThresholds(filesMetrics, thresholds.local) :
    null;

  const reportSummary = createReportSummary(environment, isGlobalSuccess, isLocalSuccess);

  return reportWrap([
    reportSummary,
    createGlobalReport(projectMetrics, thresholds.global),
    createLocalFilesReport(filesMetrics, thresholds.local),
    reportSummary
  ]);
};
