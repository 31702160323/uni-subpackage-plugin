import PostcssClassRename from 'postcss-class-rename';

module.exports = {
    plugins: [
        PostcssClassRename({
            '\\\\:': '_',
            '\\\\/': '_',
            '\\\\.': '_',
            '.:': '_',
            '\\[': '_',
            '\\]': '_',
            '\\*': '_'
        })
    ]
};
