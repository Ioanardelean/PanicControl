# Panic Control
## Table of content

- Pitch
- Benchmark
- Persona
- Features
- Wireframes
- Sitemaps
- Mockups
- Prototype


## Pitch
  Panic Control is a uptime web application, that tracks the health servers status of a customer website and manages communication during an incident. The main features of Panic Control is monitoring and alerting. 
In case of incident, the comunication plays an important role for the users, alerts the users with personalized emails and forgets the error page `500`, you can personalize your own status page directly in the application Panic. 
  Before the users notice the downtime, the programmers team must be informed about the incident first, for this the performance of the check health must not be wrong, server can be degraded for a few secondes, Panic watch the test with accuracy avoiding abundance or incoherence of alerts.




## Benchmark

  The study of 2 external competition and 1 internal competition about the mains functionalities of monitoring uptime application.

### Panic Control
is more user friendly, much faster, and performant. Panic is more a communication site than monitoring.
- Monitoring -> Uptime and downtime status 
- Alerting -> Customized email for dev team and customers 

### Uptrends `go forward` : <https://www.uptrends.com> 
- Monitoring -> Multi Browser Monitoring
- Alerting -> Mobile Apps, Integrations.

**inconvenient:**
- slow navigation
- no user friendly
- more a monitoring site  

### Uptime robot `go forward` : <https://uptimerobot.com>
- Monitoring -> Verifies downtime from multiple locations, reach the status
- Alerting ->multiple alert(mobile, sms, slack etc).

**inconvenient:** 
- complicated and no user friendly interface
- no customized template email and status page


## Personas

An application that helps both: programmers(users of Panic) and the users of their web sites

### Tech Lead
tech lead puts emphasis on communication during the incident because such an event can cause large drops in the number of users
![](https://github.com/Ioanardelean/PanicControl/blob/master/Resources/persona/personaHongbo.PNG)
### Senior Programmer
Senior programmer wants a powerful and accessible application to monitor your own website
![](https://github.com/Ioanardelean/PanicControl/blob/master/Resources/persona/personaMohamed.PNG)
### Javascript Programmer
JS programmer wants its application to facilitate incident resolution, time spent on communication can be won for technical solution
![](https://github.com/Ioanardelean/PanicControl/blob/master/Resources/persona/personaSherazad.PNG)
### User
The user considers that an incident can cause financial damage and can be avoided with an appropriate communication
![](https://github.com/Ioanardelean/PanicControl/blob/master/Resources/persona/personaBenjie.PNG)


## Features
### Account creation
 Create a account with email address and passphrase
 
 + register
 + activate account
 + desactivate account

### Authentification and Authorisation
 + login / logout as admin
 + login / logout as user
### Monitoring tool

 Create a uptime check for a website with name, description and url
### Participants

 Insert the email address of watcher(from) to email list. 
 
 + edit watcher and email list
 + delete items of email list
### Alerting
 Create alerting email with customed template
 + create template
 + choose template from 3 templates exposed 
 + import template
 ### Client Notifications

 Create a list of principals customers 
 
 + edit email team and email list
 + delete items of email list
 
 Send automated emails: the first one and the last email for alerting the customers when website is down and when is up
 + create template
 + import template
 
 
 Send email every 30 minutes to keep customers informed about the site reshaping process 
 + alert participants every 30 min for sending email to the customers
 + editable template pop up for sending email with new information about incident
 
### Monitoring Dashboard

 Displayng monitorig dashboard
 
 + chart on year 
 + chart on day
 ### Monotorized websites

 Displayng the list of site on account
 + availability 
 + edit
 + delete

 
## Sitemap

![](https://github.com/Ioanardelean/PanicControl/blob/master/Resources/sitemap/sitemapV1.png)


