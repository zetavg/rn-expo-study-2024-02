/**
 * Enforce all workspaces are using the same version of the "@babel/runtime" package.
 *
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
function enforceBabelRuntimeVersion({ Yarn }) {
  const rootWorkspace = Yarn.workspaces({ cwd: '.' })[0];
  const babelRuntime = rootWorkspace.pkg.dependencies.get('@babel/runtime');
  const babelRuntimeVersion = babelRuntime?.version;
  if (!babelRuntimeVersion) return;

  for (const workspace of Yarn.workspaces()) {
    if (workspace.cwd === '.') continue;

    const workspaceBabelRuntime =
      workspace.pkg.dependencies.get('@babel/runtime');
    if (!workspaceBabelRuntime) continue;

    if (workspaceBabelRuntime.version !== babelRuntimeVersion) {
      workspace.set(['dependencies', '@babel/runtime'], babelRuntimeVersion);
    }
  }
}

exports.default = enforceBabelRuntimeVersion;
