# Docker descriptor for Dirigible
# License - http://www.eclipse.org/legal/epl-v10.html

ARG DIRIGIBLE_VERSION=latest
FROM dirigiblelabs/dirigible-base-platform-runtime-keycloak:$DIRIGIBLE_VERSION

COPY modules/client-kubernetes/target/modules-zeus-client-kubernetes-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-accounts/target/modules-zeus-accounts-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-applications/target/modules-zeus-applications-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-core/target/modules-zeus-core-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-data/target/modules-zeus-data-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-data-playbook/target/modules-zeus-data-playbook-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-deployer/target/modules-zeus-deployer-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY modules/zeus-templates/target/modules-zeus-templates-1.0.0-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib

EXPOSE 8080
CMD ["catalina.sh", "run"]