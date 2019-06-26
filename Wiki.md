# Panic Control

Panic Control is a backup web application, that tracks the health servers status of a customer website and manages communication during an incident. The main features of Panic Control is monitoring and alerting. 
In case of incident, the comunication plays an important role for the users, alerts the users with personalized emails and forgets the error page `500`, you can personalize your own status page directly in the application Panic.


## Benchmark

The study of 2 externe competition and 1 intern competition about the mains functionalities of monitoring uptime application.
Intern to Société Générale exist the Control Tower, is the critical backup during the incident, but before call Control Tower, many check health of server is done (each application have un test health of server), if the web site is down you got a email. Panic Control offers much many ways to handels the communication during the downtime, before users the team of programmers is alerted. In the case of external competition with Uptrends and Uptime robot, Panic Control is more user friendly, much faster, and performant. The inconveniece of Panic is 
not extendes application, the only gols is handeling downtime with sending email and redirect a status pages.

### Uptrends
`go forward` : <https://www.uptrends.com>
- Monitoring
> Multi Browser Monitoring, Monitoring Checkpoints, Private Checkpoints, Transaction Recorder
- Alerting
> Mobile Apps, Integrations, Public Status Pages

### Uptime robot
`go forward` : <https://uptimerobot.com>
- Monitoring
> Verifies downtime from multiple locations, reach the status
- Alerting
> Public status Pages, multiple alert(mobile, sms, slack etc)
