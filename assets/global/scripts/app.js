const electronHot = require('electron-hot-loader');
electronHot.install();
electronHot.watchJsx(['./assets/*/*.jsx', './assets/**/*/*.jsx', './assets/**/*.jsx', './assets/**/*/*/*.jsx']);

require('./pageLoader.jsx');
