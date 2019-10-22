import fs from 'fs';
import isReachable = require('is-reachable');
import { MailerTransport } from 'lib/mailer/mailerTransport';
import{ template} from 'lodash';
const cwd = process.cwd();
const panicMailTpl = fs.readFileSync(`${cwd}/src/public/assets/templates/panic_mail.html`, 'utf8');
export interface Project {
  id: string;
  name: string;
  url: string;
  receiver: string;
  ping: number;
  testRunning: boolean;
}
export default class HealthCheck {
  mailerTransport: MailerTransport;

  project: Project;

  running: boolean;

  timer: any;

  constructor(project: Project, mailerTransport: MailerTransport) {
    this.project = project;
    this.running = this.project.testRunning;
    this.mailerTransport = mailerTransport;
    this.init();
  }

  init() {
      console.log('test start for ', this.project.url);
    this.timer = setTimeout(async () => {
      if (this.running) {
        const reachable: boolean = await isReachable(this.project.url, {
          timeout: this.project.ping,
        });
        console.log(this.project.url, reachable);
        if (!reachable) {
          this.sendEmail(this.project.receiver);
          this.stop();
          setTimeout(() => {
            this.start();
          }, 1000 * 60 * 30);
        } else {
          this.init();
        }
      }
    }, 20000);
  }
  stop() {
    clearTimeout(this.timer);
    this.running = false;
    
  }

  start() {
    this.running = true;
    console.log(this.running)
    this.init();
  }
  async sendEmail(to: string) {
    const html = template(panicMailTpl)({
      data: {ProjectUrl: this.project.url, ProjectName: this.project.name}
    });
    try {
      await this.mailerTransport.sendEmail({
        from: 'ioana.ardelean6@gmail.coml',
        to,
        subject: 'test Check Health',
        html
      });
    } catch (error) {
      console.log(error);
    }
  }
}
