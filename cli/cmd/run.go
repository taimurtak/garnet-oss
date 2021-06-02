/*
Copyright © 2021 Garnet Labs <support@usegarnet.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

	http://www.apache.org/licenses/LICENSE-2.0
	
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-----------------------------------------------------
Portions derived from Segment's chamber code.

Copyright (c) 2017 Segment.
Chamber is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.
*/
package cmd

import (
	"os"
	"github.com/pkg/errors"
	"github.com/spf13/cobra"
	"github.com/garnet-labs/garnet-cli/env"
)

// runCmd represents the exec command
var runCmd = &cobra.Command{
	Use:   "run <project-name>/<scope> -- <command> [<arg...>]",
	Short: "Executes the given command with env variables loaded into the local environment",
	Args: func(cmd *cobra.Command, args []string) error {
		checker := cmd.ArgsLenAtDash()
		if len(args) == 0 {
				return errors.New("Please provide a valid project and scope")
				cmd.Help()
		}
		if checker == -1 {
			return errors.New("Please separate <project>/<scope> and command with '--'. See the given example for help.")
		}
		if err := cobra.MinimumNArgs(1)(cmd, args[checker:]); err != nil {
			return errors.Wrap(err, "Please specify a command to run. Check usage for help.")
		}
		return nil
	},
	RunE: injectRun,
	Example: `
	For env variables stored in Garnet in a project named 'frontend' and scope 'dev', you can use the following: 

	$ garnet run frontend/dev -- npm start 
	
	To check all env variables loaded in the runtime environment, you can use: 

	$ garnet run frontend/dev -- env

	You can also run multiple commands using the following format: 

	$garnet run <project-name>/<scope> -- <command-1> && <command-2>
`,
}

func init() {
	rootCmd.AddCommand(runCmd)
}

func injectRun(cmd *cobra.Command, args []string) error {
	var loader env.Environment
	var secretErr error 

	checker := cmd.ArgsLenAtDash()
	project := args[0]
	command, commandArgs := args[checker], args[checker+1:]

	garnetBackend, err := getBackend()
	if err != nil {
		return errors.Wrap(err, "Failed to fetch from Garnet backend store")
	}

	loader = env.Environment(os.Environ())
	secretErr = loader.Inject(garnetBackend, project)

	if secretErr != nil {
		return secretErr
	}

	return run_syscall(command, commandArgs, loader)
}