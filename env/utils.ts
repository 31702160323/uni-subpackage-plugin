import fs from 'fs';

export function replaceManifest(object: Record<string, string>) {
    const manifestPath = './src/manifest.json';
    const Manifest = fs.readFileSync(manifestPath, { encoding: 'utf-8' });

    const ManifestArr = Manifest.split(/\n/);

    for (const key in object) {
        const arr = key.split('.');
        const len = arr.length;
        const lastItem = arr[len - 1];

        let i = 0;

        for (let index = 0; index < ManifestArr.length; index++) {
            const item = ManifestArr[index];
            if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
            if (i === len) {
                const hasComma = /,/.test(item);
                ManifestArr[index] = item.replace(
                    new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
                    `"${lastItem}": ${object[key]}${hasComma ? ',' : ''}`
                );
                break;
            }
        }
    }

    const newManifest = ManifestArr.join('\n');
    if (Manifest !== newManifest) {
        try {
            fs.writeFileSync(manifestPath, newManifest, {
                flag: 'w'
            });
        } catch (error) {
            fs.writeFileSync(manifestPath, Manifest, {
                flag: 'w'
            });
        }
    }
}
