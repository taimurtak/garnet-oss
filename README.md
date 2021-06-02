# Garnet

Garnet provides a single source of truth for your configurations, and lets you fetch them into your apps automatically. 

- **Encrypted Storage** · centrally store and manage your all your configuration parameters and secrets.
- **Auto-Injection** · fetch and inject environment variables into your apps at build or run time.
- **Dashboard** · a Web UI to create, update, view and delete projects and configurations.
- **CLI** · a command-line tool to fetch configurations from Garnet into your applications.
- **Integrations** · integrates natively with popular deployment platforms. Check out currently supported [integrations](https://docs.usegarnet.com/), or contribute.  
- **Audit Logs** · coming soon 
- **Team Collaboration** · coming soon 
- **Role Based Access Control** · coming soon 


## How it works  
  
 1. Create, update, view and delete env variables in the Web UI

<img src="https://user-images.githubusercontent.com/3413596/119445967-a3737c80-bcfb-11eb-99f4-3659fc1c82db.png" height="500">

 2. Fetch env variables in your apps through a single command

![image](https://cdn.usegarnet.com/assets/img/garnet/cli-flow-new-port-1-trimmed-optimized.gif)    
    

## Philosophy

- Developer-first
- Simple, not simplistic
- Security by design 


## Garnet Cloud Service

You can [sign up for a free account](https://app.usegarnet.com/auth/signin) on our hosted platform.


## Deployment Options

Our suggested method for quick deployment is through the provided Docker images.

However, Garnet can be deployed anywhere you want! Please contact us at support@usegarnet.com if you wish to deploy Garnet on the following cloud-providers:

* AWS
* Microsoft Azure
* Digital Ocean
* Google Cloud
* Render

## Production Deployment

Please contact us at support@usegarnet.com if you wish to deploy Garnet in production, in your own environment.

## Contributing

We love contributions of any kind. [See our Docs for a guide on how to get started.](https://github.com/garnet-labs/garnet-oss/blob/main/CONTRIBUTING.md)

Not sure where to start? [Speak with one of our core contributors.](mailto:dev@usegarnet.com)

## Setting up for local development:

### Dependencies

Make sure you have Docker and Docker Compose installed locally

#### Running Garnet

`git clone https://github.com/garnet-labs/garnet-oss`  
`cd garnet-oss` 

`docker-compose up` 

#### Initialize DB 

`cd garnet-oss/backend`   
`npm install`  
`npm run db:create` 

#### Navigate to Dashboard 

Go to [http://localhost:3000](http://localhost:3000)

