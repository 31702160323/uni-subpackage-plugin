export default {
    root: true,
    plugins: ['stylelint-order'],
    extends: [
        'stylelint-config-standard',
        'stylelint-config-standard-scss',
        'stylelint-config-standard-vue/scss'
    ],
    rules: {
        'color-function-notation': 'legacy',
        // 可以使用rpx单位
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
        // 'selector-class-pattern': [
        //     // 命名规范 -
        //     '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
        //     {
        //         message: 'Expected class selector to be kebab-case'
        //     }
        // ],
        'selector-class-pattern': null,
        'at-rule-empty-line-before': null,
        'at-rule-no-unknown': null,
        'length-zero-no-unit': true, // 禁止零长度的单位（可自动修复）
        'shorthand-property-no-redundant-values': true, // 简写属性
        'declaration-block-no-duplicate-properties': true, // 禁止声明快重复属性
        'no-descending-specificity': true, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
        'selector-max-id': 0, // 限制一个选择器中 ID 选择器的数量
        'max-nesting-depth': 3
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
    overrides: [
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss'
        },
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html'
        }
    ]
};
