# Zeus - Package

[![Eclipse License](http://img.shields.io/badge/license-Eclipse-brightgreen.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/dirigiblelabs/zeus-v3-package.svg)](https://github.com/dirigiblelabs/zeus-v3-package/graphs/contributors)


## Overview

## Build

#### Update Content
```
mvn clean install -P content
mvn clean install
```

> **NOTE:** If new module is being added, then a coresponding entry should be made in the Dockerfile, e.g:
```Docker
COPY zeus/modules/applications-html5-process/target/zeus-applications-html5-process-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
```

#### Docker Image
```
docker build -t zeus .
docker tag zeus dirigiblelabs/zeus
docker push dirigiblelabs/zeus
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
