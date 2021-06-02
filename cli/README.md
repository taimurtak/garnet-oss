# Garnet CLI 

Garnet is a tool for managing configurations and secrets (such as env vars, API keys, tokens, passwords etc.)

## Installing

If you have a functional go environment, you can install with:

```bash
$ go get github.com/garnet-labs/garnet-cli
```

## Authenticating

You can authenticate with Garnet by supplying your Garnet auth token. The access token can be retreived from your Garnet dashboard under your profile section.

```bash
$ garnet login <token>
```

When logging in for the first time, a configuration file called `garnet.json` will be created in your home directory (default:`$HOME/.garnet/garnet.json`). This file will contain your Garnet token and Tenant ID, which are used to authenticate requests to the Garnet API. 


## Usage

### Run
```bash
$ garnet run <project-name/scope-name> -- <your executable>
```
`run` populates the local environment with the env variables from the specified project and scope
and executes the given command. Secret keys are case sensitive.


For example, to run a npm server with env variables stored in Garnet in a project named frontend under the scope "dev", all you have to do is: 

```bash
$ garnet run frontend/dev -- npm start
```
You can also run multiple commands using the following format: 

```bash
$ garnet run <project-name>/<scope> -- <command-1> && <command-2>
```


## Building locally from source 

```bash
$ git clone https://github.com/garnet-labs/garnet-cli.git  

$ cd garnet-cli/  

$ make build  
```
