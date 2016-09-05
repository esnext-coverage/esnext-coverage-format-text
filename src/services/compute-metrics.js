/**
 * Metrics calculator and aggregator.
 * @module services/compute-metrics
 */

import {tags, metrics} from 'esnext-coverage-analytics';

/**
 * Code coverage tags used in the report.
 * @private
 * @type {Array}
 */
const tagsToSelect = [
  'statement',
  'branch',
  'function',
  'line'
];

/**
 * Generates an empty metrics object.
 * @private
 * @param {Array} tagNameList - Tag names.
 * @return {Object} Empty metrics.
 */
function createEmptyMetrics(tagNameList) {
  return tagNameList.reduce((result, tagName) => {
    result[tagName] = {covered: 0, total: 0};
    return result;
  }, {});
}

/**
 * Computes the report metrics (global and per-file).
 * @param {Object} coverage - esnext-coverage coverage.
 * @return {Object} Report metrics.
 * @example
 *  computeMetrics({
 *    'foo.js': {hash: ..., path: ..., locations: ...},
 *    'bar.js': {hash: ..., path: ..., locations: ...},
 *  });
 *  // Returns:
 *  // {
 *  //   projectMetrics: {statement: {covered: 0, total: 0}, ...},
 *  //   filesMetrics: {
 *  //     'foo.js': {statement: {covered: 0, total: 0}, ...},
 *  //     'bar.js': {statement: {covered: 0, total: 0}, ...},
 *  //   }
 *  // }
 */
export default function computeMetrics(coverage) {
  const emptyMetrics = createEmptyMetrics(tagsToSelect);
  const result = {projectMetrics: emptyMetrics, filesMetrics: {}};

  Object.keys(coverage).forEach(fileName => {
    const {locations} = coverage[fileName];
    const tagStats = tags(locations, tagsToSelect);

    result.filesMetrics[fileName] = {};
    Object.keys(tagStats).forEach(tagName => {
      const tagData = tagStats[tagName];
      const {covered, total} = metrics(tagData);
      result.projectMetrics[tagName].covered += covered;
      result.projectMetrics[tagName].total += total;
      result.filesMetrics[fileName][tagName] = {covered, total};
    });
  });

  return result;
}