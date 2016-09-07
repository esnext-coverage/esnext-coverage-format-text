/**
 * Metrics calculator and aggregator.
 * @module services/compute-metrics
 */

import {tags, metrics, lines} from 'esnext-coverage-analytics';

/**
 * Code coverage tags used in the report.
 * @private
 * @type {Array}
 */
const tagsToSelect = [
  'statement',
  'branch',
  'function'
];

/**
 * Generates an empty metrics object.
 * @private
 * @param {Array} tagNameList - Tag names.
 * @return {Object} Empty metrics.
 */
function createEmptyMetrics(tagNameList) {
  return tagNameList.concat('line').reduce((result, tagName) => {
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
    const locationsByTag = tags(locations, tagsToSelect);
    const lineMetrics = metrics(lines(locations));

    result.filesMetrics[fileName] = {line: lineMetrics};
    result.projectMetrics.line.covered += lineMetrics.covered;
    result.projectMetrics.line.total += lineMetrics.total;
    Object.keys(locationsByTag).forEach(tagName => {
      const tagLocations = locationsByTag[tagName];
      const {covered, total} = metrics(tagLocations);
      result.projectMetrics[tagName].covered += covered;
      result.projectMetrics[tagName].total += total;
      result.filesMetrics[fileName][tagName] = {covered, total};
    });
  });

  return result;
}
