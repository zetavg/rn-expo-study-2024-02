const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');
const { Project, Configuration } = require('@yarnpkg/core');

async function getMetroConfig(dirname) {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = getDefaultConfig(dirname);

  // Stops Metro from resolving modules from node_modules in the root workspace if there is a match in the current workspace
  config.resolver.disableHierarchicalLookup = true;

  await addLocalDependencyNodeModulesToNodeModulesPath(config, dirname);

  await configureReactNativeSvgTransformer(config, dirname);

  // Since we are using yarn workspaces, we need to enable symlinks for resolving symlinked modules.
  config.resolver.unstable_enableSymlinks = true;

  return config;
}

/**
 * Sometimes, dependencies of workspaces are not hoisted to the root node_modules and will be installed in the node_modules directory inside the workspace, for example, `packages/some-package/node_modules`.
 * In such case, Metro have trouble resolving those workspace dependencies. To resolve this, here we add all the possible node_modules paths of local dependencies to the `nodeModulesPaths` of Metro to make sure Metro can resolve them.
 */
async function addLocalDependencyNodeModulesToNodeModulesPath(config, dirname) {
  const configuration = await Configuration.find(dirname, null, {
    strict: false,
  });

  const { project } = await Project.find(configuration, dirname);
  const localPackageMap = Object.fromEntries(
    project.workspaces.map((w) => [w.manifest.raw.name, w.cwd]),
  );

  addPackageLocalDependencyNodeModulesToNodeModulesPath(
    config,
    dirname,
    localPackageMap,
  );
}

function addPackageLocalDependencyNodeModulesToNodeModulesPath(
  config,
  packageDir,
  localPackageMap,
) {
  const packageJsonPath = path.join(packageDir, 'package.json');
  const package = require(packageJsonPath);
  if (!package.dependencies) return;

  const localDependencyNames = Object.entries(package.dependencies)
    .filter(([_name, version]) => version.startsWith('workspace:'))
    .map(([name, _version]) => name);
  const localDependencyDirectories = localDependencyNames.map((d) => {
    const directory = localPackageMap[d];
    if (!directory) {
      throw new Error(
        `Cannot locate package directory for local dependency "${d}" specified in ${packageJsonPath}. Known local packages in yarn project: ${Object.keys(localPackageMap).join(', ')}.`,
      );
    }

    return directory;
  });

  config.resolver.nodeModulesPaths.push(
    ...localDependencyDirectories.map((d) => path.join(d, 'node_modules')),
  );

  // Recursively add local dependency node_modules to nodeModulesPaths
  for (const localDependencyDir of localDependencyDirectories) {
    addPackageLocalDependencyNodeModulesToNodeModulesPath(
      config,
      localDependencyDir,
      localPackageMap,
    );
  }
}

async function configureReactNativeSvgTransformer(config) {
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };
}

exports.getMetroConfig = getMetroConfig;
