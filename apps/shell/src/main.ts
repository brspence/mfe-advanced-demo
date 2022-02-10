// Promise.all([
//     loadRemoteEntry({ type: 'module', remoteEntry: environment.counterRemoteEntryUrl})
// ])
//     .then(() => import('./bootstrap'))
import('./bootstrap').catch((err) => console.error('error', err));
