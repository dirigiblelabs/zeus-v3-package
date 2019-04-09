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

> **NOTE:** If new module is being added, then a coresponding entries in **zeus/modules/pom.xml** and **Dockerfile** should be made, e.g:

**zeus/modules/pom.xml**
```xml
   <modules>
      ...
      <module>new-module-name</module>
      ...
   </modules>
```

**zeus/modules/new-module-name/pom.xml**
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<parent>
		<groupId>io.dirigible.zeus</groupId>
		<artifactId>zeus-{NEW-MODULE-NAME}</artifactId>
		<version>0.0.1-SNAPSHOT</version>
		<relativePath>../pom.xml</relativePath>
	</parent>

	<name>Zeus - {NEW-MODULE-NAME}</name>
	<artifactId>zeus-{NEW-MODULE-NAME}</artifactId>
	<packaging>jar</packaging>

	<scm>
		<url>${content.scm.url}</url>
		<connection>${content.scm.connection}</connection>
		<developerConnection>${content.scm.developerConnection}</developerConnection>
	</scm>

	<properties>
		<content.repository.name>zeus-v3-{NEW-MODULE-NAME}</content.repository.name>
		<content.project.name>zeus-{NEW-MODULE-NAME}</content.project.name>

		<content.scm.url>https://github.com/dirigiblelabs/${content.repository.name}</content.scm.url>
		<content.scm.connection>scm:git:git://github.com/dirigiblelabs/${content.repository.name}.git</content.scm.connection>
		<content.scm.developerConnection>scm:git:https://github.com/dirigiblelabs/${content.repository.name}</content.scm.developerConnection>
	</properties>

</project>
```
> **Note:** {NEW-MODULE-NAME} should be replaced with the name of the new module

**Dockerfile**
```Docker
COPY zeus/modules/{NEW-MODULE-NAME}/target/new-module-name-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
```

#### Docker Image
```
docker build -t zeus .
docker tag zeus dirigiblelabs/zeus
docker push dirigiblelabs/zeus
```

## License

This project is copyrighted by [SAP SE](http://www.sap.com/) and is available under the [Eclipse Public License v 1.0](https://www.eclipse.org/legal/epl-v10.html). See [LICENSE](LICENSE) and [NOTICE.txt](NOTICE.txt) for further details.
