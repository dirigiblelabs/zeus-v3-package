# Docker descriptor for Zeus
# License - http://www.eclipse.org/legal/epl-v10.html
 
FROM tomcat:8.5.8-jre8
 
RUN rm -R /usr/local/tomcat/webapps/*
COPY zeus/application/target/ROOT.war $CATALINA_HOME/webapps/
RUN rm /usr/local/tomcat/conf/tomcat-users.xml
RUN wget http://www.dirigible.io/help/conf/tomcat-users.xml -P /usr/local/tomcat/conf/
 
EXPOSE 8080
CMD ["catalina.sh", "run"]
