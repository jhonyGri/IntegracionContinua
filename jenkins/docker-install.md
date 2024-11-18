Paso 1
docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-master -v jenkins_home:/var/jenkis_home jenkins/jenkins:lts
Paso 2
docker exec jenkins-master cat /var/jenkins_home/secrets/initialAdminPassword