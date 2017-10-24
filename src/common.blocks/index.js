function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./', true, /\.(js|less)$/));

// requireAll(require.context('./', true, /\.(js|less|png|jpe?g|gif)$/));
