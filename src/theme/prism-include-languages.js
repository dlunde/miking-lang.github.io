/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

const prismIncludeLanguages = (PrismObject) => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: {prism},
    } = siteConfig;
    const {additionalLanguages} = prism; // Prism components work on the Prism instance on the window, while
    // prism-react-renderer uses its own Prism instance. We temporarily mount
    // the instance onto window, import components to enhance it, then remove it
    // to avoid polluting global namespace.
    // You can mutate this object: registering plugins, deleting languages... As
    // long as you don't re-assign it

    window.Prism = PrismObject;
    additionalLanguages.forEach((lang) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(`prismjs/components/prism-${lang}`);
    });

    // Additional highlightings that exist in Prism that we want
    require(`prismjs/components/prism-powershell.js`);

    // Custom syntax highlighting
    require("../prism/prism-mcore.js")

    delete window.Prism;
  }
};

export default prismIncludeLanguages;
