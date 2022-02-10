const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
    /* mapped paths to share */
]);

module.exports = {
    output: {
        uniqueName: 'counter',
        publicPath: 'auto',
    },
    optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false,
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'counter',
            filename: 'counterRemoteEntry.js',
            exposes: {
                './Module':
                    './apps/counter-mfe/src/app/counter/counter-route.module.ts',
            },

            shared: share({
                '@angular/core': {
                    singleton: true,
                    strictVersion: false,
                    requiredVersion: 'auto',
                },
                '@angular/common': {
                    singleton: true,
                    strictVersion: false,
                    requiredVersion: 'auto',
                },
                '@angular/router': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                },
                '@ngrx/effects': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                },
                '@ngrx/router-store': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                },
                '@ngrx/store': {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                },

                ...sharedMappings.getDescriptors(),
            }),
        }),
        sharedMappings.getPlugin(),
    ],
};
