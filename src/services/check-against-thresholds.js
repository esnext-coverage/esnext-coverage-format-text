/**
 * Metrics-thresholds comparator.
 * @module services/check-against-thresholds
 */

/**
 * Determines if the given set of metrics exceed the given thresholds.
 * @see src/services/compute-metrics.js
 * @param {Object} metrics - Metrics generated by compute-metrics.
 * @param {Object} thresholds - Thresholds to check against.
 * @return {Boolean} False if any metric is below, true otherwise.
 */
export function areMetricsAboveThresholds(metrics, thresholds) {
  return Object.keys(thresholds).every(tagName => {
    const {covered, total} = metrics[tagName];
    const ratio = total ? covered / total : 1;
    return ratio * 100 >= thresholds[tagName];
  });
}

/**
 * Determines if the given set of files has metrics exceeding thresholds.
 * @see src/services/compute-metrics.js
 * @param {Object} filesIndex - Index of files generated by compute-metrics.
 * @param {Object} thresholds - Thresholds to check against.
 * @return {Boolean} False if any metrics are below, true otherwise.
 */
export function areFilesMetricsAboveThresholds(filesIndex, thresholds) {
  return Object.keys(filesIndex).every(fileName => {
    const fileMetrics = filesIndex[fileName];
    return areMetricsAboveThresholds(fileMetrics, thresholds);
  });
}
