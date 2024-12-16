import presetWeapp from 'unocss-preset-weapp';
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } = extractorAttributify();

export default {
    presets: [presetWeapp(), presetWeappAttributify()],
    shortcuts: [],
    transformers: [transformerAttributify(), transformerClass()]
};
