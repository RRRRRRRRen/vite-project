/** @type {import('stylelint').Config} */

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-idiomatic-order',
  ],
  plugins: [
    'stylelint-less',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  overrides: [
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.(less)'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'color-function-notation': 'legacy',
    'declaration-property-value-no-unknown': true,
  },
};
