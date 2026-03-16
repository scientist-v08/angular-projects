const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

module.exports = {
    theme: {},
    content: [
        join(__dirname, 'src/**/*.{html,ts}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
};
