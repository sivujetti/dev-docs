const path = require('path');
const fs = require('fs');

const cssDirPath = ['_sitefinal', 'assets', 'css'];
const cssAssetsDirPath = path.join(...cssDirPath);
const jsDirPath = ['_sitefinal', 'assets', 'js'];
const jsAssetsDirPath = path.join(...jsDirPath);
const fiDirPath = ['_sitefinal', 'fi'];
const fiContentDirPath = path.join(...fiDirPath);
const enDirPath = ['_sitefinal', 'en'];
const enContentDirPath = path.join(...enDirPath);
const repDefault = {search: /\/fi\/assets\//g, replace: '/assets/'};
const repCustomUrls = {search: '"/assets/', replace: '"/dev-docs/assets/'};

fs.readdirSync(cssAssetsDirPath, {withFileTypes: true}).forEach(fsEnt => {
    if (fsEnt.name.endsWith('.map')) fs.unlinkSync(path.join(...cssDirPath.concat(fsEnt.name)));
    else replace(fsEnt, cssDirPath, [repDefault]);
});
fs.readdirSync(jsAssetsDirPath, {withFileTypes: true}).forEach(fsEnt => {
    replace(fsEnt, jsDirPath, [repDefault]);
});

recurse(fs.readdirSync(fiContentDirPath, {withFileTypes: true}), fiDirPath, (fsEnt, baseDir) => {
    replace(fsEnt, baseDir, [
        repDefault,
        repCustomUrls,
        {search: /"\/tutorials\//g, replace: '"/dev-docs/fi/tutorials/'},
    ]);
});
recurse(fs.readdirSync(enContentDirPath, {withFileTypes: true}), enDirPath, (fsEnt, baseDir) => {
    replace(fsEnt, baseDir, [
        {search: /\/en\/assets\//g, replace: '/assets/'},
        repCustomUrls,
        {search: /"\/tutorials\//g, replace: '"/dev-docs/en/tutorials/'},
    ]);
});

/**
 * @param {fs.Dirent} fsEnt
 * @param {Array<string>} baseDir
 * @param {Array<{search: string; replace: string;}>} reps
 */
function replace(fsEnt, baseDir, reps) {
    if (fsEnt.isDirectory()) return;
    const filePath = path.join(...baseDir.concat(fsEnt.name));
    const rep = reps.reduce((out, {search, replace}) =>
        out.replace(search, replace)
    , fs.readFileSync(filePath, 'utf8'));
    fs.writeFileSync(filePath, rep, 'utf8');
}

/**
 * @param {Array<fs.Dirent>} branch
 * @param {Array<string>} base
 * @param {(fsEnt: fs.Dirent, baseDir: Array<string>) => void} doFn
 * @param {Array<string>} cur = []
 */
function recurse(branch, base, doFn, cur = []) {
    branch.forEach(fsEnt => {
        if (!fsEnt.isDirectory()) {
            doFn(fsEnt, base.concat(cur));
        } else {
            const newCur = cur.concat([fsEnt.name]);
            const p = path.join(...base.concat(newCur));
            recurse(fs.readdirSync(p, {withFileTypes: true}), base, doFn, newCur);
        }
    });
}
