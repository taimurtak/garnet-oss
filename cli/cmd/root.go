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
*/
package cmd

import (
	"fmt"
	"os"
	"github.com/spf13/cobra"
	"strings"
	homedir "github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
	"github.com/garnet-labs/garnet-cli/backend"
)

var garnetVersion string
var cfgFile string
var verbose bool
var numRetries int

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "garnet",
	Short: "CLI for interacting with Garnet",
	SilenceUsage:      true,
	PersistentPreRun:  prerun,
	PersistentPostRun: postrun,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute(version string) {
	garnetVersion = version
	//cobra.CheckErr(rootCmd.Execute())
	if cmd, err := rootCmd.ExecuteC(); err != nil {
		if strings.Contains(err.Error(), "arg(s)") || strings.Contains(err.Error(), "usage") {
			cmd.Usage()
		}
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
	//rootCmd.PersistentFlags().StringP("token", "t", "", "garnet token")
	rootCmd.PersistentFlags().String("api-server-host", "https://api.usegarnet.com", "The host address for the Garnet API server")
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		cobra.CheckErr(err)

		// Search config in home directory with name ".garnet" (without extension).
		viper.AddConfigPath(home)
		viper.SetConfigName(".garnet")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
	}
}

func getBackend() (backend.Backend, error) {
	var s backend.Backend
	var err error
	s, err = backend.NewGarnetBackend()
	return s, err
}


func prerun(cmd *cobra.Command, args []string) {
}

func postrun(cmd *cobra.Command, args []string) {
}