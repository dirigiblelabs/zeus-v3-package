# Zeus - Package

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/zeus-v3-package.svg)](https://github.com/dirigiblelabs/zeus-v3-package/graphs/contributors)


## Overview

## Docker
Build an image without uploading it:

1. Set the environment variables with eval: `eval $(minikube docker-env)`
2. Build the image with the Docker daemon of Minukube: `docker build -t my-image`
3. Set the image in the pod spec like the build tag: `my-image`
4. Set the `imagePullPolicy` to `Never`, otherwise Kubernetes will try to download the image

> Important note: You have to run eval $(minikube docker-env) on each terminal you want to use, since it only sets the environment variables for the current shell session.



## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
