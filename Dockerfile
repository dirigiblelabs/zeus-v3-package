# Docker descriptor for Zeus
# License - http://www.eclipse.org/legal/epl-v10.html
 
ARG DIRIGIBLE_VERSION=latest
FROM dirigiblelabs/dirigible-base-platform-keycloak:$DIRIGIBLE_VERSION
 
COPY zeus/modules/accounts/target/zeus-accounts-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/applications/target/zeus-applications-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/applications-html5/target/zeus-applications-html5-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/applications-java/target/zeus-applications-java-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/build/target/zeus-build-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/build-process/target/zeus-build-process-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/client-kubernetes/target/zeus-client-kubernetes-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/core/target/zeus-core-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/code/target/zeus-code-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/data/target/zeus-data-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/deployer/target/zeus-deployer-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY zeus/modules/templates/target/zeus-templates-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib

EXPOSE 8080
CMD ["catalina.sh", "run"]
