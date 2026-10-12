/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "references-empty": [2, "never"],
  },
  ignores: [
    (message) =>
      /^Signed-off-by: (github-actions)\[bot\] <support@github\.com>$/m.test(
        message,
      ),
    (message) =>
      /^Signed-off-by: (github-actions)\[bot\] <(49699333|41898282)\+(github-actions)\[bot\]@users\.noreply\.github\.com>$/m.test(
        message,
      ),
    (message) =>
      /^Signed-off-by: renovate\[bot\] <29139614\+renovate\[bot\]@users\.noreply\.github\.com>$/m.test(
        message,
      ),
  ],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ["#"],
    },
  },
};
