import config from 'config';
import { getAll } from '../../helpers/ProjectServices';
import { MailerTransport } from '../../lib/mailer/mailerTransport';
import HealthCheck from './CheckHealth';

class MainCheckHealth {
  mailerTransport: MailerTransport;
  projectsTest: any[];

  constructor() {
    this.projectsTest = [];
    this.initMailer();
  }
  initMailer() {
    const configMailer = config.get('mailer');
    this.mailerTransport = new MailerTransport(configMailer);
  }
  async startHealthCheck() {
    try {
      const projects = await getAll();
      projects.forEach(async (project: any) => {
        this.projectsTest.push({
          id: project.id,
          healthCheck: new HealthCheck(project, this.mailerTransport),
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  stopTestByProjectId(projectId: string) {
    const projectTest = this.projectsTest.filter(
      (project: any) => String(project.id) === String(projectId)
    )[0];
    console.log('**********stop');
    if (projectTest) {
      projectTest.healthCheck.stop();
    }
  }
  startTestByProjectId(projectId: string) {
    const projectTest = this.projectsTest.filter(
      (project: any) => String(project.id) === String(projectId)
    )[0];
    console.log('**********start', projectId);
    if (projectTest) {
      projectTest.healthCheck.start();
    }
  }
}

const HealthCheckHandler = new MainCheckHealth();
export default HealthCheckHandler;
